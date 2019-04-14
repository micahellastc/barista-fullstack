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
    console.log("name variable is", this.getAttribute("data-name"))
    console.log("order variable", this.getAttribute("data-order"))
    fetch('/completedOrder',{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': this.getAttribute("data-name"),
        'order': this.getAttribute("data-item")
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
