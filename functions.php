<?php
/**
 * formchat functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package formchat
 */

if ( ! function_exists( 'formchat_setup' ) ) :

function formchat_setup() {
	
	load_theme_textdomain( 'formchat', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	
	add_theme_support( 'title-tag' );
	
	add_theme_support('post-thumbnails');
	add_image_size('avatar', 70, 70);
	add_image_size('avatar_big', 170, 183);

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

}
endif;
add_action( 'after_setup_theme', 'formchat_setup' );

//ajout d'une feuille de style pour wysiwyg
function wpdocs_theme_add_editor_styles() {
    add_editor_style( 'editor-style.css' );
}
add_action( 'admin_init', 'wpdocs_theme_add_editor_styles' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet. 
 * Priority 0 to make it available to lower priority callbacks.
 * @global int $content_width
 */
function formchat_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'formchat_content_width', 640 );
}
add_action( 'after_setup_theme', 'formchat_content_width', 0 );

/** Enqueue scripts and styles. */

function formchat_scripts() {
	
	wp_enqueue_style( 'formchat-style', get_stylesheet_uri() );	
    /* à remettre pour le build (prod)*/
	//wp_enqueue_style( 'formchat-chatstyle', get_template_directory_uri() . '/dist/css/styles.min.css' );
    
    //A virer pour le build
    wp_enqueue_style( 'formchat-normalize', get_template_directory_uri() . '/bower_components/normalize-css/normalize.css' );
    wp_enqueue_style( 'formchat-knacss', get_template_directory_uri() . '/bower_components/KNACSS/css/grillade.css' );
    wp_enqueue_style( 'formchat-jQui', get_template_directory_uri() . '/bower_components/jquery-ui/themes/base/jquery-ui.css' );
    wp_enqueue_style( 'formchat-chatstyle', get_template_directory_uri() . '/app/css/style.css' );
    


    //fin du A virer pour le build

	wp_enqueue_script( 'formchat-modernirz', get_template_directory_uri() . '/dist/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js', array("jquery"), '20172001', false );

	wp_register_script( 'formchat-functions', get_template_directory_uri() . '/dist/js/main.min.js', array("jquery"), '20172001', true );
	wp_localize_script( 'formchat-functions', 'chatux_params', array( 'formchat_ajax_url' => admin_url( 'admin-ajax.php' ) ) );

	wp_register_script( 'formchat-botjs', get_template_directory_uri() . '/dist/js/bot.min.js', array("jquery"), '20172001', true );

	$translation_array = array( 'templateUrl' => get_stylesheet_directory_uri() );
	wp_localize_script( 'formchat-botjs', 'template_path', $translation_array );



	if( is_single() && get_post_type()=='chat' ){
    wp_enqueue_script( 'formchat-functions' );
  }
 
	if( is_front_page() ){
    wp_enqueue_script( 'formchat-botjs' );
  }	

	
}
add_action( 'wp_enqueue_scripts', 'formchat_scripts' );


require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

// Ajout des notifications sur les synthèses en attente 
add_action( 'admin_menu', 'pending_posts_bubble_notif', 999 );

function pending_posts_bubble_notif() {

    global $menu;
    $args = array( 'public' => true ); 
    $post_types = get_post_types( $args );
    unset( $post_types['attachment'] );

    foreach( $post_types as $pt ) {

        $cpt_count = wp_count_posts( $pt );

        if ( $cpt_count->pending ) {
            $suffix = ( 'post' == $pt ) ? '' : "?post_type=$pt";

            $key = recursive_array_search_notif( "edit.php$suffix", $menu );

            if( !$key )
                return;

            $menu[$key][0] .= sprintf(
                '<span class="update-plugins count-%1$s" style="background-color:#d54e21;color:white; margin-left: 5px;"><span class="plugin-count">%1$s</span></span>',
                $cpt_count->pending 
            );
        }
    }
}

function recursive_array_search_notif( $needle, $haystack ) {
    foreach( $haystack as $key => $value ) {
        $current_key = $key;
        if( 
            $needle === $value 
            OR ( 
                is_array( $value )
                && recursive_array_search_notif( $needle, $value ) !== false 
            )
        ) 
        {
            return $current_key;
        }
    }
    return false;
}

