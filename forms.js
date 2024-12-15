document.addEventListener("DOMContentLoaded", () => {
  initializeIntlTelInput();
  configurePhoneInputMask();
  setupFormValidation();
  setupEducationButtons();
  setupPositionSelection();
  captureUserLocation()
});

 // Captura IP (ipinfo)
function captureUserLocation() {
  fetch("https://ipinfo.io/json?token=e880a2e44e4604")
    .then((response) => response.json())
    .then((data) => {
      // Preenche os campos ocultos no formulário
      document.querySelector("input[name='user-ip']").value = data.ip || "";
      document.querySelector("input[name='user-city']").value = data.city || "";
      document.querySelector("input[name='user-region']").value = data.region || "";
      document.querySelector("input[name='user-country']").value = data.country || "";
    })
    .catch((error) => {
      console.error("Erro ao capturar dados do IPinfo:", error);

      // Garante valores padrão para evitar falhas no envio
      document.querySelector("input[name='user-ip']").value = "";
      document.querySelector("input[name='user-city']").value = "";
      document.querySelector("input[name='user-region']").value = "";
      document.querySelector("input[name='user-country']").value = "";
    });
}

// Função para inicializar o intl-tel-input
function initializeIntlTelInput() {
  const input = document.querySelector("#phone");
  window.intlTelInput(input, {
    initialCountry: "br",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js",
  });
}

// Máscara dinâmica para telefone
function configurePhoneInputMask() {
  const phoneInput = document.querySelector("#phone");
  const errorPhone = document.getElementById("error-phone");

  phoneInput.addEventListener("input", function () {
    let value = phoneInput.value.replace(/\D/g, ""); // Remove tudo que não for número

    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica a máscara ao valor
    if (value.length >= 7) {
      phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length >= 3) {
      phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      phoneInput.value = `(${value}`;
    }

    // Validação dinâmica durante a digitação
    if (value.length === 11) {
      phoneInput.setCustomValidity("");
      errorPhone.style.display = "none";
    } else {
      phoneInput.setCustomValidity("Por favor, insira um número de telefone válido com 11 dígitos.");
      errorPhone.style.display = "block";
      errorPhone.textContent = "Por favor, insira um número de telefone válido com 11 dígitos.";
    }
  });
}

// Configuração dos botões de educação
function setupEducationButtons() {
  const buttons = document.querySelectorAll(".button-education button");
  const educationInput = document.querySelector("#education");
  const errorEducation = document.getElementById("error-education");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove a classe 'selected' de todos os botões
      buttons.forEach((btn) => btn.classList.remove("selected"));

      // Adiciona a classe 'selected' ao botão clicado
      button.classList.add("selected");

      // Define o valor do campo hidden com o ID do botão
      educationInput.value = button.id;

      // Remove a mensagem de erro, se houver
      errorEducation.style.display = "none";
      errorEducation.textContent = "";
    });
  });
}

// Configuração da seleção de posição
function setupPositionSelection() {
  const positionSelect = document.querySelector("#position");
  const otherPositionLabel = document.querySelector("#label-other-position");
  const otherPositionInput = document.querySelector("#other-position");
  const errorOtherPosition = document.getElementById("error-other-position");

  positionSelect.addEventListener("change", () => {
    if (positionSelect.value === "other") {
      // Exibe o campo "Outro cargo"
      otherPositionLabel.style.display = "block";
      otherPositionInput.style.display = "block";
      otherPositionInput.setAttribute("required", "required");
      otherPositionInput.focus();

      // Configura validação dinâmica ao exibir o campo
      setupOtherPositionValidation();
    } else {
      // Oculta o campo "Outro cargo"
      otherPositionLabel.style.display = "none";
      otherPositionInput.style.display = "none";
      otherPositionInput.removeAttribute("required");
      otherPositionInput.value = "";

      // Remove classe 'invalid' e mensagem de erro
      otherPositionInput.classList.remove("invalid");
      errorOtherPosition.style.display = "none";
      errorOtherPosition.textContent = "";
    }
  });

  // Função para configurar validação dinâmica do campo "Outro cargo"
  function setupOtherPositionValidation() {
    otherPositionInput.addEventListener("input", handleOtherPositionValidation);
    otherPositionInput.addEventListener("blur", handleOtherPositionValidation);
  }

  // Função de validação do campo "Outro cargo"
  function handleOtherPositionValidation() {
    const value = otherPositionInput.value.trim();
    if (value === "") {
      otherPositionInput.classList.add("invalid"); // Adiciona a classe 'invalid'
      otherPositionInput.setCustomValidity("O campo 'Outro cargo' não pode estar vazio.");
      errorOtherPosition.style.display = "block";
      errorOtherPosition.textContent = "O campo 'Outro cargo' não pode estar vazio.";
    } else {
      otherPositionInput.classList.remove("invalid"); // Remove a classe 'invalid'
      otherPositionInput.setCustomValidity("");
      errorOtherPosition.style.display = "none";
      errorOtherPosition.textContent = "";
    }
  }
}

// Validação geral do formulário
function setupFormValidation() {
  const form = document.querySelector("#form-name");

  // Referências aos campos
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const positionInput = document.querySelector("#position");
  const otherPositionInput = document.querySelector("#other-position");
  const educationInput = document.querySelector("#education");
  const termsCheckbox = document.querySelector("#accept-terms");
  const ddiInput = document.querySelector("#ddi"); // Campo oculto para o DDI

  // Instância do intl-tel-input
  const iti = window.intlTelInputGlobals.instances[0];

  const errorName = document.getElementById("error-name");
  const errorEmail = document.getElementById("error-email");
  const errorPhone = document.getElementById("error-phone");
  const errorPosition = document.getElementById("error-position");
  const errorOtherPosition = document.getElementById("error-other-position");
  const errorEducation = document.getElementById("error-education");
  const errorTerms = document.getElementById("error-terms");

  // Função de validação para campos individuais
  function validateInput(input, messageContainer, validationFunction, errorMessage) {
    if (!validationFunction(input)) {
      input.classList.add("invalid"); // Adiciona a classe 'invalid'
      input.setCustomValidity(errorMessage);
      if (messageContainer) {
        messageContainer.style.display = "block";
        messageContainer.textContent = errorMessage;
      }
      return false;
    } else {
      input.classList.remove("invalid"); // Remove a classe 'invalid'
      input.setCustomValidity("");
      if (messageContainer) {
        messageContainer.style.display = "none";
        messageContainer.textContent = "";
      }
      return true;
    }
  }

  // Validações específicas
  function isNotEmpty(input) {
    return input.value.trim() !== "";
  }

  function isValidEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input.value);
  }

  function isValidPhone(input) {
    const cleaned = input.value.replace(/\D/g, "");
    return cleaned.length === 11;
  }

  function isTermsAccepted(input) {
    return input.checked;
  }

  // Configura validação dinâmica para todos os campos
  function setupDynamicValidation(input, messageContainer, validationFunction, errorMessage) {
    input.addEventListener("input", () => {
      validateInput(input, messageContainer, validationFunction, errorMessage);
    });

    if (input.type === "checkbox") {
      input.addEventListener("change", () => {
        validateInput(input, messageContainer, validationFunction, errorMessage);
      });
    }
  }

  // Aplica validação dinâmica para todos os campos
  setupDynamicValidation(nameInput, errorName, isNotEmpty, "O campo nome não pode estar vazio.");
  setupDynamicValidation(emailInput, errorEmail, isValidEmail, "Por favor, insira um e-mail válido.");
  setupDynamicValidation(phoneInput, errorPhone, isValidPhone, "Por favor, insira um número de telefone válido (11 dígitos).");
  setupDynamicValidation(positionInput, errorPosition, isNotEmpty, "Por favor, selecione uma opção de cargo.");
  setupDynamicValidation(termsCheckbox, errorTerms, isTermsAccepted, "Você deve aceitar os termos para continuar.");

  // Captura UTMs da URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source") || "";
  const utmMedium = urlParams.get("utm_medium") || "";
  const utmCampaign = urlParams.get("utm_campaign") || "";
  const utmContent = urlParams.get("utm_content") || "";
  const utmTerm = urlParams.get("utm_term") || "";

  // Validações no envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Impede o envio até que todas as validações passem

  // Atualiza o valor do DDI no campo oculto antes da validação final
  const countryData = iti.getSelectedCountryData();
  ddiInput.value = countryData.dialCode;

  // Validações personalizadas
  const isNameValid = validateInput(
    nameInput,
    errorName,
    isNotEmpty,
    "O campo nome não pode estar vazio."
  );

  const isEmailValid = validateInput(
    emailInput,
    errorEmail,
    isValidEmail,
    "Por favor, insira um e-mail válido."
  );

  const isPhoneValid = validateInput(
    phoneInput,
    errorPhone,
    isValidPhone,
    "Por favor, insira um número de telefone válido (11 dígitos)."
  );

  const isPositionValid = validateInput(
    positionInput,
    errorPosition,
    isNotEmpty,
    "Por favor, selecione uma opção de cargo."
  );

  let isOtherPositionValid = true;
  if (positionInput.value === "other") {
    isOtherPositionValid = validateInput(
      otherPositionInput,
      errorOtherPosition,
      isNotEmpty,
      "O campo 'Outro cargo' não pode estar vazio."
    );
  }

  const isEducationValid = validateInput(
    educationInput,
    errorEducation,
    isNotEmpty,
    "Por favor, selecione uma opção em 'Possui superior completo?'."
  );

  const isTermsValid = validateInput(
    termsCheckbox,
    errorTerms,
    isTermsAccepted,
    "Você deve aceitar os termos para continuar."
  );

  if (
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPositionValid &&
    isOtherPositionValid &&
    isEducationValid &&
    isTermsValid
  ) {
    // Dados para o webhook
    const formData = {
      conversion_identifier: "form-123", // Substitua pelo ID do formulário
      url_conversion: window.location.href, // URL atual do formulário
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      ddi: ddiInput.value,
      education: educationInput.value,
      position: positionInput.value,
      "other-position": otherPositionInput.value,
      "accept-terms": termsCheckbox.checked ? "on" : "off",
      user_ip: document.querySelector("input[name='user-ip']").value,
      user_city: document.querySelector("input[name='user-city']").value,
      user_region: document.querySelector("input[name='user-region']").value,
      user_country: document.querySelector("input[name='user-country']").value,
    };

    // Envio via Webhook
    fetch("https://hook.eu2.make.com/mnv21nm7895oy8v5ga7c947w9y9cckwb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Dados enviados com sucesso!");
          form.submit(); // Envia o formulário se necessário
          window.location.href = "https://agroadvance.com.br/";
        } else {
          console.error("Erro no envio:", response.statusText);
        }
      })
      .catch((error) => console.error("Erro:", error));
  }
});

  form.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("invalid", (event) => {
      event.preventDefault(); // Impede o balão padrão
    });
  });
}
