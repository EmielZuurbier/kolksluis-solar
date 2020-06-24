<?php
/**
 * hero.php
 */

$hero 				= get_field( 'hero' );
$intro				= $hero[ 'intro' ];
$background 		= $hero[ 'background' ];
$background_type	= $background[ 'type' ];
$background_image	= $background[ 'image' ];
$background_video	= $background[ 'video' ];
?>

<header class="hero hero--front-page">
	<figure class="hero__thumbnail">
		<?php if ( $background_type === 'image' ) { ?>
			<img class="image image--cover" src="<?php echo $background_image[ 'url' ]; ?>" alt="<?php echo $background_image[ 'alt' ]; ?>"/>
		<?php } else if ( $background_type === 'video' ) { ?>
			<video autoplay playsinline muted loop class="video video--background">
				<source src="<?php echo $background_video[ 'url' ]; ?>" type="<?php echo $background_video[ 'mime_type' ]; ?>">
				<p>Uw browser ondersteunt geen video element.</p>
			</video>
		<?php } ?> 
	</figure>
	<div class="hero__container">
		<div class="hero__content">
			<h1 class="hero__logo">
				<svg class="kss-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 391 162">
					<title>Kolksluis Solar</title>
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
			</h1>
			<?php echo $intro; ?>
		</div>
	</div>
</header>