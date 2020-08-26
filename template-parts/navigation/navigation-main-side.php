<?php
/**
 * navigation-main-side.php
 */

// Create arguments for navigation
$nav_menu_args = array(
    'theme_location'        => 'menu-main',
    'container'             => 'nav',
    'container_class'       => 'navigation-side-main',
    'menu_class'            => 'side-menu',
    'menu_id'               => 'side-main-menu',
    'depth'                 => 1,
    'walker'                => new KSS_Walker_Side_Nav_Menu()
);

wp_nav_menu( $nav_menu_args ); ?>