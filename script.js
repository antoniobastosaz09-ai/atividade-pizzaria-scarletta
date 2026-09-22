document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pizzaForm");
    const pagamentoSelect = document.getElementById("pagamento");
    const trocoGroup = document.getElementById("trocoGroup");

    // Mostra ou oculta o campo de troco com base na forma de pagamento selecionada
    pagamentoSelect.addEventListener("change", (e) => {
        if (e.target.value === "Dinheiro") {
            trocoGroup.style.display = "block";
            document.getElementById("troco").setAttribute("required", "true");
        } else {
            trocoGroup.style.display = "none";
            document.getElementById("troco").removeAttribute("required");
            document.getElementById("troco").value = "";
        }
    });

    // Ação ao enviar o formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Captura dos valores
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        
        const tamanho = document.getElementById("tamanho").value;
        const sabor1 = document.getElementById("sabor1").value;
        const sabor2 = document.getElementById("sabor2").value;
        
        // Coleta bordas selecionadas
        let bordas = [];
        if (document.getElementById("bordaCatupiry").checked) bordas.push("Catupiry");
        if (document.getElementById("bordaCheddar").checked) bordas.push("Cheddar");
        const bordaTexto = bordas.length > 0 ? bordas.join(", ") : "Nenhuma";

        const bebida = document.getElementById("bebida").value;
        const pagamento = document.getElementById("pagamento").value;
        const troco = document.getElementById("troco").value;
        const observacoes = document.getElementById("observacoes").value;

        // Monta a mensagem para o WhatsApp
        let mensagem = `𝕸𝖆𝖋𝖎𝖆 NOVO PEDIDO - Scarletta* 𝕸𝖆𝖋𝖎𝖆\n`;
        mensagem += `*1. Dados do Cliente:*\n`;
        mensagem += `- Nome: ${nome}\n`;
        mensagem += `- Telefone: ${telefone}\n`;
        mensagem += `- Endereço: ${endereco}\n\n`;

        mensagem += `*2. Detalhes da Pizza:*\n`;
        mensagem += `- Tamanho: ${tamanho}\n`;
        mensagem += `- Sabor(es): ${sabor1}${sabor2 ? ' e ' + sabor2 : ''}\n`;
        mensagem += `- Borda: ${bordaTexto}\n\n`;

        mensagem += `*3. Adicionais e Pagamento:*\n`;
        mensagem += `- Bebida: ${bebida}\n`;
        mensagem += `- Pagamento: ${pagamento}\n`;
        if (pagamento === "Dinheiro" && troco) {
            mensagem += `- Troco para: ${troco}\n`;
        }

        if (observacoes) {
            mensagem += `\n*Observações:* ${observacoes}\n`;
        }

        // Substitua pelo número de WhatsApp da pizzaria (com DDI e DDD, ex: 5511999999999)
        const numeroWhatsApp = "5511999999999"; 

        // Codifica a mensagem para URL
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        // Abre o WhatsApp com o pedido pronto
        window.open(urlWhatsApp, "_blank");
    });
});