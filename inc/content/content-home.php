<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			content-home.php
 * Description:			
 */

$posts_per_page 		= isset( $_GET[ 'posts_per_page' ] ) ? $_GET[ 'posts_per_page' ] : 8;
$paged					= isset( $_GET[ 'paged' ] ) ? $_GET[ 'paged' ] : 1;

$args = array(
	'post_type'			=> array( 'post' ),
	'post_status'		=> array( 'publish' ),
	'posts_per_page'	=> $posts_per_page,
	'paged'				=> $paged,
	'orderby'			=> 'date',
	'order'				=> 'DESC'
);

$query = new WP_Query( $args );
?>

<div class="layout-content js-ajax-result">
	<?php if ( $query->have_posts() ) { ?>
		<ul class="grid grid--home">
			<?php while ( $query->have_posts() ) { $query->the_post(); ?>
				<li class="grid-item">
					<div class="grid-item-thumbnail" style="background-image: url(<?php the_post_thumbnail_url(); ?>)"></div>
					<a class="grid-item-link js-grid-link" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
						<span class="grid-item-title"><?php the_title(); ?></span>
					</a>
				</li>
			<?php } wp_reset_postdata(); ?>
		</ul>
	<?php } ?>
</div>