<?php
/**
 * enqueue.php
 */

/**
 * Theme styles
 * Add styles for the theme
 * 
 * @since	1.0
 */
add_action( 'wp_enqueue_scripts', 'enqueue_theme_styles' );
function enqueue_theme_styles() {

	/**
	 * Unregister gutenberg blocks
	 */
	wp_deregister_style( 'wp-block-library' );
	wp_deregister_style( 'wp-block-library-theme' );

	/**
	 * Style
	 * 
	 * Main stylesheet of this theme
	 */
	wp_register_style( 'style', get_template_directory_uri() . '/dist/css/style.css', false, false, 'all' );
	wp_enqueue_style( 'style' );

}

/**
 * Theme scripts
 * Add scripts to the head or body
 * 
 * @since	1.0
 */
add_action( 'wp_enqueue_scripts', 'enqueue_theme_scripts' );
function enqueue_theme_scripts() {

	wp_deregister_script( 'wp-embed' );
	wp_deregister_script( 'jquery' );

	/**
	 * WebfontLoader
	 * @link	https://github.com/typekit/webfontloader
	 */
	wp_enqueue_script( 'webfontLoader', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', false, false, true );
	wp_add_inline_script( 'webfontLoader', "WebFont.load({
		google: {
			families: ['Montserrat:200,300,400,600&display=swap']
		},
		custom: {
			families: ['Font Awesome 5 Free'],
			urls: ['//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css?display=swap']
		}
	});" );

	/**
	 * jQuery 
	 * @link	http://api.jquery.com/
	 */
	wp_register_script( 'jquery', '//code.jquery.com/jquery-3.3.1.min.js', false, '3.3.1', false );
	// wp_enqueue_script( 'jquery' );

	/**
	 * WebComponents Polyfill
	 */
	wp_register_script( 'webcomponents', '//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.0/webcomponents-bundle.js', false, '2.4.0', true );
	// wp_enqueue_script( 'webcomponents' );

	/**
	 * Script
	 * 
	 * This file includes the general script of handling
	 * interactions and DOM modifications.
	 */
	wp_register_script( 'script', get_template_directory_uri() . '/dist/js/script.js', false, false, true );
	wp_localize_script( 'script', 'wp', array(
		'ajax' 			=> admin_url( 'admin-ajax.php' ),
		'theme' 		=> get_template_directory_uri(),
		'rest'			=> esc_url( get_rest_url() ),
	) );
	wp_enqueue_script( 'script' );

}

/**
 * Add attributes to the style tag
 * 
 * Set the rel attribute on the css file to preload.
 * This is a the modern way of async loading files.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/style_loader_tag/
 * @return	string
 */
add_filter( 'style_loader_tag', 'custom_style_attributes', 10, 4 );
function custom_style_attributes( $html, $handle, $href, $media ) {
    // Handles to perform the task on
    $handles = array( 'style' );
    if ( in_array( $handle, $handles) ) {
        return '<link id="' . $handle . '-css" href="' . $href . '" rel="stylesheet" media="none" onload="this.media=\'' . $media . '\'">';
    }
    return $html;
}

/**
 * Add attributes to the script tag
 * 
 * Can be used to add a 'async' or 'defer' attribute to a script tag
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/script_loader_tag/
 * @return	string
 */
add_filter( 'script_loader_tag', 'custom_script_attributes', 10, 3 );
function custom_script_attributes( $tag, $handle, $src ) {

	// Add scripts to a handles array to provide them with an extra attribute.
	$async_handles = array();
	$defer_handles = array( 'script' );

	// Script that load async
	if ( in_array( $handle, $async_handles ) ) {
		$tag = '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript" async></script>';
	} 
	
	// Script that defer
	else if ( in_array( $handle, $defer_handles ) ) {
		$tag = '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript" defer></script>';
	} 
	
	// Default scripts
	else {
		$tag = '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript"></script>';
	}

	return $tag;
}
