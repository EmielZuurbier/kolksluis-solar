<?php
/**
 * layout-image.php
 */

$image = get_sub_field( 'image' );
?>

<div class="layout">
	<div class="layout__container">
		<div class="content content--media">
			<div class="panel">
				<figure class="figure panel__content">
					<picture class="figure__image">
						<source srcset="<?php echo $image[ 'url' ]; ?>"/>
						<img src="<?php echo $image[ 'url' ]; ?>" alt="<?php echo $image[ 'alt' ]; ?>"/>
					</picture>
					<?php if ( $image[ 'caption' ] !== '' ) { ?>
						<figcaption class="figure__caption">
							<p><?php echo $image[ 'caption' ]; ?></p>
						</figcaption>
					<?php } ?>
				</figure>
			</div>
		</div>
	</div>
</div>