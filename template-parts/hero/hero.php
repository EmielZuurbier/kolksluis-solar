<?php
/**
 * hero-single.php
 */
?>

<header class="hero">
	<figure class="hero__thumbnail">
		<img class="image image--cover" src="<?php the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>"/>
	</figure>
	<div class="hero__body">
		<div class="hero__content">
			<h2><?php the_title(); ?></h2>
		</div>
	</div>
</header>