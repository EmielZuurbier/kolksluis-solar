<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			front-page.php
 * Description:			
 */

get_header();

?>

<main role="main">

	<canvas class="js-backdrop backdrop"></canvas>

	<article class="story" role="article">
		<div class="js-ajax-container">
			<div class="js-ajax-content">
				
				<?php
				// Hero
				kss_get_hero( 'front-page' ); ?>

				<?php 
				// Content
				get_template_part( './inc/content/content', 'front-page' ); ?>

				<?php
				// Intro 
				kss_get_intro(); ?>

				<?php
				// News 
				kss_get_news(); ?>

				<?php
				// Map
				kss_get_map(); ?>

				<?php
				// About 
				kss_get_about(); ?>

			</div>
		</div>
	</article>

</main>

<?php
get_footer();
?>