const produtos = [
  { nome: "Netflix R$ 150", preco: "149,99" },
  { nome: "Netflix R$ 250", preco: "249,99" },
  { nome: "Netflix R$ 120", preco: "119,99" },
  { nome: "Netflix R$ 100", preco: "99,99" },
  { nome: "Netflix R$ 90", preco: "89,99" },
  { nome: "Netflix R$ 70", preco: "69,99" }
];

const container = document.getElementById("products");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");

let selecionado = produtos[0];

// GERAR PRODUTOS
produtos.forEach((p, index) => {
  const div = document.createElement("div");
  div.classList.add("card");
  if(index === 0) div.classList.add("active");

  div.innerHTML = `
    <img src="https://lojadosgifts.com.br/images/products/netflix-categoria-c6d0b91236b7f980.webp">
    <div>
      <p>${p.nome}</p>
      <span class="price">R$ ${p.preco}</span>
    </div>
  `;

  div.onclick = () => {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    div.classList.add("active");

    selecionado = p;
    productName.innerText = p.nome;
    productPrice.innerText = "R$ " + p.preco;
  };

  container.appendChild(div);
});

// BOTÃO COMPRAR (WHATSAPP)
document.getElementById("buyBtn").onclick = () => {
  const msg = `Quero comprar ${selecionado.nome} por R$ ${selecionado.preco}`;
  window.open(`https://wa.me/SEUNUMERO?text=${encodeURIComponent(msg)}`);
};