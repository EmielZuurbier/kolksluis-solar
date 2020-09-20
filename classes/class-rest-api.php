<?php
/**
 * class-rest-api.php
 */

if ( ! class_exists( 'Theme_Rest_Api' ) ) {

    class Theme_Rest_Api {

        public function __constructor( $enabled = true ) {
            
            // Disable the REST API access.
            if ( $enabled === false ) {
                add_filter( 'rest_authentication_errors', array( $this, 'restrict_rest_response' ) );   
            }

        }

        /**
         * restrict_rest_response
         * 
         * Makes sure that only logged in users can get a response.
         * 
         * @since   1.0
         * @param   string $result
         * @link	https://developer.wordpress.org/reference/hooks/rest_authentication_errors/
         */
        public function restrict_rest_response( $result ) {
            if ( ! empty( $result ) ) {
                return $result;
            }
            if ( ! is_user_logged_in() ) {
                return new WP_Error( 'rest_not_logged_in', 'You are not currently logged in.', array( 'status' => 401 ) );
            }
            return $result;
        }

        public function register_config_endpoint() {


            // Register new route to get data from
            register_rest_route( 'kss/v1', 
                '/config/', 
                array(
                    'methods'		=> array( 'GET' ),
                    'callback'		=> 'get_config'
                ) 
            );

            /**
             * get_config
             * 
             * Returns the config with tokens in JSON.
             * 
             * @param	WP_REST_Request $request
             * @return	JSON
             */
            function get_config( WP_REST_Request $request ) {
                $template_url = get_template_directory_uri();
                $data = file_get_contents( $template_url . '/config/config.json' );
                $response = new WP_REST_Response( json_decode( $data ) );
                return $response;
            }

        }

        /**
         * add_post_thumbnails_to_posts
         * 
         * @since   1.0
         */
        public function add_post_thumbnails_to_posts() {

            // Get all post types.
            $post_types = get_post_types();

            // Add featured_media_urls field to post types
            register_rest_field( 
                $post_types, 
                'featured_media_urls', 
                array(
                    'get_callback'		=> array( $this, 'get_featured_media_urls_callback' ),	// How to get the data?
                    'update_callback'	=> null,								// How to update the data?
                    'schema'			=> null									// How is the data presented?
                ) 
            );

        }

        /**
         * add_post_taxonomies_and_terms
         * 
         * @since   1.0
         */
        public function add_post_taxonomies_and_terms_to_posts() {

            // Get all post types.
            $post_types = get_post_types();
        
            // Add terms field to post types
            register_rest_field( 
                $post_types,
                'terms',
                array(
                    'get_callback'		=> array( $this, 'get_featured_media_urls_callback' ),
                    'update_callback'	=> null,
                    'schema'			=> null
                ) 
            );
        
        }

        /**
         * get_featured_media_urls_callback
         * 
         * Gets the URLs of the post thumbnail in different
         * sizes. Sizes can be adjusted.
         * 
         * @since	1.0
         * @param	WP_Post $object
         * @param	string $field_name
         * @param	WP_REST_Request $request
         * @return	array
         */
        private function get_featured_media_urls_callback( $object, $field_name, $request ) {
       
            // Create array to store URLs in
            $urls = array();
        
            // Get ID of post
            $id = $object[ 'id' ];
        
            // If has post thumbnail add the image sizes
            if ( has_post_thumbnail( $id ) ) {
        
                // Sizes to include
                $sizes = get_image_sizes();
                foreach ( $sizes as $size => $value ) {
                    array_push( $urls, get_the_post_thumbnail_url( $id, $size ) );
                }
        
            }
        
            // Return the URLs list
            return $urls;
        }

        /**
         * get_terms_of_post_callback
         * 
         * Returns a nested list of categories
         * with the terms of the post
         * 
         * @since	1.0
         * @param	WP_Post $object
         * @param	string $field_name
         * @param	WP_REST_Request $request
         * @return	array
         */
        private function get_terms_of_post_callback( $object, $field_name, $request ) {

            // Create array for taxonomies
            $taxonomies = array();

            // Get all taxonomies connected to the post
            $taxonomy_names = get_post_taxonomies( $object );
            if ( ! empty( $taxonomy_names ) && ! is_wp_error( $taxonomy_names ) ) {

                // Loop over the taxonomy names and create an array per name
                foreach ( $taxonomy_names as $tax_name ) {
                    $taxonomies[ $tax_name ] = array();

                    // Add the terms of the taxonomy to the array
                    $terms = get_the_terms( $object, $tax_name );
                    if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
                        foreach ( $terms as $term ) {

                            // Add the terms to the taxonomy
                            array_push( $taxonomies[ $tax_name ], 
                                array(
                                    'name'		=> $term->name,
                                    'slug'		=> $term->slug,
                                    'term_id'	=> $term->term_id
                                ) 
                            );

                        }
                    }

                }

            }

            // Return the taxonomies list
            return $taxonomies;

        }


    }

}