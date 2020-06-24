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
					// Layout
					kss_get_layout( 'front-page' ); ?>

				</div>

			</div>
		</div>
	</article>

</main>

<?php
get_footer();
?>