<?php

$register = $_GET["rid"];

if (empty($register))
    $register = hash("sha256", $_SERVER["HTTP_X_FORWARDED_FOR"]);
$add = "<script>var rid = " . htmlspecialchars($register, ENT_QUOTES) . ";</script>";

?>
<!doctype html>
<html>
    <head>
        <title>Remote</title>
        
        <?php echo $add; ?>
        <script src="scripts/register.js"></script>
        
        <link rel="stylesheet" href="styles/register.css" />
    </head>
    
    <body>
        <div class="wrapper">
            <button id="rickroll" class="control half red">Rickroll</button><button id="unrickroll" class="control half red">Unrickroll</button><br />
            <button id="sound" class="control third white">Sound</button><button id="reroute" class="control third blue">Reroute</button><button id="reload" class="control third white">Reload</button><br />
            <button id="vdown" class="control half green">Volume Down</button><button id="vup" class="control half green">Volume Up</button><br />
            <button id="previous" class="control half blue">Previous</button><button id="next" class="control half blue">Next</button>
            
        </div>
    </body>
</html>