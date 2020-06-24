<?php
/**
 * contact.php
 * 
 * Template Name:		Contact		
 */

get_header();

$contact 	= get_field( 'contact' );
$phone		= $contact[ 'phone' ];
$email		= $contact[ 'email' ];
$map		= $contact[ 'address' ];
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

							
							<div class="panel">
								<div class="panel__content">

									<div class="contact">
										<div class="contact__form">
											<div class="panel__body">
												<h3>Laat een bericht voor ons achter</h3>
												<?php kss_get_form( 'contact' ); ?>
											</div>
										</div>
										<div class="contact__info">
											<div class="panel__body">
												<h3>Contactgegevens</h3>
												<p>Neem contact met ons op.</p>
												<address>

													<?php
													if ( $phone ) {
														$phone_title 	= $phone[ 'title' ];
														$phone_url 		= $phone[ 'url' ]; 
														$phone_target 	= $phone['target'] ? $phone['target'] : '_self'; ?>

														<a class="button" href="tel:<?php echo $phone_url; ?>" target="<?php echo $phone_target; ?>">
															<span class="button__label"><?php echo $phone_title; ?></span>
															<div class="button__icon">
																<i class="fas fa-phone-alt"></i>
															</div>
														</a>
													<?php } ?>

													<?php
													if ( $email ) { 
														$email_title 	= $email[ 'title' ];
														$email_url 		= $email[ 'url' ]; 
														$email_target 	= $email['target'] ? $email['target'] : '_self'; ?>

														<a class="button" href="mailto:<?php echo $email_url; ?>" target="<?php echo $email_target; ?>">
															<span class="button__label"><?php echo $email_title; ?></span>
															<div class="button__icon">
																<i class="fas fa-envelope"></i>
															</div>
														</a>
													
													<?php } ?>

													<?php 
													if ( $map ) { 
														$latitude 	= $map[ 'lat' ];
														$longitude 	= $map[ 'lng' ];
														$address 	= $map[ 'address' ]; ?>

														<a class="button" href="https://www.google.nl/maps/@<?php echo $latitude; ?>,<?php echo $longitude; ?>,15z" target="_blank">
															<span class="button__label"><?php echo $address; ?></span>
															<div class="button__icon">
																<i class="fas fa-location-arrow"></i>
															</div>
														</a>

													<?php } ?>
													
												</address>
											</div>
										</div>
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