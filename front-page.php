<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package chatux
 */

get_header();
?>

	<div class="grid">

    <?php while ( have_posts() ) : the_post(); ?>

        <div class="global-container flex-container intro">
            <div class="avatar">

                <canvas id="botAnimation"></canvas>
                
            </div>
            <div class="content">
               <?php the_content(); ?>
            </div>
            <p class="btn clearfix">
                <a href="<?php the_field('lien_chat'); ?>" class="goToChat"><?php the_field('texte_btn_chat'); ?></a>
            </p>
        </div>
      <?php endwhile;

      ?>
  </div>

<?php
get_footer();
