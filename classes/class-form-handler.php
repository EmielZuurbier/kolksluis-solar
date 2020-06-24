<?php
/**
 * class-form.php
 */

/**
 * Include the Form_Fields class.
 */
require_once get_template_directory() . '/classes/class-form-fields.php';

if ( ! class_exists( 'Form_Handler' ) ) {

	/**
	 * Form_Handler
	 * 
	 * Submit and AJAX handler of the print form.
	 * 
	 * @since	1.0
	 * @author	control
	 * @package Form_Handler
	 */
	class Form_Handler {

		/**
		 * @private
		 */
		private $nonce = 'form_handler_nonce';

		/**
		 * @private
		 */
		private $action = '';

		/**
		 * __construct
		 * 
		 * Create a new instance with two parameters.
		 * 
		 * @param	string $action Name of post and ajax action.
		 */
		public function __construct( $action )
		{
			$this->action = $action;
		}

		/**
		 * register_post_actions
		 * 
		 * Registers the form to admin_post hook so we can listen to the response.
		 * 
		 */
		public function register_post_actions() 
		{
			add_action( "admin_post_nopriv_{$this->action}", array( $this, 'submit' ), 10, 0 );
			add_action( "admin_post_{$this->action}", array( $this, 'submit' ), 10, 0 );
		}

		/**
		 * register_ajax_actions
		 * 
		 * Registers the form to admin_ajax hook so we can listen to the response.
		 *
		 */
		public function register_ajax_actions() 
		{
			add_action( "wp_ajax_nopriv_{$this->action}", array( $this, 'submit' ), 10, 0 );
			add_action( "wp_ajax_{$this->action}", array( $this, 'submit' ), 10, 0 );
		}

		/**
		 * submit
		 * 
		 * Submit entry point. From here we look at the submitted values and 
		 * create logic based on the input.
		 */
		private function submit() 
		{

			// Check security.
			if ( ! isset( $_POST[ '_wp_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_wp_nonce' ], $this->nonce ) ) 
			{
				wp_die( __( 'Nonce is not set or invalid', THEME_TEXT_DOMAIN ) );
			}

			// Clean up fields.
			$fields = $this->sanitize_fields( $_POST );
			if ( $fields === false ) {

				$response = array(
					'status'	=> 'failed',
					'message'	=> __( 'Some fields are filled incorrectly. Please try again', THEME_TEXT_DOMAIN ),
					'entries'	=> $fields->get_entries(),
					'redirect'	=> false
				);

				// Return response.
				echo json_encode( $response );
				die();

			}

			// Get mail template and replace the fields.
			$mail_template = file_get_contents( get_template_directory_uri() . '/assets/mail/mail-template.html' );
			$mail_fields = array(
				'$name'		=> $fields->get( 'name' ),
				'$email'	=> $fields->get( 'email' ),
				'$phone'	=> $fields->get( 'phone' ),
				'$message'	=> $fields->get( 'message' )
			);

			// Get the admin email address.
			$mail_to = get_option( 'admin_email' );

			// Get the email address of the user.
			$mail_from = $fields->get( 'email' );

			// Set the subject of the mail.
			$mail_subject = 'Bericht uit contact formulier van kolksluis.solar';

			// Create mail body with the variables injected.
			$mail_body = strtr( $mail_template, $mail_fields );

			// Send email.
			$mail_sent = $this->send_email(
				$mail_to,
				$mail_from,
				$mail_subject,
				$mail_body
			);

			// Return a success response.
			$response = array(
				'status'    => 'success',
				'message'   => __( 'All fields are filled in correctly and email has been sent. Thank you for your request', THEME_TEXT_DOMAIN ),
				'entries'   => $fields->get_entries(),
				'redirect'	=> $fields->get( 'redirect' ),
			);

			// Return response.
			echo json_encode( $response );
			die();

		}

		/**
		 * sanitize_fields
		 * 
		 * Check if fields are valid and filter them from potentially malicious values.
		 * Stores the sanitized values into a Fields class instance.
		 * 
		 * @param   array $fields $_POST or $_GET array with values.
		 * @return  Fields
		 */
		private function sanitize_fields( $fields ) 
		{

			// Create new Form_Fields instance.
			$form_fields = new Form_Fields();

			// Loop over all the fields.
			foreach( $fields as $field => $value ) 
			{

				// Sanitize your fields here.
				if ( $field === 'name' )
				{
					if ( $value !== '' )
					{
						$sanitized_value = sanitize_text_field( $value );
						$form_fields->set( 'name', $sanitized_value );
					} 
					else
					{
						return false;
					}
				}

				else if ( $field === 'phone' )
				{
					$is_valid_phone_number = Form_Handler::validate_phone( $value );
					if ( $is_valid_phone_number ) 
					{
						$sanitized_value = sanitize_text_field( $value );
						$form_fields->set( 'phone', $sanitized_value );
					}
					else
					{
						return false;
					}
				}

				else if ( $field === 'email' ) 
				{
					$is_valid_email = Form_Handler::validate_email( $value );
					if ( $is_valid_email ) 
					{
						$sanitized_value = sanitize_email( $value );
						$form_fields->set( 'email', $sanitized_value );
					}
					else
					{
						return false;
					}
				}

				else if ( $field === 'message' )
				{
					$sanitized_value = sanitize_text_field( $value );
					$form_fields->set( 'message', $sanitized_value );
				}
				
				else if ( $field === '_wp_http_referer' ) 
				{
					$home_url = wp_parse_url( get_site_url() );
					$request_url = wp_parse_url( $value );
					if ($home_url[ 'host' ] === $request_url[ 'host' ] ) 
					{
						$form_fields->set( 'redirect', esc_url_raw( $value ) );
					}
				}

			}

			return $form_fields;

		}

		/**
		 * validate_email
		 * 
		 * Check if string is valid email.
		 * 
		 * @param	string $value Value to check.
		 * @return	bool
		 */
		public static function validate_email( $value ) 
		{
			if ( preg_match( '/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD', $value ) ) 
			{
				return true;
			}
			return false;
		}
		
		/**
		 * validate_phone
		 * 
		 * Check if string is valid phone number.
		 * 
		 * @param	string $value Value to check.
		 * @return	bool
		 */
		public static function validate_phone( $value ) 
		{
			if ( preg_match( '/^(\+|00|0)(31\s?)?(6[\s-]?[1-9][0-9]{7}|[1-9][0-9][\s-]?[1-9][0-9]{6}|[1-9][0-9]{2}[\s-]?[1-9][0-9]{5})$/', $value ) ) 
			{
				return true;
			}
			return false;
		}
		
		/**
		 * send_email
		 * 
		 * Send email from this form.
		 * 
		 * @param	string $to Email addressee.
		 * @param	string $from Email from.
		 * @param	string $subject Subject of email.
		 * @param	string $message Message of email.
		 * @return	bool If message has been succesfully sent
		 */
		public function send_email( $to, $from, $subject, $message ) 
		{

			// Set headers for mail to support HTML format.
			$email_headers = array(
				"From: {$from}",
				"Reply-To: {$from}",
				'MIME-Version: 1.0',
				'Content-type: text/html; charset=utf-8'
			);

			// Send email
			$email_sent = wp_mail( $to, $subject, $message, $email_headers );
			return $email_sent;

		}

	}

}