<?php
/**
 * Theme:
 * Template:			functions.php
 * Description:			Overview of all theme functionality
 * 
 * @package 	WordPress
 * @subpackage	Control Theme Template
 *
 * Control WP Theme boilerplate
 * 
 * Use this theme to kickstart yourself into development.
 * Start off by defining these constants here below.
 */
define( 'THEME_NAME', 'Kolksluis Solar' );
define( 'THEME_VERSION', 1.0 );
define( 'THEME_DEV_MODE', true );
define( 'THEME_TEXT_DOMAIN', 'kolksluis_solar' );

/**
 * Set a Google API key to use libaries like
 * Google Maps.
 */
define( 'GOOGLE_API_KEY', '' );

/**
 * All the files and definitions should be placed
 * in the LIB folder and be called here below.
 * 
 * @example
 * locate_template( 'path-to-folder.php', true, true );
 */
$templates = [
	'lib/ajax.php',
	'lib/body.php',
	'lib/customizer.php',
	'lib/enqueue.php',
	'lib/footer.php',
	'lib/head.php',
	'lib/post-types.php',
	'lib/taxonomies.php',
	'lib/theme.php',
	'lib/shortcodes.php',
	'lib/widgets.php',
	'lib/mapbox.php'
];

/**
 * Loop over each template
 * and locate it
 */
foreach ( $templates as $template ) {
	locate_template( $template, true, true );
}

?>
