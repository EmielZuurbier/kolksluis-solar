<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			news.php
 * Description:			Timeline presentation of posts
 */

$args = array(
	'post_type'			=> array( 'post' ),
	'post_status'		=> array( 'publish' ),
	'posts_per_page'	=> 5,
	'orderby'			=> 'date',
	'order'				=> 'DESC'
);

$query = new WP_Query( $args );
?>

<section id="news" class="layout layout--news">
	<div class="layout__container">
		<div class="layout__header">
			<h2>Onze reis tot nu toe.</h2>
		</div>
		<div class="layout__content">
			<div class="news news--time">
				<?php 
				if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post();
					kss_get_news( 'item' );
				} wp_reset_postdata(); } 
				?>
				<span aria-hidden="true" class="news__bar"></span>
			</div>
		</div>
	</div>
</section>