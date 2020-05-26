<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			about.php
 * Description:			About us three
 */

$args = array(
	'post_type'			=> array( 'member' ),
	'post_status'		=> array( 'publish' ),
	'posts_per_page'	=> 4,
	'orderby'			=> 'menu_order',
	'order'				=> 'ASC'
);

$query = new WP_Query( $args );
?>

<section id="about" class="layout layout--about">
	<div class="layout__container">
		<header class="layout__header">
			<h2>Wie zijn Kolksluis Solar?</h2>
			<p>Kolksluis Solar is opgericht door 4 leden van de familie Zuurbier die<br> geloven in de toekomst van duurzame energie.</p>
		</header>
		<div class="layout__content">
			<div class="layout__members">

				<?php 
				if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post();
					kss_get_about( 'item' );
				} wp_reset_postdata(); } 
				?>

			</div>
		</div>
	</div>
</section>