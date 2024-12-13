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
      <button type="submit" id="submit-form-123">Garanta sua vaga</button>
    </form>
  `;
  const targetElement = document.querySelector('#form-container');
  if (targetElement) {
    targetElement.innerHTML = formHtml;
  }
})();
