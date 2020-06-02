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
	 * FormHandler
	 * 
	 * Submit and AJAX handler of the print form.
	 * 
	 * @since	1.0
	 * @author	control
	 * @package FormHandler
	 */
	class Form_Handler {

		/**
		 * @private
		 */
		private $nonce = 'form_handler_nonce';

		/**
		 * __construct
		 * 
		 * Create a new instance with two parameters.
		 * 
		 * @param	string $post_action Name of post action.
		 * @param	string $ajax_action Name of ajax action.
		 */
		public function __construct( $post_action, $ajax_action )
		{
			$this->register_post_actions( $post_action, 'submit' );
			$this->register_ajax_actions( $ajax_action, 'submit' );
		}

		/**
		 * register_post_actions
		 * 
		 * Registers the form to admin_post hook so we can listen to the response.
		 * 
		 * @param	string $action Name of the form action.
		 * @param	string $method Name of response method.
		 */
		private function register_post_actions( $action, $method ) 
		{
			add_action( "admin_post_nopriv_{$action}", array( $this, $method ), 10, 0 );
			add_action( "admin_post_{$action}", array( $this, $method ), 10, 0 );
		}

		/**
		 * register_ajax_actions
		 * 
		 * Registers the form to admin_ajax hook so we can listen to the response.
		 * 
		 * @param	string $action Name of the form action.
		 * @param	string $method Name of response method.
		 */
		private function register_ajax_actions( $action, $method ) 
		{
			add_action( "wp_ajax_nopriv_{$action}", array( $this, $method ), 10, 0 );
			add_action( "wp_ajax_{$action}", array( $this, $method ), 10, 0 );
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

			$home_url = wp_parse_url( get_site_url() );
			$request_url = wp_parse_url(wp_get_referer() );

			// Return a success response.
			$response = array(
				'status'    => 'success',
				'message'   => __( 'All fields are filled in correctly. Thank you for your request', THEME_TEXT_DOMAIN ),
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
		public function sanitize_fields( $fields ) 
		{

			// Create new Form_Fields instance.
			$form_fields = new Form_Fields();

			// Loop over all the fields.
			foreach( $fields as $field => $value ) 
			{

				// Sanitize your fields here.
				if ( $field === 'name' )
				{
					$sanitized_value = sanitize_text_field( $value );
					$form_fields->set( 'name', $sanitized_value );
				}

				else if ( $field === 'phone' )
				{
					$is_valid_phone_number = $this->validate_phone( $value );
					if ( $is_valid_phone_number ) 
					{
						$sanitized_value = sanitize_text_field( $value );
						$form_fields->set( 'phone', $sanitized_value );
					}
				}

				else if ( $field === 'email' ) 
				{
					$is_valid_email = $this->validate_email( $value );
					if ( $is_valid_email ) 
					{
						$sanitized_value = sanitize_email( $value );
						$form_fields->set( 'email', $sanitized_value );
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