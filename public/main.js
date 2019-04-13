const orderSize = document.querySelectorAll('.size');
const orderFlavor = document.querySelectorAll('.flavor');
const orderName = document.querySelector('.userName');
const submitOrder = document.querySelector('.submit');
// console.log(ordeName)
var sizeValue = ""
var flavorValue = ""


Array.from(orderSize).forEach(function (element) {
      element.addEventListener('click', function(){
        if(element.checked){
          sizeValue = element.value
        }
      //   // var for Size
      //   // var for flavor
      //   // add those two vars and make them equal to itemOrder
      //   // OR
      //   // var that is equal to size + flavor
      //   // grab value for size add the value for order set that equal to orderItem
      //   // orderName equal to input value
      //   const  = this.parentNode.parentNode.childNodes[1].innerText
      //   const  = this.parentNode.parentNode.childNodes[3].innerText
      //   const  = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)

      //   })
      //   .then(response => {
      //     if (response.ok) return response.json()
      //   })
      //   .then(data => {
      //     console.log(data)
      //     window.location.reload(true)
      //   })
      });
});

Array.from(orderFlavor).forEach(function (element) {
      element.addEventListener('click', function(){
        if(element.checked){
          flavorValue = element.value
        }
      //   // var for Size
      //   // var for flavor
      //   // add those two vars and make them equal to itemOrder
      //   // OR
      //   // var that is equal to size + flavor
      //   // grab value for size add the value for order set that equal to orderItem
      //   // orderName equal to input value
      //   const  = this.parentNode.parentNode.childNodes[1].innerText
      //   const  = this.parentNode.parentNode.childNodes[3].innerText
      //   const  = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
      //   fetch('', {
      //     method: 'post',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({
      //       'orderItem': size,
      //       'orderName': orderName
      //     })
      //   })
        // .then(response => {
        //   if (response.ok) return response.json()
        // })
        // .then(data => {
        //   console.log(data)
        //   window.location.reload(true)
        // })
      });
});
submitOrder.addEventListener('click', function(){
  let orderNameValue = ""
  orderNameValue = orderName.value
  console.log(orderNameValue)
  console.log(sizeValue)
  console.log(flavorValue)
  fetch('/submitOrder',{
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'orderItem': sizeValue,
      'orderName': orderNameValue,
      'flavorValue': flavorValue
    })
    .then(response => {
      console.log(response)
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
});
})
