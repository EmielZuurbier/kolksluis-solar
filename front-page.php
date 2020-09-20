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
					<kss-spotter selector=".spot">

						<?php
						// Backdrop
						kss_get_backdrop(); ?>

						<?php
						// Layout
						kss_get_layout( 'front-page' ); ?>

					</kss-spotter>
				</div>

			</div>
		</div>
	</article>

</main>

<?php
get_footer();
?>