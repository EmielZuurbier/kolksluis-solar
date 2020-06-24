<?php
/**
 * hero-home.php
 */

$home_id = get_option( 'page_for_posts' );
$home_title = apply_filters( 'the_title', get_the_title( $home_id ) );
$hero = get_field( 'hero', $home_id );
?>

<header class="hero">
	<figure class="hero__thumbnail">
		<img class="image image--cover" src="<?php echo $hero[ 'thumbnail' ][ 'url' ]; ?> ?>" alt="<?php echo $hero[ 'thumbnail' ][ 'alt' ]; ?>"/>
	</figure>
	<div class="hero__container">
		<div class="hero__content">
			<div class="panel">
				<div class="panel__content">
					<div class="block">
						<div class="block__body">
							<h2><?php if ( $hero[ 'title' ] !== '' ) { echo $hero[ 'title' ]; } else { echo $home_title; } ?></h2>
							<?php echo $hero[ 'intro' ]; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>