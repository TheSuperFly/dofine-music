<?php
/**
 * Return Contact Form. Using Contact Form 7
 * @return string HTML of contact form
 * @url
 */

function get_contact_form()
{
    $form = do_shortcode(
        "[contact-form-7 id=\"92\" title=\"Formulaire de contact\"]"
    );

    return $form;
}

add_action(
    'rest_api_init',
    function () {
        register_rest_route(
            'contactform/v1',
            '/getform',
            array(
                'methods' => 'GET',
                'callback' => 'get_contact_form',
            )
        );
    }
);