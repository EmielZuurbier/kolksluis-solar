<?php
/**
 * Theme:				Kolksluis Solar
 * Template:			navigation-default.php
 * Description:			Default navigation template
 */

// wp_nav_menu arguments
$nav_menu_args = array(
	'theme_locaion'			=> 'main-menu',
	'container'				=> 'nav',
	'container_class'		=> 'nav nav--main-menu',
	'walker'				=> new Custom_Walker_Nav_Menu()
);

wp_nav_menu( $nav_menu_args );
?>

<header class="header header--default">
	<div class="header-container">
		<div class="header-brand">
			<h1 class="header-title"><?php bloginfo( 'name' ); ?></h1>
		</div>
		<div class="header-navigation">
			<button type="button" class="toggle toggle--menu">
				<div class="toggle-inner"></div>
			</button>
		</div>
	</div>
</header>