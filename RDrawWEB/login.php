<?php
$function = $_POST['function'];
  $connect = mysql_connect("user_info","postgres","rdraw");if (!connect) { die('Connection Failed: ' . mysql_error()); { mysql_select_db("user_info", $connect);
    $user_info = “INSERT INTO table_name (username, email) VALUES ('$_POST[username]', '$_POST[email]')”; if (!mysql_query($user_info, $connect)) { die('Error: ' . mysql_error()); }
?>
