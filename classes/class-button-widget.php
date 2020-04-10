<?php
/**
 * class-button-widget.php
 */

/**
 * Button_Widget
 * 
 * Custom button widget class.
 * Has a title, link and type of button fields.
 *
 * @since		1.0
 * @package		WP_Widget
 * @subpackage	Button_Widget
 * @link		https://developer.wordpress.org/reference/classes/wp_widget/
 * @link		https://codex.wordpress.org/Widgets_API
 */
class Button_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'button-widget',
			'description' 					=> __( 'Button with customizable title and type', THEME_TEXT_DOMAIN ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'button_widget', __( 'Button', THEME_TEXT_DOMAIN ), $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
		$title 	    = apply_filters( 'widget_title', $instance[ 'title' ] );
		$link 	    = isset( $instance[ 'link' ] ) ? esc_attr( $instance[ 'link' ] ) : '';
        $type 	    = isset( $instance[ 'type' ] ) ? esc_attr( $instance[ 'type' ] ) : '';
		$show_icon 	= isset( $instance[ 'show_icon' ] ) ? $instance[ 'show_icon' ] === 'on' ? true : false : false;
		$scroll 	= strpos( '#', $link ) > -1 ? ' js-scroll' : '';

		echo $args['before_widget'];
			echo '<a class="button ' . $type . '' . $scroll . '" href="' . $link . '" role="button" title="'. $title . '">' . $title . '</a>';
		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 	    = ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$link 	    = ! empty( $instance[ 'link' ] ) ? $instance[ 'link' ] : ''; 
        $type 	    = ! empty ( $instance[ 'type' ] ) ? $instance[ 'type' ] : ''; 
        $show_icon 	= ! empty( $instance[ 'show_icon' ] ) ? 'on' : '';?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'link' ); ?>"><?php _e( 'Link', THEME_TEXT_DOMAIN ); ?>:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" value="<?php echo esc_attr( $link ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Button type', THEME_TEXT_DOMAIN ); ?>:</label>
			<select class="widefat" id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>">
				<option value="button--standard" <?php if ($type === 'button--standard') echo 'selected'; ?>><?php _e( 'Default', THEME_TEXT_DOMAIN ); ?></option>
				<option value="button--alternate" <?php if ($type === 'button--alternate') echo 'selected'; ?>><?php _e( 'Alternate', THEME_TEXT_DOMAIN ); ?></option>
				<option value="button--ghost" <?php if ($type === 'button--ghost') echo 'selected'; ?>><?php _e( 'Ghost', THEME_TEXT_DOMAIN ); ?></option>
			</select>
        </p>
        <p>
			<label for="<?php echo $this->get_field_id( 'show_icon' ); ?>"><?php _e( 'Show icon in button', THEME_TEXT_DOMAIN ); ?></label>
			<input type="checkbox" class="checkbox" id="<?php echo $this->get_field_id( 'show_icon' ); ?>" name="<?php echo $this->get_field_name( 'show_icon' ); ?>" <?php checked( esc_attr( $show_icon ), 'on' ); ?> />
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
		$instance[ 'title' ] 	= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'link' ] 	= strip_tags( $new_instance[ 'link' ] );
		$instance[ 'type' ] 	= strip_tags( $new_instance[ 'type' ] );
		return $instance;
	}
}