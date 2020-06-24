<?php
/**
 * layout-text.php
 */

$head 		= get_sub_field( 'head' );
$title		= $head[ 'title' ];
$intro		= $head[ 'intro' ];
$content	= get_sub_field( 'content' );

?>

<section class="layout">
	<div class="layout__container">

		<?php if ( $title || $intro ) { ?>
			<header class="layout__body">
				<div class="content">
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
			<div class="content content--justify">
				<?php echo $content; ?>
			</div>
		</div>

	</div>
</section>