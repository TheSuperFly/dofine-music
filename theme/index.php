<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="wp">
<head>
    <base href="/">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/css/main.css">
    <link rel="apple-touch-icon" sizes="57x57" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?= get_template_directory_uri(); ?>/img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="<?= get_template_directory_uri(); ?>/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= get_template_directory_uri(); ?>/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="<?= get_template_directory_uri(); ?>/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= get_template_directory_uri(); ?>/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="<?= get_template_directory_uri(); ?>img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#fff02a">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#fff02a">
    <meta property="og:title" content="DO FINE MUSIC" />
    <meta property="og:description" content="25.03.16 - Votez pour votre artiste/groupe favoris !" />
    <meta property="og:image" content="<?= get_template_directory_uri() ?>/img/image-facebook.jpg" />
    <meta property="og:image:width" content="470" />
    <meta property="og:image:height" content="275" />

    <title ng-bind="'DoFine Music - ' + ogName"></title>
    <?php wp_head(); ?>
</head>
<body>

<header class="main-header">
    <div class="container">
        <div class="main-header__logo">
            <a href="#/" class="_image-logo" collapsing-logo></a>
        </div>
        <div class="main-header__social">
            <a href="https://www.instagram.com/dofinemusic/" target="_blank"><i class="icon-instagram"></i></a>
            <a href="https://www.facebook.com/Do-Fine-Music-850567868384392" target="_blank"><i class="icon-facebook"></i></a>
        </div>
    </div>
</header>

<div class="_viewport" ng-view ng-cloak ng-class="viewportClass"></div>

<?php wp_footer(); ?>
</body>
</html>