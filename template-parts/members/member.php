<?php
/**
 * member.php
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

<section class="layout">
	<div class="layout__container">

		<header class="layout__body">
			<div class="content content--intro">
				<h2 class="title">Wie zijn Kolksluis Solar?</h2>
				<p>Kolksluis Solar is opgericht door 4 leden van de familie Zuurbier die geloven in de toekomst van duurzame energie.</p>
			</div>
		</header>

		<div class="layout__body">
			<div class="layout__columns layout__columns--four">

				<?php 
				if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post();
					kss_get_member( 'item' );
				} wp_reset_postdata(); } 
				?>

			</div>
		</div>

	</div>
</section>