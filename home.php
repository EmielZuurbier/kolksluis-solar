<?php
/**
 * Theme:				
 * Template:			home.php
 * Description:			
 */

get_header();

$latest = kss_get_the_latest_news();
$dates = kss_get_the_news_by_month();

?>

<main id="main" role="main">
	<article class="js-ajax-container">
		<div class="js-ajax-content">

			<?php 
			// Hero home.
			kss_get_hero( 'home' ); ?>

			<div class="flow">

				<?php
				// Backdrop.
				kss_get_backdrop(); ?>

				<div class="layout">
					<div class="layout__container">

						<div class="layout__body">
							<div class="layout__content">
								<h3 class="title">Het laatste nieuws</h3>
								<p>Bekijk wat we als laatste gedaan hebben.</p>
							</div>
						</div>

						<div class="layout__body">
							<?php
							// Show each post by month.
							foreach ( $latest as $post ) {
								setup_postdata( $post );
								kss_get_news( 'item-large' );
							}
							wp_reset_postdata(); ?>
						</div>

					</div>
				</div>
				<div class="layout">
					<div class="layout__container">

						<div class="timeline">
							<div class="timeline__bar">
								<span class="timeline__line"></span>
							</div>
							<div class="timeline__calendar">
								<?php foreach ( $dates as $date ) { ?>
									<section class="timeline__group">
										<div class="timeline__content">
											<header class="timeline__header">
												<time class="date" datetime="<?php echo $date[ 'time' ]; ?>"><?php echo date( 'F, Y', $date[ 'time' ] ); ?></time>
											</header>
											<div class="timeline__posts">

												<?php
												// Show each post by month.
												foreach ( $date[ 'posts' ] as $post ) {
													setup_postdata( $post );
													kss_get_news( 'item-small' );
												}
												wp_reset_postdata(); ?>

											</div>
										</div>
									</section>
								<?php } ?>
							</div>
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
