const products = [
   { id: 1, name: "Produto A", price: 50.00 },
   { id: 2, name: "Produto B", price: 30.00 },
];
let cart = [];
function renderProducts() {
   const productContainer = document.getElementById("products");
   productContainer.innerHTML = "";
   cart.forEach((item, index) => {
       productContainer.innerHTML += `
           <div class="product">
               <span>${item.name}</span>
               <span>R$ ${item.price.toFixed(2)}</span>
               <button onclick="removeFromCart(${index})">Remover</button>
           </div>`;
   });
   updateTotal();
}
function addToCart(productId) {
   const product = products.find(p => p.id === productId);
   cart.push(product);
   renderProducts();
}
function removeFromCart(index) {
   cart.splice(index, 1);
   renderProducts();
}
function updateTotal() {
   const total = cart.reduce((sum, item) => sum + item.price, 0);
   document.getElementById("total").innerText = total.toFixed(2);
}
function finalizarCompra() {
   alert("Compra finalizada!");
}
// Adicionando produtos ao carrinho como exemplo
addToCart(1);
addToCart(2);