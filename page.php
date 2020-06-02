<?php
/**
 * page.php
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

				</div>
				
			</div>
		</div>

	</article>
</main>

<?php
get_footer();
?>
