<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			front-page.php
 * Description:			
 */

get_header();

?>

<main role="main">

	<article class="story" role="article">
		<div class="js-ajax-container">
			<div class="js-ajax-content">
				
				<?php
				// Hero
				kss_get_hero( 'front-page' ); ?>

				<div class="flow">

					<?php
					// Backdrop
					kss_get_backdrop(); ?>

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
		</div>
	</article>

</main>

<?php
get_footer();
?>