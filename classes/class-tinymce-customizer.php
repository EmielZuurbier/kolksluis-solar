<?php
/**
 * class-tinymce-customizer.php
 */

if ( ! class_exists( 'WP_TinyMCE_Customize_Control' ) && class_exists( 'WP_Customize_Control' ) ) {

    /**
     * WP_TinyMCE_Customize_Control
     * 
     * Adds a custom TinyMCE editor to the customizer.
     * 
     * @package     WP_Customize_Control
     * @subpackage  Text_Editor_Custom_Control
     * @link        https://codex.wordpress.org/Theme_Customization_API
     */
    class WP_TinyMCE_Customize_Control extends WP_Customize_Control {

        public $type = 'textarea';

        /**
         * Render the content on the theme customizer page
         */
        public function render_content() { ?>
            <label>
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>

                <?php
                $settings = array(
                    'media_buttons' => false,
                    'quicktags' => false
                );
                $this->filter_editor_setting_link();
                wp_editor( $this->value(), $this->id, $settings ); ?>

            </label>
        <?php
            do_action('admin_footer');
            do_action('admin_print_footer_scripts');
        }

        private function filter_editor_setting_link() {
            add_filter( 'the_editor', function( $output ) { return preg_replace( '/<textarea/', '<textarea ' . $this->get_link(), $output, 1 ); } );
        }

    }

    /**
     * Add scripts for the TinyMCE editor in the tiny-customizer.
     */
    add_action( 'customize_controls_enqueue_scripts', 'ctrl_editor_customizer_script' );
    function ctrl_editor_customizer_script() {
        wp_enqueue_script( 'wp-editor-customizer', get_template_directory_uri() . '/assets/admin/tinymce.js', array( 'jquery' ), rand(), true );
    }

}