// 

window.addEventListener("load", function(){
    addClick("rickroll", "enter");
    addClick("unrickroll", "unrickroll");
    addClick("sound", "sound");
    addClick("reroute", "reroute");
    addClick("reload", "page_reload");
    addClick("vdown", "vdown");
    addClick("vup", "vup");
    addClick("previous", "previous_slide");
    addClick("next", "next_slide");
    
});

function addClick(id, text) {
    document.getElementById(id).onclick = function(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/write.php?rid=" + encodeURIComponent(rid) + "&data=" + encodeURIComponent(text));
        xhr.send();
    };
}