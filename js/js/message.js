var i = 0;
var txt = "MOTIVTATE";
var speed = 120;
var doThis = true;
var message ="MOTIVATE";
var p = 0;

function typeHi() {
    if (i < txt.length) {
        document.getElementById("words").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeHi, speed);
    }
};

function deleteHi(){
    if (o >= 5) {
        document.getElementById("words").innerHTML = txt.substr(0,o);
        o--;
        setTimeout(deleteHi,70);
    }

};

var o = 12;

function leaveMessage () {
    if (p < message.length) {
        document.getElementById("words").innerHTML += message.charAt(p);
        p++;
        setTimeout(leaveMessage, speed);
    }
};


typeHi();

setTimeout(deleteHi,1700);
setTimeout(leaveMessage,2600);