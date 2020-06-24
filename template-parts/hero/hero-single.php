<?php
/**
 * hero-single.php
 */

$hero 				= get_field( 'hero' );
$hero_thumbnail 	= $hero[ 'thumbnail' ];
$hero_title			= $hero[ 'title' ];
$hero_intro			= $hero[ 'intro' ];
?>

<header class="hero">
	<figure class="hero__thumbnail">
		<img class="image image--cover" src="<?php echo $hero_thumbnail[ 'url' ]; ?> ?>" alt="<?php echo $hero_thumbnail[ 'alt' ]; ?>"/>
	</figure>
	<div class="hero__container">
		<div class="hero__content">
			<div class="panel">
				<div class="panel__content">
					<div class="block">
						<div class="block__body">
							<h1><?php if ( $hero_title !== '' ) { echo $hero_title; } else { the_title(); } ?></h1>
							<time class="date" datetime="<?php the_time( 'd-m-Y' ); ?>"><?php the_time( 'l, j F o'); ?></time>
							<?php echo $hero_intro; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>