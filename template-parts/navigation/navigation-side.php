<?php
/**
 * navigation-side.php
 */

// Create arguments for navigation
$nav_menu_args = array(
    'theme_location'        => 'menu-side',
    'container'             => 'nav',
    'container_class'       => 'nav',
    'menu_class'            => 'side-menu',
    'menu_id'               => 'side-menu',
    'depth'                 => 2,
    'walker'                => new KSS_Walker_Side_Nav_Menu()
);

wp_nav_menu( $nav_menu_args ); ?>