<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			news-item.php
 * Description:			A single news item
 */

?>

<article class="news-item">
	<div class="news-item__meta">
		<div class="news-item__meta-wrapper">
			<time datetime="<?php the_time( 'd-m-Y' ); ?>">
				<?php the_time( 'l, j F o'); ?>
			</time>
		</div>
	</div>
	<div class="news-item__content">
		<div class="news-item__content-wrapper">
			<figure class="news-item__thumbnail">
				<?php kss_the_lazy_post_image(); ?>
			</figure>
			<header class="news-item__header">
				<h3 class="news-item__title"><?php the_title(); ?></h3>
			</header>
			<div class="news-item__body">
				<?php the_excerpt(); ?>
			</div>
			<div class="news-item__footer">
				<a href="<?php the_permalink(); ?>" class="button button--light">
					<span class="button__label">Het hele verhaal</span>
				</a>
			</div>
		</div>
	</div>
</article>