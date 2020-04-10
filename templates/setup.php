<?php
/**
 * setup.php
 * Template Name:		Setup
 * Template Post Type:	page
 */

get_header();
?>

<main id="main" role="main">
	<article class="js-ajax-container">
		<div class="js-ajax-content">

			<?php kss_get_hero( 'page' ); ?>

			<div class="layout layout--page">
				<div class="layout__container">

					<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

						<?php if ( get_the_content() ) { ?>
							<div class="layout__content">
								<div class="content">

								</div>
							</div>
						<?php } ?>

					<?php } } ?>
				</div>
			</div>

	</article>
</main>

<?php
get_footer();
?>