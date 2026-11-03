document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-perfil");
    const btnAbrir = document.getElementById("btn-abrir-modal");
    const btnFechar = document.getElementById("btn-fechar-modal");
    const form = document.getElementById("form-perfil");
    const container = document.querySelector(".container");

    if (btnAbrir) btnAbrir.addEventListener("click", () => modal.style.display = "flex");
    if (btnFechar) btnFechar.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const missao = document.getElementById("missao").value;
            const sobre = document.getElementById("sobre").value;
            const cor = document.getElementById("cor").value;
            const fotoInput = document.getElementById("foto");

            if (fotoInput.files && fotoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const fotoUrl = event.target.result;

                    const novoCard = document.createElement("article");
                    novoCard.className = `card-pessoa ${cor}`;
                    
                    novoCard.innerHTML = `
                        <h1 class="teste">${nome}</h1>
                        <img src="${fotoUrl}" alt="${nome}" class="foto-perfil" />
                        <p class="bio">${sobre}</p>
                        <button class="btn-perfil btn-status-dinamico">Status</button>
                    `;

                    // Botão Status padrão
                    const btnStatus = novoCard.querySelector(".btn-status-dinamico");
                    btnStatus.addEventListener("click", () => {
                        abrirModalStatus(nome, missao, sobre, fotoUrl);
                    });

                    // Coloca antes do botão de Adicionar (+)
                    container.insertBefore(novoCard, btnAbrir);

                    form.reset();
                    modal.style.display = "none";
                };
                reader.readAsDataURL(fotoInput.files[0]);
            }
        });
    }

    function abrirModalStatus(nome, missao, sobre, fotoUrl) {
        let modalDetalhes = document.getElementById("modal-status-dinamico");
        
        if (!modalDetalhes) {
            modalDetalhes = document.createElement("div");
            modalDetalhes.id = "modal-status-dinamico";
            modalDetalhes.className = "modal";
            document.body.appendChild(modalDetalhes);
        }

        modalDetalhes.innerHTML = `
            <div class="modal-conteudo" style="text-align: center; max-width: 400px; padding: 25px;">
                <span class="fechar-modal" onclick="document.getElementById('modal-status-dinamico').style.display='none'">&times;</span>
                <img src="${fotoUrl}" alt="${nome}" class="foto-perfil" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;">
                <h1>${nome}</h1>
                <div style="background-color: #1e1e1e; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: left;">
                    <h3 style="margin-top: 0; color: #8a2be2;">Missão</h3>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.5;">${missao}</p>
                    <h3 style="color: #8a2be2; margin-top: 15px;">Sobre mim</h3>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.5;">${sobre}</p>
                </div>
                <button class="btn-perfil" onclick="document.getElementById('modal-status-dinamico').style.display='none'">Fechar</button>
            </div>
        `;

        modalDetalhes.style.display = "flex";
    }
});