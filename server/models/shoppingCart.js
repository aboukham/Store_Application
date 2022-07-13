const product = require("./product");

let myShoppingCart = [
  
];

let counter = 1;

function getShoppingCart() {
  return myShoppingCart;
}

function addToMyShoppingCart(id) {
  const index = myShoppingCart.findIndex(prod => prod.id == id);
  if(index>-1){
    alert("This product was already in your cart you can only modify the quantity")
  }else{
    console.log(id , product.getAllProducts() )
    let cartItem = product.getAllProducts().filter(prod => prod.id == id)
                                     .map(prod => {
                                        let obj = {};
                                        obj.id = counter;
                                        obj.name = `${prod.name}`,
                                        obj.price = prod.price;
                                        obj.quantity = 1;
                                        obj.total = obj.quantity * obj.price;
                                        return obj;          
       
                                   });

          console.log("cartItem: " ,cartItem);
          counter++;
          myShoppingCart.push(cartItem[0]);
        }
    
}

function deleteFromMyShoppingCart(id) {
  myShoppingCart = myShoppingCart.filter(prod=>prod.id!=id);
}

function computeTotalPrice(){
  var total = 0;
  for (item in myShoppingCart){
    total += item.price;
  }
  return total;
}

function editQuantity(id, sign){
  let item = myShoppingCart.filter(item => item.id == id)
  let prod = product.getAllProducts.filter(p => p.id == id)
  console.log(item.quantity);
  if (prod.stock < 1 || prod.stock <= item.quantity){
    alert("sorry the stock is empty, try another time")
  }else{
      if (sign == '+'){
        item.quantity++;
      }else{
        item.quantity--;
      }
    }

}

function editStock(){
  let prods = product.getAllProducts();
  let i;
  for (i = 0; i < prods.length; i++){
    let j;
    for (j = 0; j < myShoppingCart.length; j++){
      if (prods[i].id == myShoppingCart[j].id){
        prods[i].stock -= myShoppingCart[j].quantity;
        break;
      }

    }
    
  }
}

console.log(myShoppingCart);

module.exports = { getShoppingCart, addToMyShoppingCart, deleteFromMyShoppingCart, computeTotalPrice, editQuantity, editStock };
