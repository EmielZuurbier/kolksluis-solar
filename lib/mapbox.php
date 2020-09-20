<?php
/**
 * mapbox.php 
 */

/**
 * register_mapbox_geo_json
 * 
 * Register route to get the mapbox access token.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/rest_api_init-3/
 * @link	https://developer.wordpress.org/reference/functions/register_rest_route/
 */
add_action( 'rest_api_init', 'register_mapbox_geo_json' );
function register_mapbox_geo_json() {

	// Register new route to get data from
	register_rest_route( 'kss/v1', 
		'/geojson/', 
		array(
			'methods'		=> array( 'GET' ),
			'callback'		=> 'get_geo_json'
		) 
	);

}

/**
 * get_geo_json
 * 
 * Returns the Mapbox get json.
 * 
 * @param	WP_REST_Request $request
 * @return	JSON
 */
function get_geo_json( WP_REST_Request $request ) {
	$template_url = get_template_directory_uri();
	$data = file_get_contents( $template_url . '/assets/media/map/kolksluis-features.json' );
	$response = new WP_REST_Response( json_decode( $data ) );
	return $response;
}