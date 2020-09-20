<?php
/**
 * layout-text.php
 */

$content	= get_sub_field( 'content' );

?>

<div class="layout">
	<div class="layout__container">

		<div class="layout__body">
			<div class="content content--justify">
				<?php echo $content; ?>
			</div>
		</div>

	</div>
</div>