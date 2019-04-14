const orderSize = document.querySelectorAll('.size');
const orderFlavor = document.querySelectorAll('.flavor');
const orderName = document.querySelector('.userName');
const submitOrder = document.querySelector('.submit');
const completeBtn = document.querySelectorAll('.complete');
// console.log(ordeName)
var sizeValue = ""
var flavorValue = ""


Array.from(orderSize).forEach(function (element) {
  element.addEventListener('click', function(){
    if(element.checked){
      sizeValue = element.value
    }
  });
});

Array.from(orderFlavor).forEach(function (element) {
  element.addEventListener('click', function(){
    if(element.checked){
      flavorValue = element.value
    }
  });
});

Array.from(completeBtn).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.getAttribute("data-name");
    const order = this.getAttribute("data-order");
// with time, add randomizer that changes the person's name, making it mispronounce each time
    console.log("name variable is", name)
    console.log("order variable", order)
    var speak = new SpeechSynthesisUtterance(`Hey ${name}, come get your ${order}`);
     window.speechSynthesis.speak(speak);
    fetch('/completedOrder',{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'order': order
      })
      // .then(response => {
      //   console.log(response)
      //   if (response.ok) return response.json()
      // })
      // .then(data => {
      //   console.log(data)
      //   // window.location.reload(true)
      // })
    });
  });
})

  // submitOrder.addEventListener('click', function(){
  //   let orderNameValue = ""
  //   orderNameValue = orderName.value
  //   console.log(orderNameValue)
  //   console.log(sizeValue)
  //   console.log(flavorValue)
  //   fetch('/submitOrder',{
  //     method: 'post',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       'orderItem': sizeValue,
  //       'orderName': orderNameValue,
  //       'flavorValue': flavorValue
  //     })
  //     .then(response => {
  //       console.log(response)
  //       if (response.ok) return response.json()
  //     })
  //     .then(data => {
  //       console.log(data)
  //       window.location.reload(true)
  //     })
  // });
  // })
