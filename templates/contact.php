<?php
/**
 * contact.php
 * 
 * Template Name:		Contact		
 */

get_header();

$contact = get_field( 'contact' );
?>

<main id="main" role="main">

	<article class="story">
		<div class="js-ajax-container">
			<div class="js-ajax-content">

				<?php 
				// Hero
				kss_get_hero(); ?>

				<div class="flow">

					<?php
					// Backdrop
					kss_get_backdrop(); ?>

					<section id="contact" class="layout layout--page">
						<div class="layout__container">
							<div class="layout__contact">

								<?php kss_get_form( 'contact' ); ?>

								<div class="panel">
									<div class="panel__content">
										<div class="panel__body">
											<h3>Contactgegevens</h3>
											<address class="contact">
												<ul class="contact__list">
													<?php if ( $contact[ 'phone' ][ 'label' ] && $contact[ 'phone' ][ 'value' ] ) { ?>
														<li class="contact__item">
															<a class="contact__link" href="<?php echo $contact[ 'phone' ][ 'value' ]; ?>">
																<i class="far fa-phone"></i>
																<span><?php echo $contact[ 'phone' ][ 'label' ]; ?></span>
															</a>
														</li>
													<?php } ?>
													<?php if ( $contact[ 'email' ][ 'label' ] && $contact[ 'email' ][ 'value' ] ) { ?>
														<li class="contact__item">
															<a class="contact__link" href="<?php echo $contact[ 'email' ][ 'value' ]; ?>">
																<i class="far fa-envelope"></i>
																<span><?php echo $contact[ 'email' ][ 'label' ]; ?></span>
															</a>
														</li>
													<?php } ?>
													<li class="contact__item">
														<p>
															<?php echo $contact[ 'address' ][ 'street' ]; ?><br>
															<?php echo $contact[ 'address' ][ 'postal_code' ]; ?><br>
															<?php echo $contact[ 'address' ][ 'place' ]; ?>
														</p>
													</li>
												</ul>
											</address>
										</div>
									</div>
								</div>

							</div>
						</div>
					</section>

				</div>

			</div>
		</div>
	</article>
</main>

<?php
get_footer();
?>