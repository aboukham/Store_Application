
window.addEventListener("load", function () {
    if (sessionStorage.getItem("usersession")) {
        document.getElementById("products").style.display = "block";
        document.getElementById("logout").style.display ="flex";
        document.getElementById("welcome").style.display = "none";
        document.getElementById("username-pass-login").style.display ="none";
        getAllProduct();
        getMyShoppingCart();
    } else {
        document.getElementById("products").style.display = "none";
        document.getElementById("logout").style.display ="none";
        document.getElementById("welcome").style.display = "block";
        document.getElementById("username-pass-login").style.display ="flex";
    }
});


async function login() {
    document.getElementById("error").innerText = "";
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username != "" && password != "") {
        let res = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json());
        console.log(res);

        if (res.message) {
            document.getElementById("error").innerText = res.message;
        } else {
            getAllProduct();
            getMyShoppingCart();
            sessionStorage.setItem("usersession", res.token);
            document.getElementById("products").style.display = "block";
            document.getElementById("logout").style.display ="flex";
            document.getElementById("welcome").style.display = "none";
            document.getElementById("username-pass-login").style.display ="none";
        }
    }
}

async function getAllProduct() {
    document.getElementById("error").innerText = "";

    products = await fetch("http://localhost:3000/products/", {
        method: "GET"
    }).then(res => res.json());

    for (let product of products) {
        addProductToTable(product.id, product.name, product.price, product.image, product.stock, product.actions);
    }
}
async function addProductToShoppingCart(prodId) {
    await fetch("http://localhost:3000/shoppingCartItems/" + prodId, {
        method: "POST",
        
    }).then(res => {
        getMyShoppingCart();
        
    });
}

async function deleteProductFromCart(prodId) {
    await fetch("http://localhost:3000/shoppingCartItems/" + prodId, {
        method: "DELETE"
    }).then(res => {
        getMyShoppingCart();
        return res.json();
    });
}
async function getMyShoppingCart() {
    
    let myShoppingCart = await fetch("http://localhost:3000/shoppingCartItems/", {
        method: "GET"
    }).then(res => res.json());
    var pl = document.getElementById("cart");
    pl.innerHTML =`<tr> <td>total: $${computeTotalPrice()}<td> </tr>`;
    
    for (let product of myShoppingCart) {
        await addRowToShoppingCart(product.id, product.name, product.price, product.total, product.quantity);
    }
}

async function addProductToTable(id, name, price, image, stock, actions) {
    var table = document.getElementById("tableOfProducts");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = price;
    row.insertCell(2).innerHTML = `<img src="../server/Ressource/`+ image + `" style="width: 100px">`
    row.insertCell(3).innerHTML = stock;
    row.insertCell(4).innerHTML = 
        `<button class="btn btn-warning" onclick="addProductToShoppingCart(${id})" >${actions}</button>`;
}

async function addRowToShoppingCart(id, name, price, total, quantity) {
    var table = document.getElementById("cart");
    console.log("id: ", id)
    var rowCount = table.rows.length;
    rowCount = (rowCount === 0)? rowCount : rowCount - 1;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = name;
   row.insertCell(1).innerHTML = price;
    row.insertCell(2).innerHTML = total;

    row.insertCell(3).innerHTML =
        `<button class="btn btn-danger" onclick="addQuantity(${id}, ${quantity + 1})" style="margin-right:50px" > + 
        </button><span style="border:2px solid black"> ${quantity} </span><button class="btn btn-info" 
        onclick="substractQuantity(${id}, ${quantity - 1})" >- </button>`;
    var row1 = table.insertRow(rowCount + 1);
   // row1.insertCell(0).innerHTML = `<p> total: ${computeTotalPrice(price)} </p>`;

}

function logout() {
    sessionStorage.removeItem("usersession");
    document.getElementById("products").style.display = "none";
    document.getElementById("logout").style.display ="none";
    document.getElementById("welcome").style.display = "block";
    document.getElementById("username-pass-login").style.display ="flex";
    
}

async function computeTotalPrice(){
    return await fetch("http://localhost:3000/shoppingCartItems/total", {
        method: "GET"
    }).then(res => {
        res.json();
    })
}

async function addQuantity(id, quantity){
    await fetch("http://localhost:3000/shoppingCartItems/" + id + "/+", {
        method: "PUT"
    }).then(res => res.json());
    //var pl = document.getElementById("cart");
    //pl.innerHTML =`<tr> <td>total: $${computeTotalPrice()}<td> </tr>`;

}

async function substractQuantity(id, quantity){
    await fetch("http://localhost:3000/shoppingCartItems/" + id + "/-", {
        method: "PUT"
    }).then(res => res.json());
}

async function placeOrder(){
    await fetch("http://localhost:3000/shoppingCartItems/ ", {
        method: "PUT"
    }).then(res => res.json());
    alert("order placed");
}
