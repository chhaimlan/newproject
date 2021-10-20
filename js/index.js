//challeng 1
function ageInDays(){
    var birthYear = prompt('What year were you born?');
    var ageInDayss = (2021 - birthYear);
    //calulate day  *365
   
    var h1 = document.createElement('h1');
    var textAnwser = document.createTextNode('You are ' + ageInDayss + ' Days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnwser);   
    document.getElementById('flex-box-result').appendChild(h1);
    
}

function Reset(){
    document.getElementById('ageInDays').remove();
}

//challeng 2
function generatecate(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//challeng 3

function rpsGame(yourChoice){   
   var humanChoice, botChoice;
   humanChoice =  yourChoice.id;
   botChoice = numberToChoice(randToRpsInt());
  console.log('computer choice', botChoice);
   results = decideWinner(humanChoice,botChoice);
   console.log(results);
   message = finalMessage(results);
   console.log(message);
  rpsFrontEnd(yourChoice.id,botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number]
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock':{'scissors': 1, 'rock': 0.5, 'paper':0},
        'paper':{'rock': 1, 'paper': 0.5, 'scissors':0},
        'scissors':{'paper': 1, 'scissors': 0.5, 'rock': 0} 
    }
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore,computerScore]){
    if(yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    }else if(yourScore === 0.5){
        return {'message': 'You tied!', 'color': 'yellow'};        
    }else{
        return{'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
     var imagesDatabase ={
         'rock':document.getElementById('rock').src,
         'paper': document.getElementById('paper').src,
         'scissors': document.getElementById('scissors').src
     }
    //let's remove all 

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

     var humanDiv = document.createElement('div');
     var botDiv = document.createElement('div');
     var messageDiv = document.createElement('div');

     humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);' >"
     messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
     botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);' >"


     document.getElementById('flex-box-rps-div').appendChild(humanDiv);
     document.getElementById('flex-box-rps-div').appendChild(messageDiv);
     document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//challeng 4 change color of all

var allbutton = document.getElementsByTagName('button');



var copyallbutton = [];
for(var i = 0; i < allbutton.length; i++){
    copyallbutton.push(allbutton[i].classList[1]);
}

function btnchangecolor(buttonThingy){
    if(buttonThingy.value === 'red'){
        buttonRed();
    }else if(buttonThingy.value === 'green'){
        buttonGreen();
    }else if(buttonThingy.value === 'reset'){
        buttonReset();
    }else if(buttonThingy.value === 'random'){
        randomButton();
    }
}
function buttonRed(){
    for(let i = 0; i < allbutton.length; i++){
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add('btn-danger');
    }
}
function buttonGreen(){
    for(let i = 0; i < allbutton.length; i++){
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add('btn-success');
    }
}

function buttonReset(){
    for(let i = 0; i < allbutton.length; i++){
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add(copyallbutton[i]);
    }
}
function randomButton(){
    var choices = ['btn-primary','btn-success','btn-warning','btn-danger']
    for(let i = 0 ; i < allbutton.length; i++){
        var randomNumber = Math.floor(Math.random() * 4);
        allbutton[i].classList.remove(allbutton[i].classList[1]);
        allbutton[i].classList.add(choices[randomNumber]);
    }
}

//challeng 5 blackjack

let blackjackGame = {
    'you':{'scoreSpan': '#your-blackjack-result','div':'#your-box', 'score':0},
    'dealer':{'scoreSpan': '#dealer-blackjack-result','div':'#dealer-box', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'J': 10,'Q': 10,'K': 10,'A':[1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
//const hitSound = new Audio('newprojec/sound');
// const winsound = new Audio();
// const lostsound = new Audio();


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackhit(){
    if(blackjackGame['isStand'] === false){
    let card = randomCard();   
   showCard(card, YOU);
   updateScore(card,YOU);
   showScore(YOU);
  
  }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}




function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `newproject/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    //hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;

    // let winner = computeWinner();
    // showResult(winner);
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }

    for(i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color ='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color ='#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';
     blackjackGame['turnsOver'] = true;
   }
}

function updateScore(card, activePlayer){
    if(card === 'A'){
    //if adding 11 keep me below 21add 11
    if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }else{
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}
function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}
function sleep(ms){
    return new Promise(re => setTimeout(re,ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
 }
  
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
   
    
}


//compute winner

function computeWinner(){
    let winner;
    if(YOU['score'] <= 21){
        //condition highter score
        if(YOU['score'] > DEALER['score'] ||(DEALER['score'] > 21)){
          blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
        //condition when user bust
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
      blackjackGame['losses']++;
        winner = DEALER;
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message, messageColor;
    if(blackjackGame['turnsOver'] === true){
    if(winner === YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!'
        messageColor ='green';
    }else if(winner === DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You lost!';
        messageColor = 'red';
    }else{
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You draws!';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}