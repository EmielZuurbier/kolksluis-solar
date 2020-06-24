<?php
/**
 * contact-form.php 
 */

$redirect_url = kss_get_url_of_children_by_page_id( get_the_id() );
?>

<kss-form id="contact-form">
	<form class="form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" enctype="multipart/form-data">
		<input type="hidden" name="action" value="contact-form"/>
		<kss-input class="form__group">
			<label slot="label" for="contact-name" class="form__label">Naam</label>
			<input slot="input" type="text" class="form__input" name="name" id="contact-name" required>
		</kss-input>
		<kss-input class="form__group">
			<label slot="label" for="contact-email" class="form__label">Emailadres</label>
			<input slot="input" type="email" class="form__input" name="email" id="contact-email" required>
		</kss-input>
		<kss-input class="form__group">
			<label slot="label" for="contact-phone" class="form__label">Telefoonnummer</label>
			<input slot="input" type="tel" class="form__input" name="phone" id="contact-phone" required>
		</kss-input>
		<div class="form__group form__group--textarea">
			<label slot="label" for="contact-message" class="form__label">Bericht</label>
			<textarea slot="input" class="form__textarea" rows="15" name="message" id="contact-message"></textarea>
		</div>
		<div class="form__footer">
			<button type="submit" class="button">
				<span class="button__label">Verstuur</span>
				<div class="button__icon">
					<i class="fas fa-envelope"></i>
				</div>
			</button>
		</div>
		<input type="hidden" name="_wp_nonce" value="<?php echo wp_create_nonce( 'form_handler_nonce' ); ?>"/>
		<?php if ( ! empty( $redirect_url ) ) { ?>
			<input type="hidden" name="_wp_http_referer" value="<?php echo $redirect_url[ 0 ]; ?>">
		<?php } ?>
	</form>
</kss-form>