<?php

class Vote_Band_Model
{
    private $tablename = "dofine_vote";

    static function install()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . "dofine_vote";

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
                    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                    `facebookID` varchar(320) NOT NULL,
                    `vote` tinyint(16) NOT NULL DEFAULT '0',
                    PRIMARY KEY (`id`)
                ) $charset_collate";

        require_once(ABSPATH.'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    private function _checkIfUserAlreadyVoted($userID)
    {
        global $wpdb;
        $tablename = $wpdb->prefix.$this->tablename;

        $foundUserID = $wpdb->get_var(
            $wpdb->prepare(
                "
                    SELECT COUNT(facebookID)
                    FROM $tablename
                    WHERE facebookID = %s
                ",
                $userID
            )
        );

        if ($foundUserID == 0) {
            return false;
        } else {
            return true;
        }
    }

    private function _addVote($userID, $band)
    {
        global $wpdb;
        $tablename = $wpdb->prefix.$this->tablename;

        $res = $wpdb->insert(
            $tablename,
            [
                'facebookID' => $userID,
                'vote'       => $band
            ], [
                '%d',
                '%s'
            ]
        );

        if ($res === 1)
            return true;
        else
            return false;
    }

    public function getAllVotes()
    {
        global $wpdb;
        $tableVoteName = $wpdb->prefix . $this->tablename;
        $tablePostName = $wpdb->prefix . "posts";

        $res = $wpdb->get_results(
            "
                SELECT v.vote AS bandID, COUNT(DISTINCT v.facebookID) AS nbrVotes, p.post_title AS bandName
                FROM $tableVoteName AS v
                JOIN $tablePostName AS p
                ON v.vote = p.id
                GROUP BY v.vote
                ORDER BY nbrVotes DESC
            "
        );

        return $res;
    }

    public function submitvote($userID, $band)
    {
        if ( $this->_checkIfUserAlreadyVoted($userID)) {
            return [false, 'User already voted'];
        }

        return [$this->_addVote($userID, $band), 'Has voted !'];
    }
}