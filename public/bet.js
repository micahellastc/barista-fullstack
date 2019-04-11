// <input id="placedBet" type="text" value="">
// </input>
// <button type="button">Place bet</button>


// takes input of color from a drop down as the bet
// takes an amount as bet
// random number between 0 and 13
// multiply number by another number to generate a reward when user wins
// if number is even:color is black odd is green 0 is red
// if ser guessed right color, user wins, other wise loses
// win/loss message generated
// user bank changed
// request to change owner bank sent

document.querySelector('#placedBet').addEventListener('click', () => {
  let placedBet = document.querySelector('#placedBet').value

  if(placedBet > 666){
    alert('You reached the highest bet limit.')
  }
})
