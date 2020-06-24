<?php
/**
 * news-item-small.php
 */

?>

<article class="news-item">

	<div class="news-item__content panel">
		<div class="news-item__content-wrapper panel__content">
			<a class="block" href="<?php the_permalink(); ?>">
				<figure class="block__thumbnail">
					<?php kss_the_lazy_post_image( 'slider-4-3' ); ?>
				</figure>
				<div class="block__body">
					<h3 class="block__title"><?php the_title(); ?></h3>
					<?php echo get_field( 'hero' )[ 'intro' ]; ?>
					<button class="button">
						<span class="button__label">Lees meer</span> 
						<div class="button__icon">
							<i class="fas fa-arrow-right"></i>
						</div>
					</button>
				</div>
			</a>
		</div>
	</div>

</article>