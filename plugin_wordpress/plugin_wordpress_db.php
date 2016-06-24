<?php

class PluginWordpressDb
{
    private $table_name;

    function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'plugin_wordpress_db';
        $this->create();
    }

    /**
     * Create Database Table to store debugging information if it does not already exist.
     */
    private function create()
    {
        global $wpdb;
        if ($wpdb->get_var("SHOW TABLES LIKE '" . $this->table_name . "'") != $this->table_name) {
            $sql = "CREATE TABLE `" . $this->table_name . "` (
				`id` INT(9) NOT NULL AUTO_INCREMENT PRIMARY KEY,
				`timestamp` TIMESTAMP NOT NULL,
				`message` text NOT NULL
			);";
            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
        }
    }

    public function drop()
    {
        global $wpdb;
        $wpdb->query('DROP TABLE IF EXISTS ' . $this->table_name);
    }

    public function insert($data)
    {
        global $wpdb;
        $wpdb->query($wpdb->prepare('INSERT INTO ' . $this->table_name . ' (`timestamp`,`message`) VALUES (FROM_UNIXTIME(%d),%s,%s)', time(), $data['message']));
    }

    public function read()
    {
        global $wpdb;
        return $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY `id` DESC");
    }

    public function purge()
    {
        global $wpdb;
        $wpdb->query("TRUNCATE TABLE {$this->table_name}");
    }
}
