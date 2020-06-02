<?php
/**
 * single.php
 */

get_header();
?>

<main role="main">

	<kss-backdrop class="backdrop"></kss-backdrop>

	<article class="story">

		<div class="js-ajax-container">
			<div class="js-ajax-content">

				<?php kss_get_hero( 'single' ); ?>

				<div class="layout layout--single">
					<div class="layout__container">
						<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

							<?php if ( get_the_content() ) { ?>
								<div class="frame">
									<div class="frame__container">
										<div class="frame__content">
											<div class="content">
												<?php the_content(); ?>
											</div>
										</div>
									</div>
								</div>
								<div class="layout__content">
									<div class="content">
									</div>
								</div>
							<?php } ?>

						<?php } } ?>
					</div>
				</div>
			</div>

	</article>
</main>

<?php
get_footer();
?>
