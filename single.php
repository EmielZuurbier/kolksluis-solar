<?php
/**
 * single.php
 */

get_header();
?>

<main id="main" role="main">

	<article class="story">
		<div class="js-ajax-container">
			<div class="js-ajax-content">

				<?php kss_get_hero( 'single' ); ?>

				<div class="flow">

					<?php
					// Backdrop
					kss_get_backdrop(); ?>
								
					<?php 
					// Layout
					kss_get_layout( 'default' ); ?>
					
					<?php
					$post = get_previous_post( true );
					if ( is_a( $post , 'WP_Post' ) ) { ?>
						<div class="layout">
							<div class="layout__container">
								<div class="layout__body">

									<div class="content content--intro">
										<h3 class="title">Gerelateerd nieuws</h3>
										<p>Lees verder wat we hiervoor gedaan hebben.</p>
									</div>

								</div>
								<div class="layout__body">

									<?php 
									setup_postdata( $post );
									kss_get_news( 'item-large' );
									wp_reset_postdata(); ?>

								</div>
							</div>
						</div>
					<?php } ?>

				</div>
				
			</div>
		</div>

	</article>
</main>

<?php
get_footer();
?>
