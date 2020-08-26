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
$address	= $contact[ 'address' ];
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

					<?php 
					// Layout
					kss_get_layout( 'default' ); ?>

					<section id="contact" class="layout">
						<div class="layout__container">
							<div class="layout__body">
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
	
															<a class="button" href="<?php echo $phone_url; ?>" target="<?php echo $phone_target; ?>">
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
	
															<a class="button" href="<?php echo $email_url; ?>" target="<?php echo $email_target; ?>">
																<span class="button__label"><?php echo $email_title; ?></span>
																<div class="button__icon">
																	<i class="fas fa-envelope"></i>
																</div>
															</a>
														
														<?php } ?>
	
														<?php 
														if ( $address ) { 
															$sentence = implode( ' ', $address );?>
															<p><em><?php echo $sentence; ?></em></p>
														<?php } ?>
														
														<kss-map 
															class="map"
															access-token="pk.eyJ1IjoibWlsb3NhdXJ1cyIsImEiOiJja2FzM2NobmEwbGRiMnFxZm1rNG0ydDFnIn0.1chjWNs_Eom2MgUF-nfS3w"
															map-style="mapbox://styles/milosaurus/cka9ntnsf1fcl1jpd759hdudv"
															center='{"lat": "52.846529", "lng": "4.753624"}'
															zoom="14">
															<button slot="center" class="button button--control">
																<span class="button__label">Naar Kolksluis Solar</span>
																<div class="button__icon">
																	<i class="fas fa-location-arrow"></i>
																</div>
															</button>
															<button slot="zoom-in" class="button button--control">
																<span class="button__label">Inzoomen</span>
																<div class="button__icon">
																	<i class="fas fa-search-plus"></i>
																</div>
															</button>
															<button slot="zoom-out" class="button button--control">
																<span class="button__label">Uitzoomen</span>
																<div class="button__icon">
																	<i class="fas fa-search-minus"></i>
																</div>
															</button>
														</kss-map>
	
													</address>
	
												</div>
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