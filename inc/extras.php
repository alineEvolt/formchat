<?php

//Ajout des options du thème [ACF]
if( function_exists('acf_add_options_page') ) {	
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme Options',
		'menu_title'	=> 'Theme Options',
		'menu_slug' 	=> 'theme-options',
		'capability'	=> 'edit_posts',
		'parent_slug'	=> '',
		'position'		=> false,
		'icon_url'		=> false,
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Infos générales',
		'menu_title'	=> 'Infos générales',
		'parent_slug'	=> 'theme-options',
		'menu_slug'		=> 'theme-options-infos',
		'capability'	=> 'edit_posts',
		'position'		=> false,
		'icon_url'		=> false,
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Synthèse',
		'menu_title'	=> 'Synthèse',
		'parent_slug'	=> 'theme-options',
		'menu_slug'		=> 'theme-options-synthese',
		'capability'	=> 'edit_posts',
		'position'		=> false,
		'icon_url'		=> false,
	));
}

function generate_options_css() {
  $ss_dir = get_stylesheet_directory();
  ob_start();
  require($ss_dir . '/inc/custom-styles.php'); 
  $css = ob_get_clean(); 
  file_put_contents($ss_dir . 'custom-styles.css', $css, LOCK_EX);
}
add_action( 'acf/save_post', 'generate_options_css' ); 

//Increase css with new values for text an background colors
function my_acf_admin_head() {
	?>
	<style type="text/css">
/*
		body {
			background: <?php //the_field('bkg_general_chat', 'option'); ?>;
		}*/

	</style>

	<script type="text/javascript">
	(function($){


	})(jQuery);
	</script>
	<?php
}

add_action('acf/input/admin_head', 'my_acf_admin_head');


/**
 * Adds styles from customizer to head of TinyMCE iframe.
 * These styles are added before all other TinyMCE stylesheets.
 * h/t Otto.
 */
function kwh_add_editor_style( $mceInit ) {
  // This example works with Twenty Sixteen.
  $backgroundBody = get_field('bkg_general_chat', 'option');
  $colorQuest = get_field('text_color_quest', 'option');
  $bkgQuest = get_field('bkg_bulles_quest', 'option');
  $colorResp = get_field('text_color_reponse', 'option');
  $bkgResp = get_field('bkg_bulles_reponse', 'option');
   $styles = 'body#tinymce.wp-editor { background: ' . $backgroundBody . ' !important; color: ' . $colorQuest . ' !important; } p, h1, h2, h3, ul, li { color: ' . $colorQuest . ' !important; } p.question { background: ' . $bkgQuest . ' !important; color: ' . $colorQuest . ' !important; } p.reponse { background: ' . $bkgResp . ' !important; color: ' . $colorResp . ' !important; }';
  if ( !isset( $mceInit['content_style'] ) ) {
    $mceInit['content_style'] = $styles . ' ';
  } else {
    $mceInit['content_style'] .= ' ' . $styles . ' ';
  }
  return $mceInit;
}
add_filter( 'tiny_mce_before_init', 'kwh_add_editor_style' );


/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function chatux_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', bloginfo( 'pingback_url' ), '">';
	}
}
add_action( 'wp_head', 'chatux_pingback_header' );

//load custom post type [chat]
function chat() {

	$labels = array(
		'name'                  => _x( 'Chat', 'Post Type General Name', 'chatux' ),
		'singular_name'         => _x( 'Chat', 'Post Type Singular Name', 'chatux' ),
		'menu_name'             => __( 'Chat', 'chatux' ),
		'name_admin_bar'        => __( 'Chat', 'chatux' ),
		'archives'              => __( 'Tous les chats', 'chatux' ),
		'parent_item_colon'     => __( 'Chat parente', 'chatux' ),
		'all_items'             => __( 'Tous les chats', 'chatux' ),
		'add_new_item'          => __( 'Ajouter un nouveau chat', 'chatux' ),
		'add_new'               => __( 'Ajouter un chat', 'chatux' ),
		'new_item'              => __( 'Nouveau chat', 'chatux' ),
		'edit_item'             => __( 'Editer le chat', 'chatux' ),
		'update_item'           => __( 'Mettre le chat à jour', 'chatux' ),
		'view_item'             => __( 'Voir le chat', 'chatux' ),
		'search_items'          => __( 'Chercher un chat', 'chatux' ),
		'not_found'             => __( 'Aucun chat trouvé', 'chatux' ),
		'not_found_in_trash'    => __( 'Aucun chat trouvé dans la corbeille', 'chatux' ),
		'featured_image'        => __( '', 'chatux' ),
		'set_featured_image'    => __( '', 'chatux' ),
		'remove_featured_image' => __( '', 'chatux' ),
		'use_featured_image'    => __( '', 'chatux' ),
		'insert_into_item'      => __( 'Insérer dans le chat', 'chatux' ),
		'uploaded_to_this_item' => __( '', 'chatux' ),
		'items_list'            => __( 'Liste des chats', 'chatux' ),
		'items_list_navigation' => __( '', 'chatux' ),
		'filter_items_list'     => __( '', 'chatux' ),
	);
	$args = array(
		'label'                 => __( 'Chat', 'chatux' ),
		'description'           => __( 'Post Type Description', 'chatux' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'author', 'editor', 'thumbnail', 'page-attributes', 'post-formats' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-admin-comments',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'chat', $args );

}
add_action( 'init', 'chat', 0 );


//Custom post type "Syntheses"
function synthese() {

	$labelsSynthese = array(
		'name'                  => _x( 'Synthèses', 'Post Type General Name', 'chatux' ),
		'singular_name'         => _x( 'Synthèse', 'Post Type Singular Name', 'chatux' ),
		'menu_name'             => __( 'Synthèse', 'chatux' ),
		'name_admin_bar'        => __( 'Synthèse', 'chatux' ),
		'archives'              => __( 'Toutes les syntheses', 'chatux' ),
		'parent_item_colon'     => __( 'Synthèse parente', 'chatux' ),
		'all_items'             => __( 'Toutes les syntheses', 'chatux' ),
		'add_new_item'          => __( 'Ajouter une nouvelle synthese', 'chatux' ),
		'add_new'               => __( 'Ajouter une synthese', 'chatux' ),
		'new_item'              => __( 'Nouvelle synthese', 'chatux' ),
		'edit_item'             => __( 'Editer la synthese', 'chatux' ),
		'update_item'           => __( 'Mettre la synthese à jour', 'chatux' ),
		'view_item'             => __( 'Voir la synthese', 'chatux' ),
		'search_items'          => __( 'Chercher une synthese', 'chatux' ),
		'not_found'             => __( 'Aucune synthese trouvée', 'chatux' ),
		'not_found_in_trash'    => __( 'Aucune synthese trouvée dans la corbeille', 'chatux' ),
		'featured_image'        => __( '', 'chatux' ),
		'set_featured_image'    => __( '', 'chatux' ),
		'remove_featured_image' => __( '', 'chatux' ),
		'use_featured_image'    => __( '', 'chatux' ),
		'insert_into_item'      => __( 'Insérer dans la synthèse', 'chatux' ),
		'uploaded_to_this_item' => __( '', 'chatux' ),
		'items_list'            => __( 'Liste des synthèses', 'chatux' ),
		'items_list_navigation' => __( '', 'chatux' ),
		'filter_items_list'     => __( '', 'chatux' ),
	);
	$argsSynthese = array(
		'label'                 => __( 'Synthèse', 'chatux' ),
		'description'           => __( 'Post Type Description', 'chatux' ),
		'labels'                => $labelsSynthese,
		'supports'              => array( 'title', 'author', 'editor', 'thumbnail', 'page-attributes', 'post-formats' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 6,
		'menu_icon'             => 'dashicons-admin-comments',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
	);
	register_post_type( 'synthese', $argsSynthese );

}
add_action( 'init', 'synthese', 0 );


function __update_post_meta( $post_id, $field_name, $value = '' ) {
  if ( empty( $value ) OR ! $value )
  {
      delete_post_meta( $post_id, $field_name );
  }
  elseif ( ! get_post_meta( $post_id, $field_name ) )
  {
      add_post_meta( $post_id, $field_name, $value );
  }
  else
  {
      update_post_meta( $post_id, $field_name, $value );
  }
}

add_filter( 'acf/fields/wysiwyg/toolbars' , 'my_toolbars'  );
function my_toolbars( $toolbars )
{
	// Uncomment to view format of $toolbars
	/*
	echo '< pre >';
		print_r($toolbars);
	echo '< /pre >';
	die;*/
	

	// Add a new toolbar called "Very Simple"
	// - this toolbar has only 1 row of buttons
	/*$toolbars['Very Simple' ] = array();
	$toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'underline' );*/


	// Edit the "Full" toolbar and remove 'code'
	// - delet from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
	/*if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false )
	{
	    unset( $toolbars['Full' ][2][$key] );
	}

	// remove the 'Basic' toolbar completely
	unset( $toolbars['Basic' ] );*/

	// return $toolbars - IMPORTANT!
	//array_unshift( $toolbars['Basic' ][1], 'forecolor' );
	return $toolbars;
}


// Ajax function wp_insert_post (synthèses)
add_action( 'wp_ajax_nopriv_chatux_create', 'chatux_create' );
add_action( 'wp_ajax_chatux_create', 'chatux_create' );
 
function chatux_create() {

	$results = '';

	$post_title = $_POST['post_title'];
	$questions = $_POST['questions'];
	$name = $_POST['name'];
	$email = $_POST['email'];


	if(isset($_POST['post_title']) && isset($_POST['questions'])) {
		// Create post object
		$new_chatux_post = array(
			'post_type'		=> 'synthese',
			'post_title'	=> $post_title,
			'post_content' => $questions,
			'post_status'	=> 'pending',
			'post_author'	=> 1,
		);
		 
		// Insert the post into the database
		$the_post_id = wp_insert_post( $new_chatux_post );

		__update_post_meta( $the_post_id, 'nom_synthese', $name );
		__update_post_meta( $the_post_id, 'email_synthese', $email );

		die($results);
	}
};
