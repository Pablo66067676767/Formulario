
let usuarios = [];
let indiceEdicao = -1;

let form = document.getElementById("formCadastro");
let lista = document.getElementById("listaUsuarios");

// CADASTRAR OU ATUALIZAR
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value.replace(/\D/g, "");
    let rg = document.getElementById("rg").value.replace(/[^0-9Xx]/g, "");
    let telefone = document.getElementById("celular").value.replace(/\D/g, "");
    let cep = document.getElementById("cep").value.replace(/\D/g, "");
    let email = document.getElementById("email").value;

    // VALIDAR CPF
    if (!/^\d{11}$/.test(cpf)) {
        alert("CPF deve ter 11 números!");
        return;
    }

    // VALIDAR RG
    if (!/^\d{7,9}[Xx]?$/.test(rg)) {
        alert("RG inválido!");
        return;
    }

    // VALIDAR TELEFONE
    if (!/^\d{10,11}$/.test(telefone)) {
        alert("Telefone inválido!");
        return;
    }

    // VALIDAR CEP
    if (!/^\d{8}$/.test(cep)) {
        alert("CEP deve ter 8 números!");
        return;
    }

    // VERIFICAR SENHAS
    let senha = document.getElementById("senha").value;
    let confirmar = document.getElementById("confirmar").value;

    if (indiceEdicao === -1 && senha !== confirmar) {
        alert("As senhas não são iguais!");
        return;
    }

    if (indiceEdicao !== -1 && (senha !== "" || confirmar !== "") && senha !== confirmar) {
        alert("As senhas não são iguais!");
        return;
    }

    // CRIAR USUÁRIO
    let usuario = {
        nome: nome,
        cpf: cpf,
        rg: rg,
        telefone: telefone,
        cep: cep,
        email: email
    };

    // VERIFICAR SE É CADASTRO OU EDIÇÃO
    if (indiceEdicao === -1) {
        usuarios.push(usuario);
        alert("Cadastro realizado!");
    } else {
        usuarios[indiceEdicao] = usuario;
        alert("Cadastro atualizado!");
    }

    form.reset();
    indiceEdicao = -1;

    document.getElementById("btnSalvar").textContent = "Cadastrar";
    document.getElementById("btnCancelar").hidden = true;

    document.getElementById("senha").required = true;
    document.getElementById("confirmar").required = true;

    mostrarUsuarios();
});

// MOSTRAR USUÁRIOS
function mostrarUsuarios() {
    lista.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];

        lista.innerHTML += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.rg}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.cep}</td>
                <td>${usuario.email}</td>
                <td>
                    <button type="button" onclick="editarUsuario(${i})">Editar</button>
                    <button type="button" onclick="excluirUsuario(${i})">Excluir</button>
                </td>
            </tr>
        `;
    }
}

// EDITAR USUÁRIO
function editarUsuario(indice) {
    let usuario = usuarios[indice];

    document.getElementById("nome").value = usuario.nome;
    document.getElementById("cpf").value = usuario.cpf;
    document.getElementById("rg").value = usuario.rg;
    document.getElementById("celular").value = usuario.telefone;
    document.getElementById("cep").value = usuario.cep;
    document.getElementById("email").value = usuario.email;

    indiceEdicao = indice;

    document.getElementById("senha").required = false;
    document.getElementById("confirmar").required = false;

    document.getElementById("btnSalvar").textContent = "Atualizar";
    document.getElementById("btnCancelar").hidden = false;
}

// EXCLUIR USUÁRIO
function excluirUsuario(indice) {
    if (confirm("Deseja excluir este usuário?")) {
        usuarios.splice(indice, 1);
        mostrarUsuarios();
    }
}

// CANCELAR EDIÇÃO
document.getElementById("btnCancelar").addEventListener("click", function() {
    form.reset();
    indiceEdicao = -1;

    document.getElementById("btnSalvar").textContent = "Cadastrar";
    this.hidden = true;

    document.getElementById("senha").required = true;
    document.getElementById("confirmar").required = true;
});

// LIMPAR FORMULÁRIO
document.getElementById("btnLimpar").addEventListener("click", function() {
    form.reset();
    indiceEdicao = -1;

    document.getElementById("btnSalvar").textContent = "Cadastrar";
    document.getElementById("btnCancelar").hidden = true;

    document.getElementById("senha").required = true;
    document.getElementById("confirmar").required = true;
});
