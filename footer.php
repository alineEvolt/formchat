<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package chatux
 */

?>
		<?php
			if( is_singular('chat') ) {
				echo '<footer id="footer"></footer>';
			}
		?>
		</main><!-- #main -->
	</div><!-- #wrapper -->
</div><!-- #page -->
<div id="overlay"></div>
<?php wp_footer(); ?>

</body>
</html>
