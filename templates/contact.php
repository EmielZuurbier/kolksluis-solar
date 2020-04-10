<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			contact.php
 * Template Name:		Contact
 * Description:			
 */

get_header();

?>

<main role="main">

	<article class="layout js-ajax-container" role="article">
		<div class="layout-container js-ajax-content">

			<?php get_template_part( './inc/content/content', 'contact' ); ?>

		</div>
	</article>

</main>

<?php
get_footer();
?>