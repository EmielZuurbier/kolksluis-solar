<?php
/**
 * Theme:				
 * Template:			home.php
 * Description:			
 */

get_header();
?>

<main id="main" role="main">
	<article class="js-ajax-container">
		<div class="js-ajax-content">

			<?php kss_get_hero( 'home' ); ?>

			<div class="layout layout--page">
				<div class="layout__container">

					<div class="layout__grid">
					<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

						<?php kss_get_news( 'item-small' ); ?>

					<?php } } ?>
					</div>

				</div>
			</div>

		</div>
	</article>
</main>

<?php
get_footer();
?>
