<?php
/**
 * footer.php
 */

/**
 * footer_theme_templates
 * 
 * Add templates that have to be included
 * at the bottom of the page.
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/functions/wp_footer/
 */
add_action( 'wp_footer', 'footer_theme_templates', 11, 0 );
function footer_theme_templates() {
    
}

/**
 * body_cookies
 * 
 * Scripts that will be output in the body 
 * when the cookies have been accepted by the user.
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_footer
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_footer
 */
add_action( 'wp_footer', 'body_cookies_end', 10 );
function body_cookies_end() {

	$cookie_active 			    = get_theme_mod( 'cookie_active' );
	$cookie_name                = get_theme_mod( 'cookie_name' );
	$cookie_code_body			= get_theme_mod( 'cookie_code_body_end' );

	if ( $cookie_active && isset( $_COOKIE[ $cookie_name ] ) && $_COOKIE[ $cookie_name ] === 'accepted' ) {
		echo $cookie_code_body;
	}

}