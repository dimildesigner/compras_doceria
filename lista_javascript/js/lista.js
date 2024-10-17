const produtos = [
    { nome: "Bombom", preco: 30, estoque: 5 },
    { nome: "Chocolate", preco: 20, estoque: 3 },
    { nome: "Bala", preco: 50, estoque: 10 },
    { nome: "Biscoito", preco: 15, estoque: 2 },
    { nome: "Salgadinho", preco: 40, estoque: 8 }
];

const carrinho = [];

function exibirProdutos() {
    const produtosDiv = document.getElementById("produtos");
    produtosDiv.innerHTML = '';

    produtos.forEach((produto, index) => {
        if (produto.estoque > 0) {
            const produtoDiv = document.createElement("div");
            produtoDiv.className = "produto";
            produtoDiv.innerHTML = `
                <strong>${produto.nome}</strong> - R$ ${produto.preco} - Estoque: ${produto.estoque}
                <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
            `;
            produtosDiv.appendChild(produtoDiv);
        }
    });
}

function adicionarAoCarrinho(index) {
    if (produtos[index].estoque > 0) {
        carrinho.push(produtos[index]);
        produtos[index].estoque--;
        exibirCarrinho();
        exibirProdutos();
    } else {
        alert("Produto fora de estoque!");
    }
}

function removerDoCarrinho(index) {
    const produtoRemovido = carrinho.splice(index, 1)[0];
    if (produtoRemovido) {
        const produtoOriginal = produtos.find(p => p.nome === produtoRemovido.nome);
        produtoOriginal.estoque++;
        exibirCarrinho();
        exibirProdutos();
    }
}

function exibirCarrinho() {
    const carrinhoDiv = document.getElementById("carrinho");
    carrinhoDiv.innerHTML = '';

    carrinho.forEach((produto, index) => {
        const produtoDiv = document.createElement("div");
        produtoDiv.className = "carrinho";
        produtoDiv.innerHTML = `
            <strong>${produto.nome}</strong> - R$ ${produto.preco}
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        carrinhoDiv.appendChild(produtoDiv);
    });

    const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
    document.getElementById("total").innerText = `Total: R$ ${total}`;
}

document.getElementById("ordenar").addEventListener("click", () => {
    carrinho.sort((a, b) => a.preco - b.preco);
    exibirCarrinho();
});

exibirProdutos();