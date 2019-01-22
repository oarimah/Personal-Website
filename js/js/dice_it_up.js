window.onload = function() {
    Prompt.render('Enter your name: ', 'doStuff');
}

var names = [];
var maxScore;

function doStuff(val1, val2, val3) {
    var p1 = document.getElementById('name-0');
    var p2 = document.getElementById('name-1');
    if(val3 == '') {
        maxScore = 25;
    } else {
        maxScore = val3;
    }
    document.querySelector('.text').innerHTML = '<p>In each round, you can roll a dice as many times as you want BUT you roll a 1, you lose all your scores and your turn ends. You can choose to \'Switch PLayer\' to add the round score to your total score. The first player to reach a total score of ' + maxScore + ' wins!</p>';

    nameCheck(p1, val1, 'Player 1');
    nameCheck(p2, val2, 'Player 2');
} //collects names, sets default values if empty

function nameCheck(select, input, fallback) {
    if(input == '') {
        select.textContent = fallback;
    } else {
        select.textContent = input;
    }

    names.push(select.textContent);
} //checks if name is valid

var scores, roundScore, activePlayer, gamePlaying;

init(); //initialize game variables

document.querySelector('.btn-how').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});

window.onclick = function(event) {
    if(event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
    }
}

document.querySelector('.btn-roll').addEventListener('click', function() {
    document.querySelector('.btn-how').style.display = 'none';
    if(gamePlaying) {
        // 1.random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'images/dice-' + dice + '.png';

        //3. update the round score if the rolled number was not a 1
        if (dice !== 1) {
            //add score
            roundScore = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //selects first element with the name and changes value in score to dice

        } else {
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

            nextPlayer();

        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the ui

        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

        //check if player won the game

        if (scores[activePlayer] >= maxScore) {
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('#name-'+activePlayer).textContent = "Winner!";
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;

        } else {
            //next player
            nextPlayer();
        }
    }

});

function nextPlayer() {
    //next player and set current scores to 0 and global scores

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); //remove active from class list
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none'; //remove dice

}

document.querySelector('.btn-new').addEventListener('click', function() {
    init();
    document.querySelector('.btn-how').style.display = 'block';

}); //when someone hits, call this function instead of call immediately

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('#name-0').textContent = names[0];
    document.querySelector('#name-1').textContent = names[1];


    document.querySelector('.dice').style.display = 'none';


    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');   //otherwise will add 2 active classes


}; //set and reset to the beginning values

var Prompt = new CustomPrompt();

//customize prompt box
function CustomPrompt(){
    this.render = function(dialog,func){
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.top = (winH/2) - (550 * .5)+"px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Enter Player's Names and Max Score ";
        document.getElementById('dialogboxbody').innerHTML += '<br><input placeholder="Player 1"  maxlength="9" id="prompt_value1">';
        document.getElementById('dialogboxbody').innerHTML += '<br><input placeholder="Player 2" maxlength="9" id="prompt_value2">';
        document.getElementById('dialogboxbody').innerHTML += '<br><input placeholder="Winning score (Default is 25)" maxlength="9" pattern="[0,9]{9}" id="prompt_value3">';

        document.getElementById('dialogboxfoot').innerHTML = '<button id="btn-ok" onclick="Prompt.ok(\''+func+'\')">OK</button>';
    }

    function handleInvalidInput(warning, location) {
        while(invalid) {
            var para = document.createElement('p');
            var text = document.createTextNode(warning);
            para.appendChild(text);
            para.style.color = 'red';
            var parent = document.getElementById(location);
            parent.parentNode.insertBefore(para, parent.nextSibling);
            invalid = false;
        }
    }

    var invalid = true;

    this.ok = function(func){
        if(isNaN(document.getElementById('prompt_value3').value))  {
            handleInvalidInput('Invalid: Please enter an integer value', 'prompt_value3');
        } else {
            var prompt_value1 = document.getElementById('prompt_value1').value;
            var prompt_value2 = document.getElementById('prompt_value2').value;
            var prompt_value3 = document.getElementById('prompt_value3').value;
            window[func](prompt_value1, prompt_value2, prompt_value3);
            document.getElementById('dialogbox').style.display = "none";
            document.getElementById('dialogoverlay').style.display = "none";
        }
    } //exits and collects data if ok is pressed

    document.getElementById('dialogboxbody').addEventListener('keyup', function(event) {
        event.preventDefault();
        if(event.keyCode === 13) {
            document.querySelector('#btn-ok').click();
        }
    }); //exit and collects data if enter key is pressed
}
