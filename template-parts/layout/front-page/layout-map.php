<?php
/**
 * layout-map.php
 */

$head 		= get_sub_field( 'head' );
$title		= $head[ 'title' ];
$intro		= $head[ 'intro' ];

$map			= get_sub_field( 'map' );
$access_token	= $map[ 'access_token' ];
$map_style		= $map[ 'map_style' ];
$center			= $map[ 'center' ];
$zoom			= $map[ 'zoom' ];

$latitude		= $center[ 'latitude' ];
$longitude		= $center[ 'longitude' ];
?>

<section class="layout">
	<div class="layout__container">
		
		<?php if ( $title || $intro ) { ?>
			<header class="layout__body">
				<div class="content content--intro">
					<?php if ( $title ) { ?>
						<h2 class="title"><?php echo $title; ?></h2>
					<?php } ?>
					<?php if ( $intro ) { ?>
						<p><?php echo $intro; ?></p>
					<?php } ?>
				</div>
			</header>
		<?php } ?>

		<div class="layout__body">
			<div class="map">
				<kss-map 
					<?php if ( $access_token ) { ?>
						access-token="<?php echo $access_token; ?>"
					<?php } ?>
					<?php if ( $map_style ) { ?>
						map-style="<?php echo $map_style; ?>"
					<?php } ?>
					<?php if ( $latitude && $longitude ) { ?>
						center='{"lat": "<?php echo $latitude; ?>", "lng": "<?php echo $longitude; ?>"}'
					<?php } ?>
					<?php if ( $zoom ) { ?>
						zoom="<?php echo $zoom; ?>"
					<?php } ?>>
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
			</div>
		</div>
		
	</div>
</section>