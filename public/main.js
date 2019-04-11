//declare variable for placedBet, used in function to grab user's bet
//declare variable for win to use in other functions
//declare variable for wins counter
//declare variable for loss counter
let placedBet=0
let win;
let wins=0;
let losses=0;
let resMsg = document.querySelector('.result');
let userBank = document.querySelector('.userBank');
let color= document.querySelector('.colors');

document.getElementById('betClick').addEventListener('click', function() {
  // takes an amount as bet
  placedBet = document.querySelector('#placedBet').value;
  if(placedBet > 6666){
    alert('Your bet must be lower than $6,666')
  }
  randNum()
})

//Code for random number generator (core part of game) & win comparisan
function randNum (){
  let num = Math.floor(Math.random()*13)

//formula to compare users guess to game result
  compare(num)
  // win/loss message generated
  if(win===true){
    //if user wins, bet is multiplied to give reward
    placedBet *= 5
    //wins counter increased
    wins+=1;
    resMsg.innerText="Congratulations, you win! But dont't get used to it, loser";
    //user bank changed
    userBank.innerText= parseInt(userBank.innerText) + placedBet
  }else if(win===false){
    //loss counter increased
    placedBet=document.querySelector('#placedBet').value
    losses+=1
    resMsg.innerText="Ha! You lose. Yo money's miiiine";
    //user bank changed
    userBank.innerText= parseInt(userBank.innerText) - placedBet
  }
  fetch('result', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'profit': parseInt(placedBet),
        'wins': parseInt(wins),
        'losses': parseInt(losses)
      })
    })
    .then(response => {
     if (response.ok) return response.json();
   })
   .then(data => {
     console.log(data)
   });
 }

function compare(num){
// takes input of color from a drop down as the bet and compares to generated number
  if((num===0)&&(color.value==="Red")){
    win = true
  }else if((num%2===0)&&(color.value==="Black")){
    win = true
  }else if((num%2!==0)&&(color.value==="Green")){
    win = true
  }else{
    win = false
  }
}
