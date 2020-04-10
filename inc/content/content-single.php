<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			content-single.php
 * Description:			
 */

?>

<div class="layout-content js-ajax-result">
	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

		<?php if ( get_the_content() ) { ?>
			<div class="container">
				<div class="row">
					<div class="box">
						<?php the_content(); ?>
					</div>
				</div>
			</div>
		<?php } ?>

	<?php } } ?>
<div class="layout-content js-ajax-result">