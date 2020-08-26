<?php
/**
 * theme.php
 */

$template_dir = get_template_directory();

/**
 * Include the nav walker
 */
require_once $template_dir . '/classes/class-nav-walker.php';

/**
 * Include the Form_Handler class.
 */
require_once $template_dir . '/classes/class-form-handler.php';

/**
 * Include the Theme_Cookies class.
 */
require_once $template_dir . '/classes/class-cookie.php';

/**
 * setup_form_handlers
 * 
 * Create a new handler for the forms in the theme.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/init/
 */
add_action( 'init', 'setup_form_handlers' ); 
function setup_form_handlers() {

	// Create contact form handler.
	$contact_form_handler = new Form_Handler( 'contact-form' );
	$contact_form_handler->register_post_actions();
	$contact_form_handler->register_ajax_actions();

}

/**
 * setup_cookie_handlers
 * 
 * Create a new handler for the cookies in the theme.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/init/
 */
add_action( 'init', 'setup_cookie_handlers' );
function setup_cookie_handlers() {

	// Create cookies handler.
	$cookies = new Theme_Cookies();
	$cookies->add_customizer_actions();
	$cookies->add_rest_endpoints();

}

/**
 * setup_theme_support
 * 
 * Register theme features
 * Setup support for theme features.
 * Comment the features that should not be supported.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Theme_Features
 * @link	https://developer.wordpress.org/reference/functions/add_theme_support/
 */
add_action( 'after_setup_theme', 'setup_theme_support' );
function setup_theme_support()  {

	// Create menus for theme.
	register_nav_menu( 'menu-main', __( 'Main Menu', THEME_TEXT_DOMAIN ) );
	register_nav_menu( 'menu-side', __( 'Side Menu', THEME_TEXT_DOMAIN ) );

	// Add theme support for title tag
	add_theme_support( 'title-tag' );

	// Add theme support for post formats
	// add_theme_support( 'post-formats', array( 'aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat' ) );

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );

	// Add theme support for HTML5 Semantic Markup
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

	// Add theme support for Custom Logo
	add_theme_support( 'custom-logo', array(
		'height'      => '',
		'width'       => '',
		'flex-height' => true,
		'flex-width'  => true,
		'header-text' => array( 'site-title', 'site-description' ),
	) );

	// Add theme support for Custom Header
	// add_theme_support( 'custom-header', array(
	// 	'default-image' => '',
	// 	'random-default' => false,
	// 	'width' => 0,
	// 	'height' => 0,
	// 	'flex-height' => false,
	// 	'flex-width' => false,
	// 	'default-text-color' => '',
	// 	'header-text' => true,
	// 	'uploads' => true,
	// 	'wp-head-callback' => '',
	// 	'admin-head-callback' => '',
	// 	'admin-preview-callback' => '',
	// 	'video' => false,
	// 	'video-active-callback' => 'is_front_page',
	// ) );

	// Add theme support for Custom Backgrounds
	// add_theme_support( 'custom-background', array(
	// 	'default-image' => '',
	// 	'default-preset' => 'default',
	// 	'default-position-x' => 'left',
	// 	'default-position-y' => 'top',
	// 	'default-size' => 'auto',
	// 	'default-repeat' => 'repeat',
	// 	'default-attachment' => 'scroll',
	// 	'default-color' => '',
	// 	'wp-head-callback' => '_custom_background_cb',
	// 	'admin-head-callback' => '',
	// 	'admin-preview-callback' => '',
	// ) );

	// Add theme support for selective refresh of widgets in customizer
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add image size for the slider image so that all images
	// have the same aspect ratio of 4:3.
	add_image_size( 'slider-4-3', 1280, 960, true );
	add_image_size( 'slider-16-9', 1280, 720, true );
	add_image_size( 'portrait', 588, 784, true );

}

/**
 * setup_gutenberg_theme_support
 * 
 * Register theme features
 * Setup support for theme features.
 * Uncomment the features that should not be supported.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Theme_Features
 * @link	https://developer.wordpress.org/reference/functions/add_theme_support/
 */
add_action( 'after_setup_theme', 'setup_gutenberg_theme_support' );
function setup_gutenberg_theme_support()  {

	// Gutenberg align wide
	add_theme_support( 'align-wide' );

	// Gutenberg custom colors
	add_theme_support( 'editor-color-palette', array(
		array(
			'name' => __( 'control blue', THEME_TEXT_DOMAIN ),
			'slug' => 'control-blue',
			'color' => '#384752',
		),
    ) );
    
    // Gutenberg font sizes
    add_theme_support( 'editor-font-sizes', array(

        array(
            'name' => __( 'Small', THEME_TEXT_DOMAIN ),
            'shortName' => __( 'S', THEME_TEXT_DOMAIN ),
            'size' => 12,
            'slug' => 'small'
        ),

        array(
            'name' => __( 'Medium', THEME_TEXT_DOMAIN ),
            'shortName' => __( 'M', THEME_TEXT_DOMAIN ),
            'size' => 16,
            'slug' => 'medium'
        ),

        array(
            'name' => __( 'Large', THEME_TEXT_DOMAIN ),
            'shortName' => __( 'L', THEME_TEXT_DOMAIN ),
            'size' => 20,
            'slug' => 'large'
        ),

    ) );

    // Gutenberg editor styles
	add_theme_support( 'editor-styles' );
    add_theme_support( 'dark-editor-style' );

    // Gutenberg use default block styles
    add_theme_support( 'wp-block-styles' );

    // Gutenberg use responsive embeds
    add_theme_support( 'responsive-embeds' );
    
}

/**
 * BEMify the classnames of the menu items.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/functions/add_filter/
 */
add_filter( 'nav_menu_item_bem', 'kss_change_classes_to_bem_notation', 10, 1 );
function kss_change_classes_to_bem_notation( $classes ) {
	$bem_classes = array_map( function( $class ) {
		return str_replace( 'menu-item', 'menu__item', $class );
	}, $classes );
	return $bem_classes;
}

/**
 * Add stagger animation to nav menu item.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/functions/add_filter/
 */
add_filter( 'nav_menu_item_stagger', 'kss_add_transition_to_nav_menu_item', 10, 5 );
function kss_add_transition_to_nav_menu_item( $walker, $depth, $id, $class_names, $indent ) {
	$delay = 150;
	$increment = 100;
	$output = '';
	if ( $depth === 0 ) {
		$stagger = ( $walker->stagger_index * $increment ) + $delay;
		$output .= $indent . '<li' . $id . $class_names .' style="transition-delay: ' . $stagger . 'ms;">';
		$walker->stagger_index++;
	} else {
		$output .= '<li' . $id . $class_names . '>';
	}
	return $output;
}

/**
 * kss_admin_style
 * 
 * Add custom CSS to the admin page
 * Enqueues style to admin
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/
 */
add_action( 'admin_enqueue_scripts', 'kss_admin_style' );
function kss_admin_style() {
	wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/assets/admin/admin.css' );
}

/**
 * admin_remove_menus
 * 
 * Remove menu items from the dashboard
 * Uncomment the items that have to be removed from the dashboard
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Function_Reference/remove_menu_page
 * @link	https://developer.wordpress.org/reference/hooks/admin_menu/
 */
add_action( 'admin_menu', 'kss_admin_remove_menus' );
function kss_admin_remove_menus(){
	// remove_menu_page( 'index.php' );                  //Dashboard
	// remove_menu_page( 'jetpack' );                    //Jetpack* 
	// remove_menu_page( 'edit.php' );                   //Posts
	// remove_menu_page( 'upload.php' );                 //Media
	// remove_menu_page( 'edit.php?post_type=page' );    //Pages
	// remove_menu_page( 'edit-comments.php' );          //Comments
	// remove_menu_page( 'themes.php' );                 //Appearance
	// remove_menu_page( 'plugins.php' );                //Plugins
	// remove_menu_page( 'users.php' );                  //Users
	// remove_menu_page( 'tools.php' );                  //Tools
	// remove_menu_page( 'options-general.php' );        //Settings
}

/**
 * Returns an array with image info like src, alt and sizes.
 * If no image is found false is returned.
 * 
 * @param	number $id 
 * @param	string $size
 * @return	boolean|array
 */
function kss_get_the_image( $image_id, $size = 'full' ) {
	$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
	$image_title = get_the_title( $image_id );
	$image_src = wp_get_attachment_image_src( $image_id , $size );
	return empty( $image_src ) ? false : array(
		'id'		=> $image_id,
		'title'		=> $image_title,
		'alt'		=> $image_alt,
		'src'		=> $image_src[ 0 ],
		'width'		=> $image_src[ 1 ],
		'height'	=> $image_src[ 2 ],
		'ratio'		=> $image_src[ 2 ] / $image_src[ 1 ] * 100
	);
}

/**
 * Outputs an image based on id and size.
 * 
 * @param	number $id 
 * @param	string $size
 */
function kss_the_image( $id, $lazy = false, $size = 'full' ) {
	$image = kss_get_the_image( $id, $size );
	if ( $image !== false ) {
		$output = '<img ';
		$output .= 'src="' . $image[ 'src' ] . '" ';
		$output .= 'alt="' . $image[ 'alt' ] . '" ';
		$output .= 'title="' . $image[ 'title' ] . '" ';
		$output .= 'width="' . $image[ 'width' ] . '" ';
		$output .= 'height="' . $image[ 'height' ] . '" ';
		$output .= $lazy === true ? 'loading="lazy"' : '';
		$output .= '/>';
		echo $output;
	}
}

/**
 * Outputs the thumbnail of the post.
 */
function kss_the_post_image( $size = 'full' ) {
	global $post;
	$image_id = get_post_thumbnail_id( $post );
	if ( $image_id !== '' ) {
		kss_the_image( $image_id, false, $size );
	}
}

/**
 * Outputs the thumbnail of the post.
 */
function kss_the_lazy_post_image( $size = 'full' ) {
	global $post;
	$image_id = get_post_thumbnail_id( $post );
	if ( $image_id !== '' ) {
		kss_the_image( $image_id, true, $size );
	}
}

/**
 * kss_get_the_latest_news
 * 
 * @return	array
 */
function kss_get_the_latest_news() {
	$args = array(
		'post_type'			=> array( 'post' ),
		'post_status'		=> array( 'publish' ),
		'posts_per_page'	=> 1,
		'orderby'			=> 'date',
		'order'				=> 'DESC'
	);
	$query = new WP_Query( $args );
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			return array( $query->post );
		}
		wp_reset_postdata();
	}
}

/**
 * kss_get_the_latest_news
 * 
 * @return	array
 */
function kss_get_the_news_by_month() {
	global $post;
	$dates = array();
	$args = array(
		'post_type'			=> array( 'post' ),
		'post_status'		=> array( 'publish' ),
		'posts_per_page'	=> 8,
		'offset'			=> 1,
		'orderby'			=> 'date',
		'order'				=> 'DESC'
	);
	$query = new WP_Query( $args );
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			
			$time = strtotime( $post->post_date );
			$year = date( 'Y', $time );
			$month = date( 'F', $time );
			$key_date = strtolower( "$month-$year" );

			if ( key_exists( $key_date, $dates ) ) {
				$dates[ $key_date ][ 'posts' ][] = $query->post;
			} else {
				$dates[ $key_date ] = array( 
					'time'		=> $time,
					'posts'		=> array( $query->post )
				);
			}

		} wp_reset_postdata();
	}
	return $dates;
}

/**
 * Gets the splash template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_splash( $name = null ) {
	get_template_part( './template-parts/loader/splash', $name );
}

/**
 * Gets the cookies template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_cookies( $name = null ) {
	get_template_part( './template-parts/cookies/cookies', $name );
}

/**
 * Gets the banner template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_banner( $name = null ) {
	get_template_part( './template-parts/banner/banner', $name );
}

/**
 * Gets the hero template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_hero( $name = null ) {
	get_template_part( './template-parts/hero/hero', $name );
}

/**
 * Gets the navigation template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_navigation( $name = null ) {
	get_template_part( './template-parts/navigation/navigation', $name );
}

/**
 * Gets the intro template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_intro( $name = null ) {
	get_template_part( './template-parts/intro/intro', $name );
}

/**
 * Gets the news template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_news( $name = null ) {
	get_template_part( './template-parts/news/news', $name );
}

/**
 * Gets the map template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_map( $name = null ) {
	get_template_part( './template-parts/map/map', $name );
}

/**
 * Gets the about template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_member( $name = null ) {
	get_template_part( './template-parts/members/member', $name );
}

/**
 * Gets the layout template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_layout( $name = null, $folder = '/' ) {
	get_template_part( './template-parts/layout' . $folder . 'layout', $name );
}

/**
 * Gets the footer template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_footer( $name = null ) {
	get_template_part( './template-parts/footer/footer', $name );
}

/**
 * Gets the backdrop template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_backdrop( $name = null ) {
	get_template_part( './template-parts/backdrop/backdrop', $name );
}

/**
 * Gets the form template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_form( $name = null ) {
	get_template_part( './template-parts/form/form', $name );
}

/**
 * Gets the panel template using get_template_part.
 * 
 * @param	string $name Specific template to get.
 */
function kss_get_panel( $name = null ) {
	get_template_part( './template-parts/panels/panel', $name );
}

function kss_get_url_of_children_by_page_id( $page_id ) {
	$urls = array();
	$args = array(
		'post_type'			=> array( 'page' ),
		'posts_per_page'	=> 1,
		'post_parent'		=> $page_id
	);
	$query = new WP_Query( $args );
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			array_push( $urls, get_the_permalink() );
		}
		wp_reset_postdata();
	} 
	return $urls;
}

/**
 * TODO: Create a cool debug function
 */
function debug( $var ) {

}