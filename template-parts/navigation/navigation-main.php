<?php
/**
 * navigation-main.php
 */

// Create arguments for navigation
$nav_menu_args = array(
    'theme_location'        => 'menu-main',
    'container'             => 'nav',
    'container_class'       => 'banner__menu',
    'menu_class'            => 'menu menu--banner',
    'menu_id'               => 'main-menu',
    'depth'                 => 1,
    'walker'                => new KSS_Walker_Nav_Menu()
);

wp_nav_menu( $nav_menu_args ); ?>