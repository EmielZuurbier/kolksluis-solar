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
	 * Relative URL to current template directory.
	 */
	$template_dir = get_template_directory_uri();

	/**
	 * Unregister gutenberg blocks
	 */
	wp_deregister_style( 'wp-block-library' );
	wp_deregister_style( 'wp-block-library-theme' );

	/**
	 * Mapbox API styles.
	 */
	wp_register_style( 'mapbox', 'https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css', false, false, 'all' );
	wp_enqueue_style( 'mapbox' );

	/**
	 * Style
	 * 
	 * Main stylesheet of this theme
	 */
	wp_register_style( 'style', $template_dir . '/dist/css/style.css', false, false, 'all' );
	wp_add_inline_style( 'style', "
		@font-face {
			font-family: 'Ailerons';
			font-weight: 400;
			src: url('{$template_dir}/assets/media/fonts/ailerons-typeface-webfont.woff2') format('woff2'),
				url('{$template_dir}/assets/media/fonts/ailerons-typeface-webfont.woff') format('woff'),
				url('{$template_dir}/assets/media/fonts/ailerons-typeface-webfont.ttf') format('ttf');
		}
	" );
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

	/**
	 * Relative URL to current template directory.
	 */
	$template_dir = get_template_directory_uri();

	/**
	 * Disable WP Embed and jQuery by default.
	 */
	wp_deregister_script( 'wp-embed' );
	wp_deregister_script( 'jquery' );

	/**
	 * WebfontLoader
	 * @link	https://github.com/typekit/webfontloader
	 */
	wp_register_script( 'webfont-loader', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', null, false, true );
	wp_add_inline_script( 'webfont-loader', "WebFont.load({
		google: {
			families: ['Montserrat:200,300,400,600&display=swap']
		},
		custom: {
			families: ['Font Awesome 5 Free'],
			urls: ['//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css?display=swap']
		}
	});" );
	wp_enqueue_script( 'webfont-loader' );

	/**
	 * jQuery 
	 * @link	http://api.jquery.com/
	 */
	wp_register_script( 'jquery', '//code.jquery.com/jquery-3.3.1.min.js', null, '3.3.1', false );
	// wp_enqueue_script( 'jquery' );

	/**
	 * WebComponents Polyfill
	 */
	wp_register_script( 'webcomponents', '//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.0/webcomponents-bundle.js', null, '2.4.0', true );
	// wp_enqueue_script( 'webcomponents' );

	/**
	 * reCaptcha script.
	 */
	wp_register_script( 'recaptcha', 'https://www.google.com/recaptcha/api.js?render=6Lcr86oZAAAAAOcnk6OExk1Mp8lT7RpB58891L-W', null, false, true );
	if ( is_page_template( 'templates/contact.php' ) ) {
		wp_enqueue_script( 'recaptcha' );
	}

	// Add local WP variables.
	$wp_data = json_encode(array(
		'ajax' 		=> admin_url( 'admin-ajax.php' ),
		'theme' 	=> $template_dir,
		'rest'		=> esc_url( get_rest_url() ),
		'nonce'		=> wp_create_nonce( 'wp_rest' )
	));

	/**
	 * Script
	 * 
	 * This file includes the general script of handling
	 * interactions and DOM modifications.
	 */
	wp_register_script( 'script', $template_dir . '/dist/js/script.js', null, false, true );
	wp_add_inline_script( 'script', "window.wp = {$wp_data}" );
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
	$defer_handles = array();

	// Script that load async
	if ( in_array( $handle, $async_handles ) ) {
		$tag = '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript" async></script>';
	} 
	
	// Script that defer
	else if ( in_array( $handle, $defer_handles ) ) {
		$tag = '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript" defer></script>';
	} 
	
	// // Default scripts
	// else {
	// 	$tag = '<script id="' . $handle . '-js" src="' . $src . '" type="text/javascript"></script>';
	// }

	return $tag;
}
