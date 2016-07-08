<?php
// create custom plugin settings menu
add_action('admin_menu', 'votePoll_createMenu');

function votePoll_createMenu()
{

    //create new top-level menu
    add_menu_page(
        'Plugin de vote de Do Fine',
        'Résultat',
        'administrator',
        __FILE__,
        'my_cool_plugin_settings_page',
        'dashicons-heart'
    );

    //call register settings function
    add_action('admin_init', 'register_my_cool_plugin_settings');
}


function register_my_cool_plugin_settings()
{
    //register our settings
    register_setting('my-cool-plugin-settings-group', 'new_option_name');
    register_setting('my-cool-plugin-settings-group', 'some_other_option');
    register_setting('my-cool-plugin-settings-group', 'option_etc');
}

function my_cool_plugin_settings_page()
{
    $query = new Vote_Band_Model();

    $resultat = $query->getAllVotes();

    include('views/settingsView.php');
}