<?php
/**
 * banner.php
 */
?>

<kss-banner room class="banner banner--default">
	<header class="banner__container">
		<div class="banner__brand">
			<a href="<?php echo home_url( '/' ); ?>" title="Home" rel="home">
				<h1 class="banner__title"><?php bloginfo( 'name' ); ?></h1>
			</a>
		</div>
		<kss-menu class="banner__menu js-menu" id="menu">
			<div class="banner__menu-inner">
				<?php kss_get_navigation(); ?>
			</div>
		</kss-menu>
		<div class="banner__navigation">
			<button type="button" class="toggle toggle--menu js-menu-toggle" aria-controls="menu" aria-expanded="false">
				<div class="toggle__inner"></div>
			</button>
		</div>
	</header>
</kss-banner>