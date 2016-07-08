<?php
/**
 * Plugin Name: Dofine's Plugin de Vote
 * Description: Plugin de vote réalisé pour <b>Dofine</b>
 * Author: Zachary E. Dahan —
 * Author URI: http://zachary.pm/
 * Version: 1.0
 */

require_once('lib/Poll.php');
require_once('settings.php');

class Vote_Band_API
{
    private $api = "https://graph.facebook.com/";

    public function __construct()
    {
        add_filter('query_vars', array($this, 'add_query_vars'), 0);
        add_action('parse_request', array($this, 'sniff_requests'), 0);
        add_action('init', array($this, 'add_endpoint'), 0);

        register_activation_hook(__FILE__, ['Vote_Band_Model', 'install']);
    }

    public function add_query_vars($vars)
    {
        $vars[] = '__api';
        $vars[] = 'bandID';
        $vars[] = 'facebookID';
        $vars[] = 'facebookAccessToken';

        return $vars;
    }

    public function add_endpoint()
    {
        add_rewrite_rule(
            '^api/vote/?([0-9]+)?/?([0-9]+)?/?([a-zA-Z0-9]+)?/?',
            'index.php?__api=1&bandID=$matches[1]&facebookID=$matches[2]&facebookAccessToken=$matches[3]',
            'top'
        );
    }

    public function sniff_requests()
    {
        global $wp;
        if (isset($wp->query_vars['__api'])) {
            $this->handle_request();
        }
    }

    protected function handle_request()
    {
        global $wp;
        $bandID              = (int)$wp->query_vars['bandID'];
        $facebookID          = (int)$wp->query_vars['facebookID'];
        $facebookAccessToken = (string)$wp->query_vars['facebookAccessToken'];

        if ( ! $bandID || ! $facebookID || ! $facebookAccessToken) {
            $this->send_response('Missing things.');
            exit;
        }

        date_default_timezone_set('Europe/Paris');

        /* Commande pour gérer la fin des votes en dur.
        // Désactivé pour la démo
        if (1458943200 < time()) {
            $this->send_response('200', 'Timeout');
            exit;
        }
        */

        $graphResponse = @file_get_contents(
            $this->api . $facebookID . '?access_token=' . $facebookAccessToken
        );

        if ($graphResponse === false) {
            $this->send_response('Wrong Request');
            exit;
        }

        // The token and User ID is valid
        $vote = new Vote_Band_Model();

        $return = $vote->submitvote($facebookID, $bandID);

        if ($return[0]) {
            $this->send_response('200', $return);
        } else {
            $this->send_response('200', $return);
        }
    }

    protected function send_response($msg, $return = '')
    {
        $response['message'] = $msg;
        if ($return) {
            $response['response'] = $return;
        }

        header('Content-Type: application/json; charset=utf-8');

        http_response_code($msg ? $msg : 200);

        echo json_encode($response)."\n";
        exit;
    }
}

new Vote_Band_API();

