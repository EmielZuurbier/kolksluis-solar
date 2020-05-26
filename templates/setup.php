<?php
/**
 * setup.php
 * Template Name:		Setup
 * Template Post Type:	page
 */

get_header();

$elaboration = 	get_field( 'elaboration' );
$conclusion = 	get_field( 'conclusion' );

?>

<main id="main" role="main">
	<article class="js-ajax-container">
		<div class="js-ajax-content">

			<?php kss_get_hero( 'page' ); ?>

			<section id="elaboration" class="layout layout--page">
				<div class="layout__container">
					<div class="layout__content">
						<div class="content">

							<?php if ( $elaboration[ 'title' ] ) { ?>
								<h3><?php echo $elaboration[ 'title' ]; ?></h3>
							<?php } ?>

							<?php echo $elaboration[ 'content' ]; ?>

						</div>
					</div>
					<div class="layout__details">

						<ul class="details details--left">
							<?php foreach( $elaboration[ 'details' ][ 'left' ] as $detail ) { ?>
								<li class="details__item">
									<h4 class="detail__title"><?php echo $detail[ 'detail_title' ]; ?></h4>
									<p class="detail__body"><?php echo $detail[ 'detail_content' ]; ?></p>
								</li>
							<?php }  ?>
						</ul>

						<div class="isometric">

						</div>

						<ul class="details details--right">
							<?php foreach( $elaboration[ 'details' ][ 'right' ] as $detail ) { ?>
								<li class="details__item">
									<h4 class="detail__title"><?php echo $detail[ 'detail_title' ]; ?></h4>
									<p class="detail__body"><?php echo $detail[ 'detail_content' ]; ?></p>
								</li>
							<?php } ?>
						</ul>

					</div>
				</div>
			</section>

			<section id="conclusion" class="layout layout--page">
				<div class="layout__container">
					<div class="layout__conclusion">
						<div class="content">

							<?php if ( $conclusion[ 'content' ][ 'title' ] ) { ?>
								<h3><?php echo $conclusion[ 'content' ][ 'title' ]; ?></h3>
							<?php } ?>

							<?php echo $conclusion[ 'content' ][ 'content' ]; ?>

						</div>
						<div class="panel">
							<div class="panel__content">
								<picture>
									<source src="<?php echo $conclusion[ 'image' ][ 'url' ]; ?>">
									<img src="<?php echo $conclusion[ 'image' ][ 'url' ]; ?>" alt="<?php echo $conclusion[ 'image' ][ 'alt' ]; ?>"/>
								</picture>
							</div>
						</div>
					</div>
				</div>
			</section>

	</article>
</main>

<?php
get_footer();
?>