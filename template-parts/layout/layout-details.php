<?php
/**
 * layout-setup.php
 */

$head 		= get_sub_field( 'head' );
$title		= $head[ 'title' ];
$intro		= $head[ 'intro' ];
?>

<div class="layout">
	<div class="layout__container">

		<?php if ( $title || $intro ) { ?>
			<header class="layout__body">
				<div class="content content--intro">
					<?php if ( $title ) { ?>
						<h2 class="title"><?php echo $title; ?></h2>
					<?php } ?>
					<?php if ( $intro ) { ?>
						<p><?php echo $intro; ?></p>
					<?php } ?>
				</div>
			</header>
		<?php } ?>

		<div class="layout__body">
			<div class="panel">
				<div class="panel__content">
	
					<kss-setup class="details">

						<div class="details__image" slot="image">
							<?php kss_get_panel(); ?>
						</div>

						<?php if ( have_rows( 'details' ) ) { while ( have_rows( 'details' ) ) { the_row(); ?>
	
							<?php
							$id			= get_sub_field( 'id' );
							$label 		= get_sub_field( 'label' );
							$content	= get_sub_field( 'content' ); ?>
	
							<button slot="tab" id="tab-<?php echo $id; ?>" class="details__tab button button--control button--wide" value="panel-<?php echo $id; ?>">
								<span class="button__label"><?php echo $label; ?></span>
								<div class="button__icon">
									<span class="detail__count"></span>
								</div>
							</button>
	
							<div slot="panel" id="panel-<?php echo $id; ?>" class="details__panel">
								<h4 class="detail__title"><span><?php echo $label; ?></span></h4>
								<p><?php echo $content; ?></p>
							</div>
	
						<?php } } ?>
					</kss-setup>
	
				</div>
			</div>
		</div>
	</div>
</div>