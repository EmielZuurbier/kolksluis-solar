<?php
/**
 * layout-gallery.php
 */

$gallery = get_sub_field( 'gallery' );
?>

<div class="layout">
	<div class="layout__container">
		<div class="content content--media">
			<div class="panel">
				<div class="panel__content">
					<kss-slider
						speed="750" 
						class="slider slider--small">
						<?php foreach( $gallery as $image ) { ?>
							<kss-slide slot="slide">
								<img src="<?php echo $image[ 'sizes' ][ 'slider-16-9' ]; ?>" alt="<?php echo $image[ 'alt' ]; ?>"/>
							</kss-slide>
						<?php } ?>
						<button slot="prev" class="button button--control button--wide">
							<div class="button__icon">
								<i class="fas fa-arrow-left"></i>
							</div>
							<span class="button__label">Vorige</span>
						</button>
						<button slot="next" class="button button--control button--wide button--right">
							<span class="button__label">Volgende</span>
							<div class="button__icon">
								<i class="fas fa-arrow-right"></i>
							</div>
						</button>
					</kss-slider>
				</div>
			</div>
		</div>
	</div>
</div>