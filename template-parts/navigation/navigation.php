<?php
/**
 * navigation.php
 */

// Create arguments for navigation
$nav_menu_args = array(
    'theme_location'        => 'menu-main',
    'container'             => 'nav',
    'container_class'       => 'nav',
    'menu_class'            => 'menu',
    'menu_id'               => 'main-menu',
    'depth'                 => 2,
    'walker'                => new KSS_Walker_Nav_Menu()
);

wp_nav_menu( $nav_menu_args ); ?>