// Main Core for Persuasive Presentation

// IMPORTANT: For control from a phone, the rid variable must match up with the register id within the control center
var rid = "100";        // Use the PHP GET variable 'rid' to modify this js variable without the need for manual modification

// To Garrett --> The following are all available options for info targets
/*
    DEFAULTS (without any specified):
        transition: scale in
        display: text, image
        textAlign: left
        images: (none)
        newBackground: current
        newMusic: current
*/

/*
    Core implementations:
        Transitions with CSS
        An easy way to implement powerful yet lightweight targets
        Music that is changeable
        Backgrounds that are changeable
        Animations for background changes, div changes, and image changes
*/

// Don't change these assigned values, Garrett
var display_imagetext = 1,
    
    transition_swoopIn = 1,
    transition_rotateIn = 2,
    transition_reverseTV = 3,
    transition_3dflip = 4,
    transition_unskew = 5,
    
    align_center = 1;

var music_deviation = 0,
    music_deviation_adjust = .1;

// Set the following to false if you want to skip the 'this page will self-destruct in' sequence
var loading = true;

// ////////////////////////////////////////////////////////////////////
var info = [
    {
        target:[createTitle("Time Capsule Persuasion", transition_swoopIn), "A Short Presentation by Garrett and Steven"],
        transition:transition_swoopIn,
        display:display_imagetext,
        textAlign:align_center,
        newBackground:"images/fire.jpg",
        newMusic:"music_elevator",
        images:["images_content/time_capsule.png"],
        containerBackground:"rgba(0, 0, 0, .7)",
        containerColor:"white",
        newVolume:.3,
        methodHtml:""
    },
    
    {
        target:[createTitle("Einstein's Relativity Formulas", transition_reverseTV), "Stephen Hawking states it himself; Einstein's formulas of relativity are a vital part of modern physics today. They explicitly state that gravity is a result of curved spacetime, and lay the foundation for time travel!<br />If world renowned scientist Stephen Hawking sits in the belief that this is one of the most essential innovations of the current age, it must be correct!"],
        transition:transition_reverseTV,
        newBackground:"images/space_1.jpg",
        newMusic:"music_elevator",
        images:["images_content/relativity.png"],
        containerBackground:"rgba(200, 200, 255, .6)",
        containerColor:"black",
        newVolume:.3,
        methodHtml:"Experts"
    },
    
    {
        target:[createTitle("Modern Religious Texts", transition_rotateIn), "The debate between science and religion is as old as the dawn of man, and has been especially made prevalent since the Enlightenment.  It is inferred by the majority today that this argument will be settled in the distant future.  Stored books regarding religions will sit as reminders of an earlier, pseudo-knowledge era."],
        transition:transition_rotateIn,
        newBackground:"images/stained_glass.jpg",
        newMusic:"music_elevator",
        images:["images_content/bible.png", "images_content/koran.png"],
        containerBackground:"rgba(0, 0, 0, .8)",
        containerColor:"white",
        newVolume:.3,
        methodHtml:"Diversion"
    },
    
    {
        target:[createTitle("Blueprint of Today's Automobiles", transition_3dflip),  "Rather than presenting those of a future society with a convoluted puzzle to solve in order to discover information about us and our way of transport, we may save them the persistent struggle by providing these diagrams."],
        transition:transition_3dflip,
        newBackground:"images/road.jpg",
        newMusic:"music_elevator",
        images:["images_content/automobile_blueprint.png"],
        containerBackground:"rgba(240, 240, 240, .6)",
        containerColor:"black",
        newVolume:.3,
        methodHtml:"Simple Solution"
    },
    
    {
        target:[createTitle("Record of Modern Recreational Activities"),  "Sports are a vital piece of human cognitive health.  Nothing generates enjoyment quite like the unanimous competition that we all know and love today.  So make it known to those after us the amount of amusement one may retrieve by taking a breath of that cool, refreshing summer air in the midst of overflowing adrenaline!"],
        newBackground:"images/grass.png",
        newMusic:"music_riley",
        images:["images_content/football.png", "images_content/puppy.png", "images_content/basketball.png"],
        containerBackground:"rgba(30, 165, 30, .7)",
        containerColor:"white",
        newVolume:1,
        methodHtml:"Warm &amp; Fuzzy"
    },
    
    {
        target:[createTitle("Today's Map of the Cosmos", transition_unskew),  "By incorporating this intuitive diagram in a time capsule, you may remind those writing the end of the book about the early chapters.  Modern depictions of recursive entropy have been formulated through inferences alone.  Our early discoveries lay the foundation for one of the greatest findings of man: a map of the universe."],
        transition:transition_unskew,
        newBackground:"images/space_2.jpg",
        newMusic:"music_elevator",
        images:["images_content/cosmos.png"],
        containerBackground:"rgba(240, 240, 110, .7)",
        containerColor:"black",
        newVolume:.3,
        methodHtml:"Card Stacking"
    },
    
    {
        target:[createTitle("Thank You All for Listening!", transition_swoopIn), "And for supporting us with our time capsule item choices."],
        textAlign:align_center,
        newBackground:"images/sky.jpg",
        newMusic:"music_local_forecast",
        images:[],
        containerBackground:"rgba(240, 240, 240, .7)",
        containerColor:"black",
        newVolume:.3,
        methodHtml:""
    }
];
// //////////////////////////////////////////////////////// Begin Core

var pointer = 0, alldivs, scaledall = false;
var ischrome = false;
var said = false;

var can_trans = true, trans_timeout = 2000;     // 1s for image, .5 for divs + additional .5 for waiting to prevent glitchiness

var lastup = false, lastdown = false;
var first = true, wrapper, startedsd = false,
    dontrespond = false, container, method;

var music,
    sounds = {};

var keylog = [];
var flength = 0;

// Control Center Handling
function checkBuffer() {
    readBuffer(function(t) {
        var ops = t.substring(flength).split(" ");
        for (var i in ops) {
            var op = ops[i];
            switch (op) {
                case "previous_slide":
                    handleKeydown({keyCode:37,preventDefault:function(){}});
                    break;
                case "next_slide":
                    handleKeydown({keyCode:39,preventDefault:function(){}});
                    break;
                case "enter":
                    handleKeydown({keyCode:13,preventDefault:function(){}});
                    break;
                case "vup":
                    volumeUp();
                    break;
                case "vdown":
                    volumeDown();
                    break;
                case "page_reload":
                    window.location.reload();
                    break;
                case "reroute":
                    matrix();
                    break;
                case "sound":
                    play(sounds.blop);
                    break;
            }
        }
        
        flength = t.length;
        checkBuffer();
    });
}

window.addEventListener("load", function(){
    wrapper = document.getElementById("wrapper");
    container = document.getElementById("container");
    method = document.getElementById("method");
    
    ischrome = navigator.userAgent.toLowerCase().indexOf("chrome") != -1;
    if (!ischrome)
        document.body.innerHTML = "Your browser sucks!  Get <a href='https://www.google.com/chrome/browser/desktop/'>Chrome</a> for an improved life."
    
    music = new Music("music_elevator", .3);
    music.el.loop = true;
    
    sounds.blop = "sfx_blop";
    sounds.snap = "sfx_snap";
    sounds.explosion = "sfx_explosion";
    
    
    var reg = document.getElementById("regular");
    reg.innerHTML = "<h1>Error 404 - Page Not Found</h1>" + 
                    "<p>The requested page was not found on this server.</p>";
    
    //
    
    flength = +document.getElementById("flength").value;
    var initial_rid = document.getElementById("initial_rid");
    rid = initial_rid.value;
    
    checkBuffer();
});

function handleKeydown(e) {
    // Capture Space or Enter
    if (!ischrome)
        return;
    if (e.keyCode == 80)
        play(sounds.blop);
    if (dontrespond)
        return;
    keylog.push(e.keyCode);
    
    if (keylog[keylog.length - 1] == 69 && keylog[keylog.length - 2] == 84 && keylog[keylog.length - 3] == 85 &&
        keylog[keylog.length - 4] == 79 && keylog[keylog.length - 5] == 82 && keylog[keylog.length - 6] == 69 &&
        keylog[keylog.length - 7] == 82) {
        matrix();
    }
    
    if (loading)
    {
        if (e.keyCode == 13)
            window.location = "/?id=3&rid=" + encodeURIComponent(rid);
        return;
    }
    
    if (e.keyCode == 38 || e.keyCode == 66)
        volumeUp();
    else if (e.keyCode == 40 || e.keyCode == 16 || e.keyCode == 27)
        volumeDown();
    else if (e.keyCode == 32 || e.keyCode == 34 || e.keyCode == 39) {
        e.preventDefault();
        
        if (can_trans)
        {
            if (!scaledall)
            {
                play(sounds.explosion);
                music.play();
            }
            else
                play(sounds.blop);
            
            can_trans = false;
            advance();
            
            setTimeout(function() {
                can_trans = true;
            }, trans_timeout);
        }
    }
    else if (e.keyCode == 8 || e.keyCode == 33 || e.keyCode == 37) {
        e.preventDefault();
        
        if (can_trans) {
            play(sounds.snap);
            
            can_trans = false;
            backup();
            
            setTimeout(function() {
                can_trans = true;
            }, trans_timeout);
        }
    }
}
window.addEventListener("keydown", handleKeydown);

function readBuffer(cb) {
    cb = cb || function(){};
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "read.php?rid=" + encodeURIComponent(rid));
    xhr.send();
    
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            cb(xhr.responseText);
        }
    }
}

function volumeDown() {
    music_deviation = Math.max(-1, music_deviation - music_deviation_adjust);
    adjustVolume();
}
function volumeUp() {
    music_deviation = Math.min(1, music_deviation + music_deviation_adjust);
    adjustVolume();
}
function adjustVolume() {
    if (music)
        music.el.volume = Math.min( Math.max(music.rvolume + music_deviation, 0), 1 );
}

function createTitle(s, tstyle) {
    if (tstyle)
        return "<div class='centered content_item_t" + tstyle + "'><h1>" + s + "</h1></div>";
    return "<div class='centered content_item'><h1>" + s + "</h1></div>";
}
//
function matrix() {
    if (dontrespond || startedsd || !loading)
        return;
    
    if (music)
        music.stop();
    music = new Music("sfx_off_hook");
    music.el.loop = true;
    music.play();
    
    dontrespond = true;
    document.body.style.background = "black";
    
    var reg = document.getElementById("regular");
    reg.innerHTML = "";
    reg.style.color = "#0f0";
    
    var timer = -1;
    var times = 300;
    var time_interval = 1;
    var time_amount = 5;
    
    reg.style["font-size"] = "15px";
    
    var ct = 0;
    var intid;
    intid = setInterval(function(){
        timer++;
        if (timer % time_interval == 0) {
            ct += time_amount;
            
            for (var i = 0; i < time_amount; i++) {
                var s = document.createElement("span");
                s.innerHTML = "<b>" + randString(128) + "</b>";
                reg.appendChild(s);
                reg.appendChild(document.createElement("br"));
            }
            document.body.scrollTop = document.body.scrollHeight;
        }
        
        if (ct >= times) {
            clearInterval(intid);
            
            music.stop();
            music = new Music("music_elevator", .3);
            
            dontrespond = false;
            selfDestruct(reg);
        }
    }, 1000 / 60);
}

var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
function randString(size) {
    var n = rand(10000);
    var s = "";
    for (var i = 0; i < size; i++)
        s += chars[rand(chars.length)];
    return "&lt;LOG " + n + "&gt; " + s;
}
function rand(max) {
    return Math.floor(Math.random() * max);
}

function selfDestruct(reg) {
    if (startedsd)
        return;
    
    startedsd = true;
    
    var t = 3;
    document.body.style.background = "red";
    reg.style.color = "white";
    reg.style["text-align"] = "center";
    reg.style["font-size"] = "inherit";
    
    reg.innerHTML = "<h1>Fatal Error</h1>" +
                    "<p>This page will self-destruct in ... <label id='countdown'>?</label> second(s)</p>";
    
    var done = function(){
        music.play();
        play(sounds.explosion);
        advance();
        loading = false;
        
        reg.innerHTML = "";
    }
    
    if (chromeOs()) {
        var m = play("destruct_text");
        
        m.el.addEventListener("ended", function(){
            tick(t, done);
        });
    }
    else
    {
        var message = new SpeechSynthesisUtterance("This page will self-destruct in...");
        message.volume = 1;
        message.rate = 1;
        message.pitch = 2;
        message.lang = "en-US";
        
        message.addEventListener("end", function(){
            tick(t, done);
        });
        
        setTimeout(function(){
            window.speechSynthesis.speak(message);
        }, 10);
    }
}
function implode() {
    var list = document.getElementsByTagName("div");
    for (var i in list) {
        var div = list[i];
        if (div && typeof div.style != "undefined") {
            div.style.transform = "scale(0)";
        }
    }
    if (music)
        music.stop();
}

function chromeOs() {
    return true;
    return navigator.userAgent.toLowerCase().indexOf("cros") != -1;
}

function tick(t, cb) {
    var cel = document.getElementById("countdown");
    cel.innerHTML = t;
    
    if (chromeOs()) {
        play("destruct_" + t);
    }
    else
    {
        var message = new SpeechSynthesisUtterance("" + t);
        message.volume = 1;
        message.rate = 1;
        message.pitch = 2;
        message.lang = "en-US";
        
        setTimeout(function(){
            window.speechSynthesis.speak(message);
        }, 1);
    }
    
    if (t <= 1) {
        cb = cb || function(){};
        setTimeout(cb, 1000);
    }
    else
    {
        setTimeout(function(){
            tick(t - 1, cb);
        }, 1000);
    }
}

function backup() {
    if (!scaledall)
        return;
    if (pointer <= 0)
        return;
    if (!said)
        said = true;
    
    if (pointer == info.length) {
        pointer = 0;
        var list = document.getElementsByTagName("div");
        for (var i in list) {
            var div = list[i];
            if (div && typeof div.style != "undefined") {
                div.style.transform = "scale(1)";
            }
        }
    }
    else
    {
        pointer--;
        if (lastup && pointer > 0)
        {
            lastup = false;
            pointer--;
        }
    }
    
    var content = document.getElementById("content");
    clearContent(content);
    
    var target = info[pointer];
    appendTarget(target, content);
    lastdown = true;
}

function advance()
{
    if (!scaledall)
        scaleDivs();
    if (pointer == info.length)
    {
        document.body.style.background = "url('images/static.gif')";
        implode();
        
        return;
    }
    else if (pointer > info.length)
        return;
    
    if (!said)
        said = true;
    
    if (lastdown) {
        pointer++;
        lastdown = false;
    }
    
    var content = document.getElementById("content");
    clearContent(content);
    
    var target = info[pointer];
    appendTarget(target, content);
    pointer++;
    
    lastup = true;
}

function clearContent(content) {
    var ocont = content;
    var ncont = document.createElement("div");
    ncont.className = "content";
    ncont.id = "content";
    
    while (content.children.length > 0)
    {
        var c = content.children[0];
        
        var r = c.className;
        c.className = "";
        c.className = r;
        
        content.removeChild(c);
    }
}

function appendTarget(target, content) {
    var imgs;
    var tstyle = 0;
    var disp = 0;
    var talign = 0;
    
    if (!(target instanceof Array)) {
        disp = target.display || 0;
        talign = target.textAlign || 0;
        
        if (typeof target.methodHtml == "string")
            method.innerHTML = target.methodHtml;
        
        if (target.newBackground)
            wrapper.style.background = "url('" + target.newBackground + "')";
        
        if (target.containerBackground)
            container.style.background = target.containerBackground;
        if (target.containerColor)
            container.style.color = target.containerColor;
        
        if (target.newMusic) {
            var m = new Music(target.newMusic, target.newVolume || 1);
            if (m.id != music.id)
            {
                music.stop();
                
                music = m;
                music.el.loop = true;
                music.play();
            }
        }
        
        if (target.images)
        {
            imgs = [];
            for (var i in target.images) {
                var image = target.images[i];
                imgs[i] = document.createElement("img");
                imgs[i].src = image;
                imgs[i].className = "dimg";
                imgs[i].style.opacity = 0;
            }
        }
        if (target.transition)
            tstyle = target.transition;
        
        target = target.target;
    }
    
    for (var i in target) {
        var div = document.createElement("div");
        
        if (tstyle)
            div.className = "content_item_t" + tstyle;
        else
            div.className = "content_item";
        
        if (talign == align_center)
            div.style["text-align"] = "center";
        div.innerHTML = target[i];
        content.appendChild(div);
    }
    
    if (imgs)
    {
        var td = document.createElement("div");
        td.className = "centered";
        
        for (var i in imgs)
            td.appendChild(imgs[i]);
        
        if (disp == display_imagetext)
            content.insertBefore(td, content.children[1])
        else
            content.appendChild(td);
    }
    
    setTimeout(function(){
        scaleDivs(true, function(){
            if (imgs) {
                for (var i in imgs)
                    imgs[i].style.opacity = 1;
            }
        });
    }, 10);
}

function scaleDivs(ovp, cb) {
    alldivs = document.getElementsByTagName("div");
    
    var len = alldivs.length;
    var current = 0;
    
    nextDiv(current, len, cb);
}

function nextDiv(current, len, cb) {
    scaledall = true;
    if (current > len - 1)
    {
        setTimeout(function(){
            if (typeof cb == "function")
                cb();
        }, 10);
        return;
    }
    var div = alldivs[current];
    if (div.className == "wrapper")
        div.style["border-radius"] = "0";
    
    if (typeof div != "undefined") {
        if (div.style.transform == "scale(1)")
        {
            nextDiv(current + 1, len, cb);
            return;
        }
        
        div.style.transform = "scale(1)";
        div.addEventListener("transitionend", function(){
            nextDiv(current + 1, len, cb);
        });
    }
}

function Music(id, volume) {
    var el = document.getElementById(id);
    this.id = id;
    this.el = el;
    this.rvolume = volume || 1;
    this.el.volume = Math.min( Math.max(this.rvolume + music_deviation, 0), 1 );
    
    this.play = function() {
        el.play();
    }
    this.stop = function() {
        el.currentTime = 0;
        el.pause();
    }
}

function play(id) {
    var m = new Music(id);
    m.play();
    
    return m;
}