<?php
/**
 * customizer.php
 */


/**
 * Include the TinyMCE field.
 */
require_once get_template_directory() . '/classes/class-tinymce-customizer.php';

/**
 * register_customizer_alert
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'register_customizer_alert' );
function register_customizer_alert( WP_Customize_Manager $wp_customize ) {

	// Alert active setting.
	$wp_customize->add_setting(
		'alert_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// Alert message setting.
	$wp_customize->add_setting(
		'alert_message',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// Alert panel.
	$wp_customize->add_panel(
		'alert_panel',
		array(
			'priority'       => 5,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => __( 'Alert', THEME_TEXT_DOMAIN ),
			'description'    => __( 'Top of the page alert message', THEME_TEXT_DOMAIN ),
		)
	);

	// Alert general section.
	$wp_customize->add_section(
		'alert_settings',
		array(
			'title'				=> __( 'Alert settings', THEME_TEXT_DOMAIN ),
			'priority'			=> 10,
			'panel'				=> 'alert_panel'
		)
	);

	// Alert active checkbox control.
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'alert_active',
		array(
			'label'      		=> __( 'Alert active?', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'Show or hide the alert message.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'alert_settings',
			'settings'   		=> 'alert_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );

	// Alert message textarea control
	$wp_customize->add_control( new WP_TinyMCE_Customize_Control(
		$wp_customize,
		'alert_message',
		array(
			'label'      		=> __( 'Message', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The content of the alert message.', THEME_TEXT_DOMAIN ),
			'section'    		=> 'alert_settings',
			'settings'   		=> 'alert_message',
			'type'				=> 'textarea',
	        'priority'   		=> 20
		)
	) );

}

/**
 * register_customizer_logo
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'register_customizer_logo' );
function register_customizer_logo( WP_Customize_Manager $wp_customize ) {

	// Cookie active setting
	$wp_customize->add_setting(
		'light_logo',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

	// Cookie active setting
	$wp_customize->add_setting(
		'dark_logo',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

	// Logo panel.
	$wp_customize->add_panel(
		'logo_panel',
		array(
			'priority'       => 5,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => __( "Logo's", THEME_TEXT_DOMAIN ),
			'description'    => __( 'Logo settings panel', THEME_TEXT_DOMAIN ),
		)
	);

	// Light logo section.
	$wp_customize->add_section(
		'light_logo_section',
		array(
			'title'				=> __( 'Light logo', THEME_TEXT_DOMAIN ),
			'priority'			=> 10,
			'panel'				=> 'logo_panel'
		)
	);

	// Dark logo section.
	$wp_customize->add_section(
		'dark_logo_section',
		array(
			'title'				=> __( 'Dark logo', THEME_TEXT_DOMAIN ),
			'priority'			=> 15,
			'panel'				=> 'logo_panel'
		)
	);

	// Cookie thumbnail image input control
	$wp_customize->add_control( new WP_Customize_Media_Control(
		$wp_customize,
		'light_logo',
		array(
			'label'				=> __( 'Select light logo', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The light version of the logo.', THEME_TEXT_DOMAIN ),
			'section'			=> 'light_logo_section',
			'settings'			=> 'light_logo',
			'priority'			=> 5,
			'mime_type' 		=> 'image',
		)
	) );

	// Cookie thumbnail image input control
	$wp_customize->add_control( new WP_Customize_Media_Control(
		$wp_customize,
		'dark_logo',
		array(
			'label'				=> __( 'Select dark logo', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The dark version of the logo.', THEME_TEXT_DOMAIN ),
			'section'			=> 'dark_logo_section',
			'settings'			=> 'dark_logo',
			'priority'			=> 5,
			'mime_type' 		=> 'image',
		)
	) );

}

/**
 * register_customizer_404
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'register_customizer_404' );
function register_customizer_404( WP_Customize_Manager $wp_customize ) {

	// 404 thumbnail setting.
	$wp_customize->add_setting(
		'404_thumbnail',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// 404 title setting.
	$wp_customize->add_setting(
		'404_title',
		array(
			'transport'		=> 'refresh',
			'capability'	=> 'edit_theme_options',
			'type'			=> 'theme_mod'
		)
    );
    
    // 404 subtitle setting.
	$wp_customize->add_setting(
		'404_subtitle',
		array(
			'transport'		=> 'refresh',
			'capability'	=> 'edit_theme_options',
			'type'			=> 'theme_mod'
		)
	);

	// 404 body setting.
	$wp_customize->add_setting(
		'404_body',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

	$wp_customize->add_panel(
		'404_panel',
		array(
			'title'				=> __( '404', THEME_TEXT_DOMAIN ),
			'priority'			=> 10,
			'capability'     	=> 'edit_theme_options',
			'theme_supports' 	=> '',
			'title'          	=> __( '404 Settings', THEME_TEXT_DOMAIN ),
			'description'    	=> __( '404 Page not found title and contents', THEME_TEXT_DOMAIN ),
		)
		);

	// 404 general section
	$wp_customize->add_section(
		'404_section',
		array(
			'title'				=> __( '404', THEME_TEXT_DOMAIN ),
			'priority'			=> 10,
			'panel'				=> '404_panel'
		)
	);

	// 404 thumbnail image input control
	$wp_customize->add_control( new WP_Customize_Media_Control(
		$wp_customize,
		'404_thumbnail',
		array(
			'label'				=> __( 'Thumbnail', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The thumbnail image of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'			=> '404_section',
            'settings'			=> '404_thumbnail',
            'mime_type'         => 'image',
			'priority'			=> 25
		)
    ) );

	// 404 title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'404_title',
		array(
			'label'      		=> __( 'Title', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The title of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'    		=> '404_section',
			'settings'   		=> '404_title',
			'type'				=> 'text',
	        'priority'   		=> 35
		)
    ) );
    
    // 404 subtitle text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'404_subtitle',
		array(
			'label'      		=> __( 'Subtitle', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The subtitle of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'    		=> '404_section',
			'settings'   		=> '404_subtitle',
			'type'				=> 'text',
	        'priority'   		=> 30
		)
	) );

	// 404 body textarea control
	$wp_customize->add_control( new WP_TinyMCE_Customize_Control(
		$wp_customize,
		'404_body',
		array(
			'label'      		=> __( 'Body', THEME_TEXT_DOMAIN ),
			'description'		=> __( 'The main content of the 404 page.', THEME_TEXT_DOMAIN ),
			'section'    		=> '404_section',
			'settings'   		=> '404_body',
			'type'				=> 'textarea',
	        'priority'   		=> 40
		)
	) );

}