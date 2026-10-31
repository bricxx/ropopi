document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-perfil");
    const btnAbrir = document.getElementById("btn-abrir-modal");
    const btnFechar = document.getElementById("btn-fechar-modal");
    const form = document.getElementById("form-perfil");
    const container = document.querySelector(".container");

    // Abrir e fechar Modal
    btnAbrir.addEventListener("click", () => modal.style.display = "flex");
    btnFechar.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Função para renderizar um novo cartão
    function criarCartao(nome, fotoBase64, status, cor) {
        const article = document.createElement("article");
        article.className = `card-pessoa ${cor}`;

        article.innerHTML = `
            <h2>${nome}</h2>
            <img src="${fotoBase64}" alt="foto do ${nome}" class="foto-perfil">
            <p class="status">${status}</p>
            <button class="btn-perfil">Status</button>
        `;

        // Insere o novo cartão antes do botão de adicionar (+)
        container.insertBefore(article, btnAbrir);
    }

    // Carregar perfis salvos anteriormente
    const perfisSalvos = JSON.parse(localStorage.getItem("meusPerfis")) || [];
    perfisSalvos.forEach(p => criarCartao(p.nome, p.foto, p.status, p.cor));

    // Evento ao enviar o formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const status = document.getElementById("status").value;
        const cor = document.getElementById("cor").value;
        const fotoInput = document.getElementById("foto").files[0];

        if (fotoInput) {
            const reader = new FileReader();

            // Lê o ficheiro da imagem e converte para usar no navegador
            reader.onload = function (event) {
                const fotoBase64 = event.target.result;

                // Adiciona o cartão na página
                criarCartao(nome, fotoBase64, status, cor);

                // Salva no localStorage
                perfisSalvos.push({ nome, foto: fotoBase64, status, cor });
                localStorage.setItem("meusPerfis", JSON.stringify(perfisSalvos));

                // Reseta formulário e fecha o modal
                form.reset();
                modal.style.display = "none";
            };

            reader.readAsDataURL(fotoInput);
        }
    });
});