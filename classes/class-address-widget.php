<?php
/**
 * class-address-widget.php
 */

/**
 * Address_Widget
 * 
 * Outputs a list of address item wrapped in an <address> element.
 *
 * @since		1.0
 * @package		WP_Widget
 * @subpackage	Address_Widget
 * @link		https://developer.wordpress.org/reference/classes/wp_widget/
 * @link		https://codex.wordpress.org/Widgets_API
 */
class Address_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'address-widget',
			'description' 					=> __( 'Address widget', THEME_TEXT_DOMAIN ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'address_widget', __( 'Address', THEME_TEXT_DOMAIN ), $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
		$title 			= apply_filters( 'widget_title', $instance[ 'title' ] );
		$street 		= isset( $instance[ 'street' ] ) ? esc_attr( $instance[ 'street' ] ) : '';
		$postalcode 	= isset( $instance[ 'postalcode' ] ) ? esc_attr( $instance[ 'postalcode' ] ) : '';
		$country 		= isset( $instance[ 'country' ] ) ? esc_attr( $instance[ 'country' ] ) : '';
		$phone 			= isset( $instance[ 'phone' ] ) ? esc_attr( $instance[ 'phone' ] ) : '';
		$email 			= isset( $instance[ 'email' ] ) ? esc_attr( $instance[ 'email' ] ) : '';
		
		echo $args['before_widget'];
		
			if ( !empty( $instance[ 'title' ] ) ) {
				echo $args[ 'before_title' ] . $title . $args[ 'after_title' ];
			}
		
			echo '<address class="address">';
				echo '<ul class="address__list">';
					
					if( $street ) { echo '<li class="address__item">' . $street . '</li>'; }
					if( $postalcode ) { echo '<li class="address__item">' . $postalcode . '</li>'; }
					if( $country ) { echo '<li class="address__item">' . $country . '</li>'; }
					if( $phone ) { echo '<li class="address__item"><a class="address__link" href="tel:' . $phone . '" title="' . __( 'Phone number', THEME_TEXT_DOMAIN ) . '">' . $phone . '</a></li>'; }
					if( $email ) { echo '<li class="address__item"><a class="address__link" href="mailto:' . $email . '" title="' . __( 'Email address', THEME_TEXT_DOMAIN ) . '">' . $email . '</a></li>'; }
	
				echo '</ul>';
			echo '</address>';

		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 			= ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$street 		= ! empty( $instance[ 'street' ] ) ? $instance[ 'street' ] : '';
		$postalcode 	= ! empty( $instance[ 'postalcode' ] ) ? $instance[ 'postalcode' ] : '';
		$country 		= ! empty( $instance[ 'country' ] ) ? $instance[ 'country' ] : '';
		$phone 			= ! empty( $instance[ 'phone' ] ) ? $instance[ 'phone' ] : '';
		$email 			= ! empty( $instance[ 'email' ] ) ? $instance[ 'email' ] : ''; ?>
		
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'street' ); ?>"><?php _e( 'Street', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'street' ); ?>" name="<?php echo $this->get_field_name( 'street' ); ?>" value="<?php echo esc_attr( $street ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'postalcode' ); ?>"><?php _e( 'Postal Code', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'postalcode' ); ?>" name="<?php echo $this->get_field_name( 'postalcode' ); ?>" value="<?php echo esc_attr( $postalcode ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'country' ); ?>"><?php _e( 'Country', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'country' ); ?>" name="<?php echo $this->get_field_name( 'country' ); ?>" value="<?php echo esc_attr( $country ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'phone' ); ?>"><?php _e( 'Phone', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'phone' ); ?>" name="<?php echo $this->get_field_name( 'phone' ); ?>" value="<?php echo esc_attr( $phone ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'email' ); ?>"><?php _e( 'Email', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'email' ); ?>" name="<?php echo $this->get_field_name( 'email' ); ?>" value="<?php echo esc_attr( $email ); ?>" />
		</p>
		
		<?php
			
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance = $old_instance;
		$instance[ 'title' ] 		= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'street' ] 		= strip_tags( $new_instance[ 'street' ] );
		$instance[ 'postalcode' ] 	= strip_tags( $new_instance[ 'postalcode' ] );
		$instance[ 'country' ] 		= strip_tags( $new_instance[ 'country' ] );
		$instance[ 'phone' ] 		= strip_tags( $new_instance[ 'phone' ] );
		$instance[ 'email' ] 		= strip_tags( $new_instance[ 'email' ] );
		return $instance;
	}
}