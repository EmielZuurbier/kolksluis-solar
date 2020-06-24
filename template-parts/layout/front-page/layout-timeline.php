<?php
/**
 * layout-timeline.php
 */

$head 		= get_sub_field( 'head' );
$title		= $head[ 'title' ];
$intro		= $head[ 'intro' ];

$home_id 		= get_option( 'page_for_posts' );
$home_permalink = get_the_permalink( $home_id );

$args = array(
	'post_type'			=> array( 'post' ),
	'post_status'		=> array( 'publish' ),
	'posts_per_page'	=> 5,
	'orderby'			=> 'date',
	'order'				=> 'DESC'
);

$query = new WP_Query( $args );
?>

<section class="layout">
	<div class="layout__container">
		
		<?php if ( $title || $intro ) { ?>
			<header class="layout__body">
				<div class="content content--intro">
					<?php if ( $title ) { ?>
						<h2 class="title"><?php echo $title; ?></h2>
					<?php } ?>
					<?php if ( $intro ) { ?>
						<p><?php echo $intro; ?></p>
					<?php } ?>
				</div>
			</header>
		<?php } ?>

		<div class="layout__body">
			<div class="timeline timeline--front-page">
				<div class="timeline__calendar">
					<?php 
					if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post();
						kss_get_news( 'item' );
					} wp_reset_postdata(); } 
					?>
				</div>
				<div aria-hidden="true" class="timeline__bar">
					<span class="timeline__line"></span>
				</div>
			</div>
		</div>

		<div class="layout__body">
			<div class="content content--flex-center">
				<a href="<?php echo $home_permalink; ?>" class="button">
					<span class="button__label">Meer nieuws bekijken</span>
					<div class="button__icon">
						<i class="fas fa-arrow-right"></i>
					</div>
				</a>
			</div>
		</div>

	</div>
</section>