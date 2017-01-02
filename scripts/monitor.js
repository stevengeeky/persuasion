// 

window.addEventListener("load", function(){
    checkBuffer();
});

function checkBuffer() {
    readBuffer(function(t){
        var ops = t.substring(flength).split(" ");
        
        for (var i in ops)
        {
            var op = ops[i];
            switch (op) {
                case "unrickroll":
                    window.location = "/?id=4&rid=" + encodeURIComponent(rid);
                    break;
            }
        }
        
        flength = t.length;
        checkBuffer();
    });
}

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