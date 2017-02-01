<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package chatux
 */

get_header(); ?>

	<div class="grid">

    <div class="global-container flex-container">

				<header class="page-header">
					<div class="visuel">
						<?php 
		      		$avatar = get_field('avatar_error', 'option');
		      		if( !empty($avatar) ):		      			
		      	?>
		          <img src="<?php echo $avatar['url']; ?>" alt="<?php echo $avatar['alt']; ?>" />
		        <?php endif; ?>
					</div>
					<h1 class="page-title">Oops !</h1>
					<p>la page que vous cherchez n'existe pas ou plus</p>
				</header><!-- .page-header -->

				<div class="page-content">
					<p class="btn"><a href="<?php echo get_bloginfo('url'); ?>">Revenir à la page d'accueil</a></p>
				</div><!-- .page-content -->

		</div>

	</div>
<?php
get_footer();
