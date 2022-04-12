<?php
/**
 * Plugin Name:       Youtube Customize Sticky Video
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:                        <a href="https://profiles.wordpress.org/patelmohip/">Mohip Patel</a> | <a href="https://profiles.wordpress.org/haritpanchal/">Harit Panchal</a>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       youtube-customize-sticky-video
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_youtube_customize_sticky_video_block_init() {

	wp_register_style(
		'ycsv-style-css',
		plugin_dir_url(__FILE__).'assets/css/main.css',
		is_admin() ? array('wp-editor') : null,
		null
	);

	wp_register_script(
		'ycsv-jquery-js',
		'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
		is_admin() ? array('wp-editor') : null,
		null,
		false
	);

	register_block_type( 
		__DIR__ . '/build',
		array(
			'style'           => 'ycsv-style-css',
			'script'          => 'ycsv-jquery-js',
			'render_callback' => 'ycsv_render_callback',
			'attributes'      => array(
				'video_id'        => array(
					'type'    => 'string',
					'default' => 'tgbNymZ7vqY',
				),
				'video_possion'        => array(
					'type'    => 'string',
					'default' => 'br',
				),
				'bottom'        => array(
					'type'    => 'number',
					'default' => '10',
				),
				'top'        => array(
					'type'    => 'number',
					'default' => '10',
				),
				'right'        => array(
					'type'    => 'number',
					'default' => '10',
				),
				'left'        => array(
					'type'    => 'number',
					'default' => '10',
				),
			),
		)
	);
}
add_action( 'init', 'create_block_youtube_customize_sticky_video_block_init' );


function ycsv_block_scripts() {
	$data = get_option('ycsv_attributes');
	wp_enqueue_script(
		'main-js',
		plugins_url( 'assets/js/main.js', __FILE__ ),
		[],
	);
	wp_localize_script( 'main-js', 'ycsvObj',
        array( 
            'data' => $data,
        )
    );
}
add_action( 'enqueue_block_assets', 'ycsv_block_scripts' );

function ycsv_render_callback($attributes) {
	update_option( 'ycsv_attributes', $attributes );
	ob_start();
	?>
		<div class="video-wrap">
			<div class="video">
				<img class="btn_close up" src="<?php echo esc_url( plugins_url( '/assets/images/close-button.png', __FILE__ ) ) ?>" />
				<iframe src="https://www.youtube.com/embed/<?php esc_attr_e( $attributes['video_id'] ); ?>" ></iframe>
				<img class="btn_close down" src="<?php echo esc_url( plugins_url( '/assets/images/close-button.png', __FILE__ ) ) ?>" />
			</div>
		</div>
	<?php
	return ob_get_clean();
}
