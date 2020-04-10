<?php
/**
 * post-types.php 
 */

/**
 * Register custom post type
 * Uncomment to create the post type
 * 
 * @since	1.0
 */
add_action( 'init', 'custom_post_type', 0 );
function custom_post_type() {

	$labels = array(
		'name'                  => _x( 'Members', 'Post Type General Name', 'kolksluis_solar' ),
		'singular_name'         => _x( 'Member', 'Post Type Singular Name', 'kolksluis_solar' ),
		'menu_name'             => __( 'Members', 'kolksluis_solar' ),
		'name_admin_bar'        => __( 'Member', 'kolksluis_solar' ),
		'archives'              => __( 'Member Archives', 'kolksluis_solar' ),
		'attributes'            => __( 'Member Attributes', 'kolksluis_solar' ),
		'parent_item_colon'     => __( 'Parent Member:', 'kolksluis_solar' ),
		'all_items'             => __( 'All Members', 'kolksluis_solar' ),
		'add_new_item'          => __( 'Add New Member', 'kolksluis_solar' ),
		'add_new'               => __( 'Add New', 'kolksluis_solar' ),
		'new_item'              => __( 'New Member', 'kolksluis_solar' ),
		'edit_item'             => __( 'Edit Member', 'kolksluis_solar' ),
		'update_item'           => __( 'Update Member', 'kolksluis_solar' ),
		'view_item'             => __( 'View Member', 'kolksluis_solar' ),
		'view_items'            => __( 'View Members', 'kolksluis_solar' ),
		'search_items'          => __( 'Search Member', 'kolksluis_solar' ),
		'not_found'             => __( 'Not found', 'kolksluis_solar' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'kolksluis_solar' ),
		'featured_image'        => __( 'Member Image', 'kolksluis_solar' ),
		'set_featured_image'    => __( 'Set member image', 'kolksluis_solar' ),
		'remove_featured_image' => __( 'Remove member image', 'kolksluis_solar' ),
		'use_featured_image'    => __( 'Use as member image', 'kolksluis_solar' ),
		'insert_into_item'      => __( 'Insert into member', 'kolksluis_solar' ),
		'uploaded_to_this_item' => __( 'Uploaded to this member', 'kolksluis_solar' ),
		'items_list'            => __( 'Members list', 'kolksluis_solar' ),
		'items_list_navigation' => __( 'Members list navigation', 'kolksluis_solar' ),
		'filter_items_list'     => __( 'Filter members list', 'kolksluis_solar' ),
	);

	$args = array(
		'label'                 => __( 'Member', 'kolksluis_solar' ),
		'description'           => __( 'A member of the project', 'kolksluis_solar' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
		'taxonomies'            => array( ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'				=> 'dashicons-groups',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'show_in_rest'			=> false,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);

	register_post_type( 'member', $args );

}

/**
 * Register {name} post type
 * 
 * @since	1.0
 */
// add_action( 'init', 'register_custom_post_type', 0 );
// function register_custom_post_type() {
//
// 	$labels = array(
// 		'name'                  => _x( 'Post Types', 'Post Type General Name', THEME_TEXT_DOMAIN ),
// 		'singular_name'         => _x( 'Post Type', 'Post Type Singular Name', THEME_TEXT_DOMAIN ),
// 		'menu_name'             => __( 'Post Types', THEME_TEXT_DOMAIN ),
// 		'name_admin_bar'        => __( 'Post Type', THEME_TEXT_DOMAIN ),
// 		'archives'              => __( 'Item Archives', THEME_TEXT_DOMAIN ),
// 		'attributes'            => __( 'Item Attributes', THEME_TEXT_DOMAIN ),
// 		'parent_item_colon'     => __( 'Parent Item:', THEME_TEXT_DOMAIN ),
// 		'all_items'             => __( 'All Items', THEME_TEXT_DOMAIN ),
// 		'add_new_item'          => __( 'Add New Item', THEME_TEXT_DOMAIN ),
// 		'add_new'               => __( 'Add New', THEME_TEXT_DOMAIN ),
// 		'new_item'              => __( 'New Item', THEME_TEXT_DOMAIN ),
// 		'edit_item'             => __( 'Edit Item', THEME_TEXT_DOMAIN ),
// 		'update_item'           => __( 'Update Item', THEME_TEXT_DOMAIN ),
// 		'view_item'             => __( 'View Item', THEME_TEXT_DOMAIN ),
// 		'view_items'            => __( 'View Items', THEME_TEXT_DOMAIN ),
// 		'search_items'          => __( 'Search Item', THEME_TEXT_DOMAIN ),
// 		'not_found'             => __( 'Not found', THEME_TEXT_DOMAIN ),
// 		'not_found_in_trash'    => __( 'Not found in Trash', THEME_TEXT_DOMAIN ),
// 		'featured_image'        => __( 'Featured Image', THEME_TEXT_DOMAIN ),
// 		'set_featured_image'    => __( 'Set featured image', THEME_TEXT_DOMAIN ),
// 		'remove_featured_image' => __( 'Remove featured image', THEME_TEXT_DOMAIN ),
// 		'use_featured_image'    => __( 'Use as featured image', THEME_TEXT_DOMAIN ),
// 		'insert_into_item'      => __( 'Insert into item', THEME_TEXT_DOMAIN ),
// 		'uploaded_to_this_item' => __( 'Uploaded to this item', THEME_TEXT_DOMAIN ),
// 		'items_list'            => __( 'Items list', THEME_TEXT_DOMAIN ),
// 		'items_list_navigation' => __( 'Items list navigation', THEME_TEXT_DOMAIN ),
// 		'filter_items_list'     => __( 'Filter items list', THEME_TEXT_DOMAIN ),
// 	);
//
// 	$args = array(
// 		'label'                 => __( 'Post Type', THEME_TEXT_DOMAIN ),
// 		'description'           => __( 'Post Type Description', THEME_TEXT_DOMAIN ),
// 		'labels'                => $labels,
// 		'supports'              => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
// 		'taxonomies'            => array( ),
// 		'hierarchical'          => false,
// 		'public'                => true,
// 		'show_ui'               => true,
// 		'show_in_menu'          => true,
// 		'menu_position'         => 5,
//		'menu_icon'				=> '',
// 		'show_in_admin_bar'     => true,
// 		'show_in_nav_menus'     => true,
//		'show_in_rest'			=> false,
// 		'can_export'            => true,
// 		'has_archive'           => true,
// 		'exclude_from_search'   => false,
// 		'publicly_queryable'    => true,
// 		'capability_type'       => 'page',
// 	);
//
// 	register_post_type( 'post_type', $args );
//
// }