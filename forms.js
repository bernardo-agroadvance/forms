document.addEventListener("DOMContentLoaded", () => {
  initializeIntlTelInput();
  configurePhoneInputMask();
  setupFormValidation();
  setupEducationButtons();
  setupCargoSelection();
  setupTermsValidation();
});

// Função para inicializar o intl-tel-input
function initializeIntlTelInput() {
  const input = document.querySelector("#phone");
  window.intlTelInput(input, {
    initialCountry: "br",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js",
  });
}

// Função para configurar a máscara do campo telefone
function configurePhoneInputMask() {
  const phoneInput = document.querySelector("#phone");

  phoneInput.addEventListener("input", function () {
    let value = phoneInput.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length >= 7) {
      phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length >= 3) {
      phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      phoneInput.value = `(${value}`;
    }
  });

  phoneInput.addEventListener("blur", function () {
    const rawValue = phoneInput.value.replace(/\D/g, "");
    if (rawValue.length !== 11) {
      phoneInput.setCustomValidity("O telefone deve conter exatamente 11 dígitos!");
    } else {
      phoneInput.setCustomValidity("");
    }
  });
}

// Função para configurar os botões de educação
function setupEducationButtons() {
  const buttons = document.querySelectorAll(".button-education button");
  const hiddenInput = document.querySelector("#education");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      hiddenInput.value = button.id;
    });
  });
}

// Função para configurar a seleção do cargo
function setupCargoSelection() {
  const cargoSelect = document.querySelector("#cargo");
  const outroCargoLabel = document.querySelector("#label-outro-cargo");
  const outroCargoInput = document.querySelector("#outro-cargo");

  cargoSelect.addEventListener("change", () => {
    if (cargoSelect.value === "outro") {
      outroCargoLabel.style.display = "block";
      outroCargoInput.style.display = "block";
      outroCargoInput.setAttribute("required", "required");
    } else {
      outroCargoLabel.style.display = "none";
      outroCargoInput.style.display = "none";
      outroCargoInput.removeAttribute("required");
    }
  });
}

// Função para validar os termos de uso
function setupTermsValidation() {
  const form = document.querySelector("#form-name");
  const termsCheckbox = document.querySelector("#accept-terms");

  termsCheckbox.addEventListener("invalid", function () {
    if (!termsCheckbox.checked) {
      termsCheckbox.setCustomValidity(
        "Você precisa aceitar os termos de uso e a política de privacidade para continuar."
      );
    } else {
      termsCheckbox.setCustomValidity("");
    }
  });

  form.addEventListener("submit", (event) => {
    // Validação no envio
    if (!termsCheckbox.checked) {
      event.preventDefault();
      termsCheckbox.reportValidity();
    } else {
      termsCheckbox.setCustomValidity("");
    }
  });
}

// Função geral de validação
function setupFormValidation() {
  const form = document.querySelector("#form-name");
  const nameInput = document.querySelector("#nome");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const cargoInput = document.querySelector("#cargo");
  const outroCargoInput = document.querySelector("#outro-cargo");

  // Configuração das mensagens customizadas para cada campo
  nameInput.addEventListener("invalid", () => {
    if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity("Por favor, preencha o campo Nome.");
    } else {
      nameInput.setCustomValidity("");
    }
  });

  emailInput.addEventListener("invalid", () => {
    if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity("Por favor, preencha o campo E-mail.");
    } else if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("Por favor, insira um endereço de e-mail válido.");
    } else {
      emailInput.setCustomValidity("");
    }
  });

  cargoInput.addEventListener("invalid", () => {
    if (cargoInput.validity.valueMissing) {
      cargoInput.setCustomValidity("Por favor, selecione o campo Cargo.");
    } else {
      cargoInput.setCustomValidity("");
    }
  });

  // Adicionando validação para "Outro Cargo"
  outroCargoInput.addEventListener("invalid", () => {
    if (cargoInput.value === "outro" && outroCargoInput.value.trim() === "") {
      outroCargoInput.setCustomValidity("Por favor, preencha o campo 'Outro Cargo'.");
    } else {
      outroCargoInput.setCustomValidity("");
    }
  });

  form.addEventListener("submit", (event) => {
    // Validação para o campo "Outro Cargo"
    if (cargoInput.value === "outro" && outroCargoInput.value.trim() === "") {
      event.preventDefault();
      outroCargoInput.setCustomValidity("Por favor, preencha o campo 'Outro Cargo'.");
      outroCargoInput.reportValidity();
    } else {
      outroCargoInput.setCustomValidity("");
    }

    nameInput.setCustomValidity("");
    emailInput.setCustomValidity("");
    cargoInput.setCustomValidity("");
    phoneInput.setCustomValidity("");
  });
}
