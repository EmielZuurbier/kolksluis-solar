<?php
/**
 * Theme:				
 * Template:			home.php
 * Description:			
 */

get_header();
?>

<main role="main">

	<article class="layout js-ajax-container" role="article">
		<div class="layout-container js-ajax-content">

			<?php get_template_part( './inc/content/content', 'home' ); ?>

		</div>
	</article>

</main>

<?php
get_footer();
?>
