<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			header.php
 * Description:			
 */
?>
<!DOCTYPE html>
<!-- Made by Control || controldigital.nl -->
<html lang="<?php bloginfo( 'language' ); ?>" class="no-js">
	<head>

		<?php 
		// WP Head output
		wp_head(); ?>

		<?php 
		// Head template of cookie
		get_template_part( './inc/cookies/cookies', 'head' ); ?>
		
	</head>
	<body <?php body_class(); ?>>
	
		<?php 
		// Body template of cookie
		get_template_part( './inc/cookies/cookies', 'body' ); ?>

		<?php 
		// Splash screen
		get_template_part( './inc/loader/splash' ); ?>

		<?php
		// Canvas background
		// get_template_part( './inc/background/background', 'video' ); ?>

		<?php
		// Banner
		kss_get_banner();
