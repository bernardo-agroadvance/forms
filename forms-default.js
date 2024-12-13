(function() {
  const formHtml = `
    <form id="form-produto-123" onsubmit="handleSubmit(event)">
      <label for="nome">Nome Completo</label>
      <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required>
      
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required>
      
      <label for="telefone">WhatsApp</label>
      <input type="tel" id="telefone" name="telefone" placeholder="Digite seu número de WhatsApp" required>
      
      <label for="cargo">Cargo</label>
      <select id="cargo" name="cargo" required>
        <option value="">Selecione seu cargo</option>
        <option value="gerente">Gerente</option>
        <option value="analista">Analista</option>
        <option value="coordenador">Coordenador</option>
        <option value="outro">Outro</option>
      </select>
      
      <label for="superior">Possui superior completo?</label>
      <select id="superior" name="superior" required>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </select>
      
      <!-- Campos ocultos para dados avançados -->
      <input type="hidden" name="utm_source" id="utm_source" class="hidden-field">
      <input type="hidden" name="utm_medium" id="utm_medium" class="hidden-field">
      <input type="hidden" name="utm_campaign" id="utm_campaign" class="hidden-field">
      <input type="hidden" name="ip_address" id="ip_address" class="hidden-field">
    
      <button type="submit" id="submit-form-123">Garanta sua vaga</button>
    </form>
  `;

  // Adicionar o formulário dinamicamente no elemento alvo
  const targetElement = document.querySelector('#form-container');
  if (targetElement) {
    targetElement.innerHTML = formHtml;

    // Adicionar lógica de envio
    document.addEventListener("DOMContentLoaded", function() {
      const urlParams = new URLSearchParams(window.location.search);
      document.getElementById("utm_source").value = urlParams.get("utm_source") || "";
      document.getElementById("utm_medium").value = urlParams.get("utm_medium") || "";
      document.getElementById("utm_campaign").value = urlParams.get("utm_campaign") || "";

      fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => document.getElementById("ip_address").value = data.ip);
    });

    window.handleSubmit = function(event) {
      event.preventDefault();
      const form = document.getElementById("form-produto-123");
      const formData = new FormData(form);
      const webhookUrl = "SUA_URL_DO_WEBHOOK";

      fetch(webhookUrl, {
        method: "POST",
        body: formData,
      })
      .then(response => {
        if (response.ok) {
          window.location.href = "URL_DE_OBRIGADO";
        } else {
          alert("Erro ao enviar o formulário. Tente novamente.");
        }
      })
      .catch(error => {
        console.error
