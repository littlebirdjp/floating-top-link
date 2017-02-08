<?php
/*
Plugin Name: Floating Top Link
Plugin URI:  https://github.com/littlebirdjp/floating-top-link
Description: Add link to page top.
Version:     1.0.5
Author:      Yusuke Takahashi
Author URI:  http://littlebird.mobi
License:     GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Domain Path: /languages
Text Domain: floating-top-link
*/

add_action( 'init', 'floating_top_link_load_textdomain' );
function floating_top_link_load_textdomain() {
  load_plugin_textdomain( 'floating-top-link', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}

add_filter( 'wp_footer' , 'floating_top_link_html_add' );
function floating_top_link_html_add() {
	echo '<div class="FloatingTopLink" id="js-FloatingTopLink"><a href="#page"><i class="FloatingTopLink__icon FloatingTopLink__icon-01"></i></a></div>';
}

function floating_top_link_css_add(){
	wp_enqueue_style( 'floating-top-link.css',plugins_url('/css/floating-top-link.css',__FILE__), array(), '1.0.5', 'all' );
	wp_enqueue_script('floating-top-link-js',plugins_url('/js/floating-top-link.js',__FILE__),array(), '1.0.5', 'all' );
}
add_action('wp_enqueue_scripts','floating_top_link_css_add');
