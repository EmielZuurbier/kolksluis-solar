<?php
/**
 * footer.php
 */

?>

<footer class="footer">
	<div class="layout layout--footer">
		<div class="layout__container">
			<div class="footer__container">
		
				<div class="footer__logo">
		
					<svg class="kss-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 391 162">
						<g fill-rule="evenodd">
							<text class="kss-logo__text">
								<tspan class="kss-logo__word" x="0" y="72">KOLKSLUIS</tspan> 
								<tspan class="kss-logo__word" x="167" y="153"> SOLAR</tspan>
							</text>
							<g class="kss-logo__shapes" transform="translate(15 102)">
								<g transform="translate(36)">
									<g class="kss-logo__step kss-logo__step--one">
										<g class="kss-logo__step kss-logo__step--two">
											<g class="kss-logo__step kss-logo__step--three">
												<polyline class="kss-logo__panel kss-logo__panel--four" points="45.5275591 0 59 0 59 48 45.5275591 48"/>          
											</g>
											<polyline class="kss-logo__panel kss-logo__panel--three" points="22.7637795 0 36.2362205 0 36.2362205 48 22.7637795 48"/>
										</g>
										<polyline class="kss-logo__panel kss-logo__panel--two" points="0 0 13.4724409 0 13.4724409 48 0 48"/>
									</g>
								</g>
								<rect class="kss-logo__panel kss-logo__panel--one" width="26" height="48" x="0.4231"/>
							</g>
						</g>
					</svg>
		
				</div>
		
				<div class="footer__nav footer__nav--primary">
					<?php dynamic_sidebar( 'sidebar-footer-1' ); ?>
				</div>
		
				<div class="footer__nav footer__nav--secundary">
					<?php dynamic_sidebar( 'sidebar-footer-2' ); ?>
				</div>
				
			</div>
			<div class="footer__bottom">
				<p class="small">&copy; <?php echo date( 'Y' ); ?> Kolksluis solar - All Rights Reserverd.</p>
			</div>
		</div>
	</div>
</footer>