<?php
/**
 * hero.php
 */

$hero = get_field( 'hero' );
?>

<header class="hero">
	<figure class="hero__thumbnail">
		<img class="image image--cover" src="<?php echo $hero[ 'thumbnail' ][ 'url' ]; ?> ?>" alt="<?php echo $hero[ 'thumbnail' ][ 'alt' ]; ?>"/>
	</figure>
	<div class="hero__container">
		<div class="hero__content">
			<h2><?php if ( $hero[ 'title' ] !== '' ) { echo $hero[ 'title' ]; } else { the_title(); } ?></h2>
			<?php echo $hero[ 'intro' ]; ?>
		</div>
	</div>
</header>