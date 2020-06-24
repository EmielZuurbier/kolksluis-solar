<?php
/**
 * member-item.php
 */

$social		= get_field( 'social_links' );
$linkedin	= $social[ 'linkedin' ];

?>

<article class="panel">
	<div class="panel__content">
		<div class="block block--portrait">
			<figure class="block__thumbnail">
				<?php kss_the_post_image( 'portrait' ); ?>
			</figure>
			<div class="block__body">
				<h3><?php the_title(); ?></h3>
				<?php the_excerpt(); ?>
				<?php if ( $linkedin ) { ?>

					<?php
					$link_title 	= $linkedin[ 'title' ];
					$link_url 		= $linkedin[ 'url' ]; 
					$link_target 	= $linkedin['target'] ? $linkedin['target'] : '_self'; ?>

					<a class="button button--wide" href="<?php echo $link_url; ?>" target="<?php echo $link_target; ?>">
						<span class="button__label"><?php echo $link_title; ?></span>
						<div class="button__icon">
							<i class="fab fa-linkedin-in"></i>
						</div>
					</a>
					
				<?php } ?>
			</div>
		</div>
	</div>
</article>