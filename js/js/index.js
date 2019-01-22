var Project = function(num, name, tools, link) {
    this.num = num;
    this.name = name;
    this.tools = tools;
    this.link = link;
}

Project.prototype.displayProject = function() {
    var html = '<a href="%link%" target="_blank" class="projectLink"><div class="projects"><div class="project%num%"></div><div class="description" onmouseover="blowPic(this, true)" onmouseout="blowPic(this, false)"><h2>%name%</h2><div class="tools tools%numTool%"></div></div></div></a>';

    newHTML = html.replace('%num%', this.num);
    newHTML = newHTML.replace('%numTool%', this.num);
    newHTML = newHTML.replace('%name%', this.name);
    newHTML = newHTML.replace('%tools%', this.tools);
    newHTML = newHTML.replace('%link%', this.link);

    document.querySelector('.projectContainer').insertAdjacentHTML('afterbegin', newHTML);
    var id = 'tools' + this.num;
    displayTools(this.tools, id);


}

var displayTools = function(tools, id) {
    tools.forEach(function(curr, i, array) {
        var tool = '<div class="tool">' + curr + '</div>';
        document.querySelector('.'+ id).insertAdjacentHTML('beforeend', tool);
    })
}

var project1 = new Project(1, 'My Basketball Career', ['HTML & CSS', 'JS'], 'basketball.html' );

var project2 = new Project(2, 'Hangman Style', ['HTML & CSS', 'Java'], '#');

var project3 = new Project(3, 'Snake Classic Game', ['HTML & CSS', 'JS'], '#');

var project4 = new Project(4, 'The Guessing Game', ['HTML & CSS', 'JS'], 'guessinggame.html');

var project5 = new Project(5, 'Dice It Up', ['HTML & CSS', 'JS'], 'dice_it_up.html');

var project6 = new Project(6, 'Countries I have Travelled To', ['HTML & CSS', 'JS', 'D3'], 'travel.html');




project1.displayProject();

project2.displayProject();

project3.displayProject();

project4.displayProject();

project5.displayProject();

project6.displayProject();

function blowPic(e, flag) {
    var el = e.parentNode.firstChild;
    if(flag) {
        el.style.transform = 'scale(1.05)';
    } else {
        el.style.transform = 'scale(1)';
    }
}


var TxtType = function(el, toRotate, period) {
    this.el = el;
    this.toRotate = toRotate;
    this.period = period;
    this.loopNum = 0;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i]; //set full text to string in data text
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1); //deletes char from end --> loop until all is deleted
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1) //if not deleting, add a char from the string until finishe
    }
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>'; //set text to dataset strings
    var that = this;
    var delta = 90; //200 - Math.random() * 100
    if(this.isDeleting) {
        delta /= 2; //deletes at twice the speed it shows
    }
    if(!this.isDeleting && this.txt === fullTxt) {
        delta = this.period; //if text is not deleting, show at 2000ms
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt == '') {
        this.isDeleting = false; //if text is empty stop deleting
        this.loopNum++;
        delta = 500;
    }
    setTimeout(function(){that.tick();}, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    css.type = 'text/css';
    css.innerHTML = ".typewrite > .wrap {border-right: 0.08em solid black}";
    document.body.appendChild(css);
}

function onIconHover(name, icon, color) {
    let lineFill = document.getElementById(name);
    lineFill.style.fill = color;
    let fillColor = document.getElementById(icon);
    fillColor.style.fill = color
}

function offIconHover(name, icon) {
    let lineOG = document.getElementById(name);
    lineOG.style.fill = "#cccccc";
    let fillOG = document.getElementById(icon);
    fillOG.style.fill = "black";
}