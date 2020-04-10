<?php
/**
 * shortcodes.php 
 */

/**
 * kss_create_happy_shortcode
 * 
 * Wraps a span with happy class around the content.
 * 
 * @param array $atts
 * @param string $content
 * @return string
 */
add_shortcode( 'happy', 'kss_create_happy_shortcode' );
function kss_create_happy_shortcode( $atts, $content = null ) {
	return '<span>' . $content . '<span>';
}