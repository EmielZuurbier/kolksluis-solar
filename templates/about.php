<?php
/**
 * about.php
 * Template Name:		About
 * Template Post Type:	page
 */

get_header();

?>

<main id="main" role="main">

	<article class="story">
		<div class="js-ajax-container">
			<div class="js-ajax-content">

				<?php kss_get_hero( 'page' ); ?>

				<div class="flow">

					<?php
					// Backdrop
					kss_get_backdrop(); ?>

					<?php
					// About
					kss_get_member(); ?>

					<?php
					// Layout
					kss_get_layout( 'default' ); ?>

				</div>
			</div>
		</div>
	</article>

</main>

<?php
get_footer();
?>