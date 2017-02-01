<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package chatux
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="page">
        <div class="wrapper">
            <header id="masthead">
			<?php
				/*$homeId = get_option('page_on_front');
				$logo = get_field('logo', $homeId);*/
				$logo = get_field('logo', 'option');
			?>

				<h1 class="site-title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						<img src="<?php echo $logo['url']; ?>" alt="<?php echo $logo['alt']; ?>" />
					</a>
				</h1>

			</header>
			<main id="main">