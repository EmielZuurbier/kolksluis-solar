<?php
/**
 * setup.php
 * Template Name:		Setup
 * Template Post Type:	page
 */

get_header();

$elaboration = 	get_field( 'elaboration' );
$conclusion = 	get_field( 'conclusion' );

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
					// Layout
					kss_get_layout( 'setup' ); ?>

				</div>

			</div>
		</div>
	</article>
</main>

<?php
get_footer();
?>