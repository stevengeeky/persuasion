<?php
$rid = $_GET["rid"];
$text = $_GET["data"];

$filename = "register/" . htmlspecialchars($rid, ENT_QUOTES) . ".txt";

$file = fopen($filename, "a");
fwrite($file, " " . $text);
fclose($file);

?>