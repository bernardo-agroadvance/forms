(function() {
  const targetElement = document.querySelector('#form-container');
  if (targetElement) {
    // Carregar o HTML do formulário dinamicamente
    fetch('https://bernardo-agroadvance.github.io/forms/formulario.html')
      .then(response => response.text())
      .then(html => {
        targetElement.innerHTML = html;

        // Lógica adicional do formulário, como handleSubmit
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
            console.error("Erro:", error);
            alert("Erro ao enviar o formulário. Tente novamente.");
          });
        };
      })
      .catch(error => console.error("Erro ao carregar o formulário:", error));
  } else {
    console.error("O elemento #form-container não foi encontrado.");
  }
})();
