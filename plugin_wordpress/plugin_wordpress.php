<?php

/*
Plugin Name: Plugin Word press
Description: Plugin Word press
Plugin URI: 
Version: 1.0
Author: 
Author URI: 
License: GPL
Dependency: 
Text Domain: 
*/

class PluginWordpress
{

    private $plugin_dir;

    /**
     * Construct
     */
    public function __construct()
    {
        $this->plugin_dir = basename(dirname(__FILE__));
        load_plugin_textdomain('plugin_wordpress', null, $this->plugin_dir . '/languages/');
        add_action('admin_menu', array($this, 'plugin_wordpress_menu'));
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    /**
     * Todo https://wpdocs.osdn.jp/%E8%A8%AD%E5%AE%9A%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E4%BD%9C%E6%88%90
     */
    public function page_init()
    {
        register_setting( 'myoption-group', 'new_option_name' );
    }

    /**
     * Hook's to add plugin page menu
     */
    public function plugin_wordpress_menu()
    {
        add_submenu_page('options-general.php'
            , __('Plugin Wordpress Options', 'plugin_wordpress')
            , 'Plugin Wordpress', 'manage_options'
            , basename(__FILE__), array( $this, 'pluginWordpressNavigation'));
    }

    /**
     *
     */
    public function pluginWordpressNavigation()
    {
        echo '<div class="wrap">';
        echo '<h2>' .__('Plugin Wordpress Options', 'plugin_wordpress') . '</h2>';
        $tab = isset($_GET['tab']) ? $_GET['tab'] : '';
        $this->screenNavigationTabs($tab);
        if (empty($tab) || $tab == 'general') {
            $this->screenOptions();
        } else if ($tab == 'set_schedule') {
            $this->setScheduleEvent();
        } else if ($tab == 'save_database') {
            $this->saveDatabase();
        }
        echo '</div>';
    }

    /**
     * Build the menu for the options page
     * @param $tab
     */
    private function screenNavigationTabs($tab)
    {
        $url = 'options-general.php?page=plugin_wordpress.php';
        echo '<p>';
        if (empty($tab)) $tab = 'general';
        echo '<a href="' . admin_url($url . '&tab=general') . '"' . ($tab == 'general' ? ' style="font-weight: bold; text-decoration:none;"' : '') . '>' . 'General Settings' . '</a> | ';
        echo '<a href="' . admin_url($url . '&tab=set_schedule') . '"' . ($tab == 'set_schedule' ? ' style="font-weight: bold; text-decoration:none;"' : '') . '>' . 'Set Schedule' . '</a> | ';
        echo '<a href="' . admin_url($url . '&tab=save_database') . '"' . ($tab == 'save_database' ? ' style="font-weight: bold; text-decoration:none;"' : '') . '>' . 'Save Database' . '</a> | ';
        echo '</p><hr/>';
    }

    /**
     * Show Plugin Options
     */
    private function screenOptions()
    {
        echo <<<EOT
Hello!!
EOT;
        $this->includeTemplate();
    }

    private function includeTemplate()
    {
        include_once($this->plugin_dir . '/template/sample.php');
    }

    private function setScheduleEvent()
    {
        if (wp_next_scheduled('pluginWordpress', array('id' => 1)) !== false) {
            wp_clear_scheduled_hook('pluginWordpress', array('id' => 1));
        }
        $date = new DateTime();
        $date->add(new DateInterval('P10D'));

        wp_schedule_single_event($date->getTimestamp(), 'pluginWordpress', array('id' => 1));
    }

    private function saveDatabase()
    {
        require_once($this->plugin_dir . '/plugin_wordpress_db.php');
        $pluginWordpressDb = new PluginWordpressDb();
        $data['message'] = "save!";
        $pluginWordpressDb->insert($data['message']);
    }

}

new PluginWordpress();

