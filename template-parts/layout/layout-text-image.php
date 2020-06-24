<?php
/**
 * layout-text-image.php
 */

$settings 		= get_sub_field( 'settings' );
$order			= $settings[ 'order' ];
$content 		= get_sub_field( 'content' );
$image			= get_sub_field( 'image' );
$image_caption	= $image[ 'caption' ];
$image_file		= $image[ 'file' ];
?>

<div class="layout">
	<div class="layout__container">
		<div class="panel">
			<div class="panel__content">
	
				<div class="block block--large">
					<figure class="block__thumbnail figure">
						<img class="figure__image" src="<?php echo $image_file[ 'url' ]; ?>" alt="<?php echo $image_file[ 'alt' ]; ?>"/>
						<?php if (  $image_file[ 'caption' ] !== '' ) { ?>
							<figcaption class="figure__caption">
								<p><?php echo $image_file[ 'caption' ]; ?></p>
							</figcaption>
						<?php } ?>
					</figure>
					<div class="block__body">
						<?php echo $content; ?>
					</div>
				</div>
	
			</div>
		</div>
	</div>
</div>