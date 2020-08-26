<?php
/**
 * layout-image.php
 */

$video 				= get_sub_field( 'video' );
$video_source 		= $video[ 'source' ];
$video_local 		= $video[ 'video_local' ];
$video_external 	= $video[ 'video_external' ];
?>

<div class="layout">
	<div class="layout__container">
		<div class="content content--media">
			<?php if ( $video_source === 'local' ) { ?>
				<div class="panel">
					<div class="panel__content">
						<kss-lazy class="video-container" targets="video">
							<kss-video>
								<video slot="video" class="video figure__image" playsinline preload="metadata">
									<source data-src="<?php echo $video_local[ 'url' ]; ?>" type="<?php echo $video_local[ 'mime_type' ]; ?>">
									<p>Uw browser ondersteunt geen video element.</p>
								</video>
								<button class="button button--control" slot="play">
									<span class="button__label">Afspelen</span>
									<div class="button__icon">
										<i class="fas fa-play"></i>
									</div>
								</button>
								<button class="button button--control" slot="pause">
									<span class="button__label">Pauzeren</span>
									<div class="button__icon">
										<i class="fas fa-pause"></i>
									</div>
								</button>
								<input type="range" min="0" max="1" step="0.01" value="0" slot="seeker">
								<button class="button button--control" slot="mute">
									<span class="button__label">Stil</span>
									<div class="button__icon">
										<i class="fas fa-volume-mute"></i>
									</div>
								</button>
							</kss-video>
						</kss-lazy>
					</div>
				</div>
			<?php } else if ( $video_source === 'external' ) { ?>
				<div class="panel">
					<div class="panel__content">
						<div class="iframe-container">
							<?php echo $video_external; ?>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	</div>
</div>