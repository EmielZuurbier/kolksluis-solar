<?php
/**
 * layout-navigation.php
 */

$navigation_items = 'navigation_items';
?>

<section class="layout layout--navigation">
	<div class="layout__container">
		<nav class="panel">

			<?php if ( have_rows( $navigation_items ) ) { ?>
				<ul class="quick-nav panel__content">

					<?php 
					$delay = 500;
					$interval = 350;
					while ( have_rows( $navigation_items ) ) { the_row(); ?>

						<?php
						$title 			= get_sub_field( 'title' );
						$description 	= get_sub_field( 'description' );
						$link 			= get_sub_field( 'link' ); 
						$link_title 	= $link[ 'title' ];
						$link_url 		= $link[ 'url' ]; 
						$link_target 	= $link['target'] ? $link['target'] : '_self'; 
						$delay += $interval; ?>

						<li class="quick-nav__item spot">
							<a class="block" href="<?php echo $link_url; ?>" target="<?php echo $link_target; ?>">
								<div class="block__body">
									<div class="quick-nav__item-animation" style="transition-duration: <?php echo $delay; ?>ms">
										<h3><?php echo $title; ?></h3>
										<p><?php echo $description; ?></p>
										<button class="button">
											<span class="button__label"><?php echo $link_title; ?></span> 
											<div class="button__icon">
												<i class="fas fa-arrow-right"></i>
											</div>
										</button>
									</div>
								</div>
							</a>
						</li>

					<?php } ?>

				</ul>
			<?php } ?>

		</nav>
	</div>
</section>