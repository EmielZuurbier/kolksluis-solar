<?php
/**
 * banner.php
 */
?>

<kss-banner room class="banner layout layout--banner">
	<header class="layout__container">
		<div class="banner__container">

			<div class="banner__brand">
				<a href="<?php echo home_url( '/' ); ?>" title="Home" rel="home">
					<!-- <h1 class="banner__title"><?php bloginfo( 'name' ); ?></h1> -->
					<div class="banner__logo">
						<?php get_template_part( './template-parts/logo/logo' ); ?>
					</div>
				</a>
			</div>

			<?php kss_get_navigation( 'main' ); ?>

			<kss-menu class="banner__sub-menu js-menu" id="menu">
				<div class="banner__sub-menu-inner">
					<?php kss_get_navigation( 'side' ); ?>
				</div>
			</kss-menu>

			<div class="banner__navigation">
				<button class="button js-menu-toggle" aria-controls="menu" aria-expanded="false">
					<span class="button__label">Menu</span>
					<div class="button__icon toggle toggle--menu">
						<div class="toggle__inner"></div>
					</div>
				</button>
			</div>

		</div>
	</header>
</kss-banner>