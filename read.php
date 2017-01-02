<?php
$rid = $_GET["rid"];

$filename = "register/" . htmlspecialchars($rid, ENT_QUOTES) . ".txt";

if (file_exists($filename)) {
    $file = fopen($filename, "r");
    $text = fread($file, filesize($filename));
    fclose($file);
    
    die($text);
}
else
    die("");

?>