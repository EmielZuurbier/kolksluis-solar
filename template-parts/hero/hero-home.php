<?php
/**
 * hero-home.php
 */

$home_id = get_option( 'page_for_posts' );
$home_title = apply_filters( 'the_title', get_the_title( $home_id ) );
?>

<header class="hero">
	<figure class="hero__thumbnail">
		<img class="image image--cover" src="<?php the_post_thumbnail_url(); ?>" alt="<?php echo $home_title; ?>"/>
	</figure>
	<div class="hero__body">
		<div class="hero__content">
			<h2><?php echo $home_title; ?></h2>
		</div>
	</div>
</header>