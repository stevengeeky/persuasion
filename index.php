<?php
$rickroll = $_GET["id"];
$register = $_GET["rid"];

$filename = "register/" . htmlspecialchars($register, ENT_QUOTES) . ".txt";
$flength = 0;

if (file_exists($filename))
    $flength = filesize($filename);

/*if (empty($rickroll) || $rickroll != 4) {
    $imgs = "";
    for ($i = 0; $i < 1; $i++)
        $imgs .= "<img src='images_content/rickrollme.gif' class='trolled' /> ";
    
    die("<title>You've Been Rickrolled</title><link rel='stylesheet' href='troll.css' /><script>var rid = '" . htmlspecialchars($register, ENT_QUOTES) . "', flength = '" . htmlspecialchars($flength, ENT_QUOTES) . "';</script><script src='scripts/monitor.js'></script><audio autoplay loop><source src='music/never_gonna_give_you_up.mp3'></audio><p style='text-align:center;'>$imgs</p>");
}*/

if (empty($register))
    header("Location:/?id=" . $rickroll . "&rid=" . hash("sha256", $_SERVER["HTTP_X_FORWARDED_FOR"]));

?>
<!--
    To access the persuasion document, keep these numbers at your fingertips:
    82 69 82 79 85 84 69
-->
<!DOCTYPE html>
<html>
    <head>
        <title>Time Capsule Persuasion</title>
        
        <link href='https://fonts.googleapis.com/css?family=Herr+Von+Muellerhoff' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="styles/main.css" />
        
        <script src="scripts/main.js"></script>
        
        <link rel="shortcut icon" href="images_content/time_capsule.png" />
    </head>
    
    <body>
        <!-- This is where the glitchiness happens at -->
        <div id="regular"></div>
        
        <p class="invisi_load">
            <!-- Put stuff to be used with the presentation here for loading before displaying -->
            <input id='initial_rid' value='<?php echo htmlspecialchars($register, ENT_QUOTES); ?>' />
            <input id='flength' value='<?php echo htmlspecialchars($flength, ENT_QUOTES); ?>' />
            
            <!-- Backgrounds -->
            <img src="images/fire.jpg" />
            <img src="images/grass.png" />
            <img src="images/stained_glass.jpg" />
            <img src="images/road.jpg" />
            <img src="images/grass.png" />
            <img src="images/sky.jpg" />
            <img src="images/static.gif" />
            <img src="images/space_1.jpg" />
            <img src="images/space_2.jpg" />
            
            <!-- Content Images -->
            <img src="images_content/time_capsule.png" />
            <img src="images_content/relativity.png" />
            <img src="images_content/bible.png" />
            <img src="images_content/koran.png" />
            <img src="images_content/automobile_blueprint.png" />
            <img src="images_content/football.png" />
            <img src="images_content/soccerball.png" />
            <img src="images_content/basketball.png" />
            <img src="images_content/cosmos.png" />
            <img src="images_content/puppy.png" />
            
            <!-- Bensound Music -->
            <audio id="music_elevator"><source src="music/elevator.mp3" /></audio>
            <audio id="music_happy"><source src="music/happy.mp3" /></audio>
            <audio id="music_local_forecast"><source src="music/local_forecast.mp3" /></audio>
            <audio id="music_metal"><source src="music/metal.mp3" /></audio>
            <audio id="music_riley"><source src="music/riley.mp3" /></audio>
            
            <!-- Sound Effects -->
            <audio id="sfx_blop"><source src="sfx/blop.mp3" /></audio>
            <audio id="sfx_snap"><source src="sfx/snap.mp3" /></audio>
            <audio id="sfx_explosion"><source src="sfx/explosion.mp3" /></audio>
            <audio id="sfx_off_hook"><source src="sfx/off_hook.mp3" /></audio>
            
            <audio id="destruct_text"><source src="sfx/destruct_text.mp3" /></audio>
            <audio id="destruct_3"><source src="sfx/destruct_3.mp3" /></audio>
            <audio id="destruct_2"><source src="sfx/destruct_2.mp3" /></audio>
            <audio id="destruct_1"><source src="sfx/destruct_1.mp3" /></audio>
            
        </p>
        <div class="wrapper" id="wrapper">
            <div class="container" id="container">
                
                <div class="content" id="content">
                    <!-- Initial Content Here -->
                    <div class="initial">
                        <h1>Time Capsule Persuasion</h1>
                        By Garrett Fehrman and Steven O'Riley
                    </div>
                </div>
                <div class="author_info">
                    <div class="garrett">Garrett Fehrman</div>
                    <div class="steven">Steven O'Riley</div>
                </div>
                <div id="method"></div>
                
            </div>
        </div>
    </body>
</html>