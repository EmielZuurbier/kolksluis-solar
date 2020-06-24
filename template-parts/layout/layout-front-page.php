<?php
/**
 * layout-front-page.php
 */

$layout = 'layout-front-page';

// Loop over layout rows
if ( have_rows( $layout ) ) {
	while ( have_rows( $layout ) ) {
		the_row();

		// Get template name
		$template = get_row_layout();

		// Get template with the name of the template
		kss_get_layout( $template, "/front-page/" );
	}
}

?>