<?php

include_once('custom-endpoint.php');

function dofine_script()
{
    wp_enqueue_script(
        'jquery',
        get_template_directory_uri(
        ).'/bower_components/jquery/dist/jquery.min.js'
    );

    wp_enqueue_script(
        'jquery-bxslider',
        get_template_directory_uri().'/bower_components/jquery.bxslider.js',
        ['jquery']
    );

    wp_enqueue_script(
        'autosize',
        get_template_directory_uri().'/lib/autosize.min.js',
        ['app']
    );

    wp_enqueue_script(
        'fullpage.js',
        get_template_directory_uri().'/bower_components/parallax.js/parallax.min.js',
        ['jquery']
    );

    wp_enqueue_script(
        'jquery-countdown',
        get_template_directory_uri().'/bower_components/jquery.countdown/dist/jquery.countdown.js',
        ['jquery']
    );

    wp_enqueue_script(
        'angularjs',
        get_template_directory_uri().'/bower_components/angular/angular.min.js'
    );

    wp_enqueue_script(
        'angularjs-route',
        get_template_directory_uri().'/bower_components/angular-route/angular-route.min.js'
    );

    wp_enqueue_script(
        'angular-sanitize',
        get_template_directory_uri().'/bower_components/angular-sanitize/angular-sanitize.min.js'
    );

    wp_enqueue_script(
        'app',
        get_template_directory_uri().'/js/app.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_enqueue_script(
        'facebookService',
        get_template_directory_uri().'/js/services/facebookService.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_enqueue_script(
        'wpApiService',
        get_template_directory_uri().'/js/services/wpApiService.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_enqueue_script(
        'toolService',
        get_template_directory_uri().'/js/services/toolService.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    # Directive
    wp_enqueue_script(
        'directive',
        get_template_directory_uri().'/js/directives/directives.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    # Controllers
    wp_enqueue_script(
        'MainCtrl',
        get_template_directory_uri().'/js/controllers/MainCtrl.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_enqueue_script(
        'PollCtrl',
        get_template_directory_uri().'/js/controllers/PollCtrl.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_enqueue_script(
        'BandCtrl',
        get_template_directory_uri().'/js/controllers/BandCtrl.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_enqueue_script(
        'HomeCtrl',
        get_template_directory_uri().'/js/controllers/HomeCtrl.js',
        ['angularjs', 'angularjs-route', 'angular-sanitize']
    );

    wp_localize_script(
        'app',
        'localized',
        [
            'partials' => get_template_directory_uri() . '/partials/',
        ]
    );

    wp_localize_script(
        'app',
        'templateDirectory',
        get_template_directory_uri()
    );
}

add_action('wp_enqueue_scripts', 'dofine_script');

add_action('init', 'create_band_posttype');

function create_band_posttype()
{
    register_post_type(
        'Finalistes',
        array(
            'labels'        => array(
                'name'          => __('Finalistes'),
                'singular_name' => __('Finalistes'),
            ),
            'public'        => true,
            'has_archive'   => true,
            'rewrite'       => array('slug' => 'finalistes'),
            'description'   => "Il s'agit de vos groupes de finalistes.",
            'menu_position' => 20,
            'menu_icon'     => 'dashicons-format-audio',
            'show_in_rest'  => true,
        )
    );
}

add_action(
    'rest_api_init',
    function () {
        register_rest_route(
            'finalist/v1',
            '/getAllFinalists',
            array(
                'methods'  => 'GET',
                'callback' => 'get_all_finalists',
            )
        );

    }
);

function get_all_finalists()
{
    $finalists = get_posts(
        array(
            'post_type' => "finalistes",
        )
    );

    if (empty($finalists)) {
        return null;
    } else {
        foreach ($finalists as $finalist) {
            $finalistsName[] = $finalist->post_name;
        }

        return $finalistsName;
    }
}

if ( ! defined( 'WPCF7_AUTOP' ) )
    define( 'WPCF7_AUTOP', false );

show_admin_bar(false);