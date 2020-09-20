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
		 * Nonce for form handling.
		 */
		private $nonce = 'form_handler_nonce';

		/**
		 * Store the action.
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
			add_filter( 'wp_mail_content_type', array( $this, 'set_mail_content_type' ) );
		}

		/**
		 * register_post_actions
		 * 
		 * Registers the form to admin_post hook so we can listen to the response.
		 * 
		 */
		public function register_post_actions() 
		{
			add_action( "admin_post_nopriv_{$this->action}", array( $this, 'submit' ), 10, 1 );
			add_action( "admin_post_{$this->action}", array( $this, 'submit' ), 10, 1 );
		}

		/**
		 * register_ajax_actions
		 * 
		 * Registers the form to admin_ajax hook so we can listen to the response.
		 *
		 */
		public function register_ajax_actions() 
		{
			// add_action( 'rest_api_init', array( $this, 'register_submit_route', 10, 0 ) );
			add_action( "wp_ajax_nopriv_{$this->action}", array( $this, 'submit' ), 10, 0 );
			add_action( "wp_ajax_{$this->action}", array( $this, 'submit' ), 10, 0 );
		}

		/**
		 * set_mail_content_type
		 * 
		 * Set content type for mail messages.
		 */
		public function set_mail_content_type()
		{
			return "text/html";
		}

		private function register_submit_route()
		{
			// Register new route to get data from.
			register_rest_route( 'kss/v1', 
				'/contact/', 
				array(
					'methods'		=> array( 'POST' ),
					'callback'		=> 'validate_contact'
				) 
			);

			function validate_contact( $args ) {

			}

		}

		private function rest_submit()
		{

		}

		/**
		 * submit
		 * 
		 * Submit entry point. From here we look at the submitted values and 
		 * create logic based on the input.
		 */
		public function submit() 
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

			$recaptcha = $fields->get( 'recaptcha' );
			if ( ! $recaptcha ) {

				$this->return_response(
					'failed',
					__( 'Please make sure to check the recaptcha checkbox', THEME_TEXT_DOMAIN ),
					$fields->get_entries(),
					false
				);

				// Return response.
				echo json_encode( $response );
				die();

			}

			// Get the config with the secret.
			$config_url = get_rest_url( null, '/kss/v1/config' );
			$config = wp_remote_get( $config_url );
			$recaptcha_secret = $config[ 'RECAPTCHA_SECRET' ];

			// Verify the recaptcha with the secret.
			$recaptcha_verify_url = 'https://www.google.com/recaptcha/api/siteverify';
			$recaptcha_verify_url .= '?secret=' . urlencode( $recaptcha_secret );
			$recaptcha_verify_url .= '&response=' . urlencode( $recaptcha );

			$recaptcha_response = wp_remote_get( $recaptcha_verify_url );
			if ( is_wp_error( $recaptcha_response ) ) {

				$this->return_response(
					'failed',
					__( 'An error occured during reCAPTCHA validation', THEME_TEXT_DOMAIN ),
					$fields->get_entries(),
					false,
				);

				// Return response.
				echo json_encode( $response );
				die();

			}

			$recaptcha_data = json_decode( $recaptcha_response[ 'body' ] );

			if ( ! property_exists( $recaptcha_data, 'success' ) ) {

				$this->return_response(
					'failed',
					__( 'Something went wrong with the reCAPTCHA validation', THEME_TEXT_DOMAIN ),
					$fields->get_entries(),
					false,
				);

			}

			if ( $recaptcha_data->success === false ) {

				$this->return_response(
					'failed',
					__( 'You are not identified as a human. Try again or stop trying.', THEME_TEXT_DOMAIN ),
					$fields->get_entries(),
					false
				);

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

			if ( ! $mail_sent ) {
				
				$this->return_response(
					'failed',
					__( 'Mail failed to send', THEME_TEXT_DOMAIN ),
					$fields->get_entries(),
					$fields->get( 'redirect' ),
					$fields->get( 'referer' ),
					array(
						'mail_status'	=> $mail_sent
					)
				);
				
			}

			// Return a success response.
			$this->return_response(
				'success',
				__( 'All fields are filled in correctly and email has been sent. Thank you for your request', THEME_TEXT_DOMAIN ),
				$fields->get_entries(),
				$fields->get( 'redirect' ),
				$fields->get( 'referer' ),
				array(
					'mail_to'		=> $mail_to,
					'mail_from'		=> $mail_from,
					'mail_subject'	=> $mail_subject,
					'mail_body'		=> $mail_body
				)
			);

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

				else if ( $field === '_wp_http_redirect' ) 
				{
					$home_url = wp_parse_url( get_site_url() );
					$request_url = wp_parse_url( $value );
					if ($home_url[ 'host' ] === $request_url[ 'host' ] ) 
					{
						$form_fields->set( 'redirect', esc_url_raw( $value ) );
					}
				}
				
				else if ( $field === '_wp_http_referer' ) 
				{
					$home_url = wp_parse_url( get_site_url() );
					$request_url = wp_parse_url( $value );
					if ($home_url[ 'host' ] === $request_url[ 'host' ] ) 
					{
						$form_fields->set( 'referer', esc_url_raw( $value ) );
					}
				}

				else if ( $field === 'g-recaptcha-response' )
				{
					$form_fields->set( 'recaptcha', $value );
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
			$headers = array(
				"From: {$from}",
				"Reply-To: {$from}",
				'MIME-Version: 1.0',
				'Content-type: text/html; charset=utf-8'
			);

			// Send email
			$email_sent = wp_mail( $to, $subject, $message, $headers );
			return $email_sent;

		}

		private function return_response( $status, $message, $entries, $redirect, $referer, $other = array() )
		{

			// Return a success response.
			$response = array(
				'status'    => $status,
				'message'   => $message,
				'entries'   => $entries,
				'redirect'	=> $redirect,
				'referer'	=> $referer,
				'other'		=> $other
			);

			// Return response.
			echo json_encode( $response );
			die();

		}

	}

}