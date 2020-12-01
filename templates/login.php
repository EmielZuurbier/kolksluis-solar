<?php
/**
 * login.php
 * Template Name:		Login
 * Template Post Type:	page
 */

get_header();

?>

<main id="main" role="main">

	<article class="story">
		<div class="js-ajax-container">
			<div class="js-ajax-content">

				<div class="flow">

					<?php
					// Backdrop
					kss_get_backdrop(); ?>

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