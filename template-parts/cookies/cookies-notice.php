<?php
/**
 * Theme:
 * Template:			cookies-notice.php
 * Description:			Cookies notice to give user controls over cookies
 */

// Get URL of current page
global $wp;

// Cookie active?
$cookie_active 			    = get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name                = get_theme_mod( 'cookie_name' );

// Title and body content
$cookie_title				= get_theme_mod( 'cookie_title' );
$cookie_body				= get_theme_mod( 'cookie_body' );
$cookie_accept_label		= get_theme_mod( 'cookie_accept_label' );

// Refuse button
$cookie_refuse_active       = get_theme_mod( 'cookie_refuse_active' );
$cookie_refuse_label		= get_theme_mod( 'cookie_refuse_label' );

// Read more button
$cookie_read_more_active    = get_theme_mod( 'cookie_read_more_active' );
$cookie_read_more_label	    = get_theme_mod( 'cookie_read_more_label' );
$cookie_read_more_page      = get_theme_mod( 'cookie_read_more_page' );

// Output cookie banner if cookie is set to active
if ( $cookie_active ) { ?>

    <kss-cookie class="cookie" role="dialog" name="<?php echo $cookie_name; ?>">
        <div class="panel panel--light">
            <div class="panel__content">
                <div class="panel__body">
                    <form id="cookie-form" class="cookie__container" method="POST" action="<?php echo admin_url( 'admin-post.php' ); ?>">

                        <div class="cookie__body">
                            <?php if ( $cookie_title ) { ?>
                                <h4><?php echo $cookie_title; ?></h4>
                            <?php } ?>
    
                            <?php if ( $cookie_body ) { ?>
                                <p><?php echo $cookie_body; ?></p>
                            <?php } ?>

                            <div class="cookie__buttons">
                                <button type="submit" name="accept" class="button button--dark cookie__button--accept">
                                    <span class="button__label"><?php if ( $cookie_accept_label ) { echo $cookie_accept_label; } else { _e( 'Accept', 'kolksluis_solar' ); } ?></span>
                                    <div class="button__icon">
                                        <i class="fas fa-check-double"></i>
                                    </div>
                                </button>
                                
                                <?php if ( $cookie_refuse_active ) { ?>
                                    <button type="submit" name="refuse" class="button cookie__button--refuse">
                                        <span class="button__label"><?php if ( $cookie_refuse_label ) { echo $cookie_refuse_label; } else { _e( 'Refuse', 'kolksluis_solar' ); } ?></span>
                                        <div class="button__icon">
                                            <i class="fas fa-check"></i>
                                        </div>
                                    </button>
                                <?php } ?>
    
                                <?php if ( $cookie_read_more_active ) { ?>
                                    <p class="link"><a href="<?php if ( $cookie_read_more_page ) { the_permalink( $cookie_read_more_page ); } else { echo '#'; } ?>" class="cookie__button--link" target="_self"><?php if ( $cookie_read_more_label ) { echo $cookie_read_more_label; } else { _e( 'Cookie policy', 'kolksluis_solar' ); } ?></a><p>
                                <?php } ?>
                            </div>
                        </div>
                        
                        <input type="hidden" name="action" value="set_cookie">
                        <input type="hidden" name="cookie_name" value="<?php echo $cookie_name; ?>">
                        <input type="hidden" name="_wp_nonce" value="<?php echo wp_create_nonce( 'cookie' ); ?>">
                        <input type="hidden" name="_wp_referrer" value="<?php echo home_url( $wp->request ); ?>">

                    </form>
                </div>
            </div>
        </div>
    </kss-cookie>

<?php } ?>