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

// $templates = [

// 	// Core
// 	'lib/core/ajax.php',			// Ajax functions
// 	'lib/core/cleanup.php',			// Head cleanup
// 	'lib/core/cookie.php',			// Cookie related functions
// 	'lib/core/filters.php',			// Filter hooks
// 	'lib/core/helpers.php',			// Helper functions
// 	'lib/core/meta.php',			// Meta functions

// 	// Theme
// 	'lib/theme/theme-support.php',	// Theme support settings
// 	'lib/theme/gutenberg.php',		// Gutenberg modifications
// 	'lib/theme/post-types.php',		// Custom post types
// 	'lib/theme/taxonomies.php',		// Custom taxonomies
// 	'lib/theme/navigation.php',		// Navigation registeration and Walkers
// 	'lib/theme/customizer.php',		// Customizer modifications
// 	'lib/theme/enqueue.php',		// Enqueue CSS and JS
// 	'lib/theme/head.php',			// wp_head output
// 	'lib/theme/admin.php',			// Custom admin settings
// 	'lib/theme/sidebars.php',		// Sidebar registration
// 	'lib/theme/widgets.php',		// Custom widgets
// 	'lib/theme/rest.php',			// Rest settings
// 	'lib/theme/translations.php',	// Translation settings

// 	// Plugins
// 	'lib/plugins/gf.php',			// Gravity Forms
// 	'lib/plugins/acf.php',			// Advanced Custom Fields
// 	'lib/plugins/woocommerce.php',	// Woocommerce settings
// 	'lib/plugins/wpml.php',			// WPML configuration
	
// ];

/**
 * Loop over each template
 * and locate it
 */
foreach ( $templates as $template ) {
	locate_template( $template, true, true );
}

?>
