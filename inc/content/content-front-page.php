<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			content-front-page.php
 * Description:			
 */

?>

<?php
if ( have_posts() ) {
	while ( have_posts() ) {
		the_post();
		the_content();

		
	}
} 
?>