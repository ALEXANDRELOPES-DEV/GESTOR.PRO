// Lista de usuários permitidos e suas senhas
const users = {
    "alex": "1985", // Atualizado
    "magno": "2014",
    "anderson": "1971",
    "massena": "1980",
    "douglas": "2022",
    "clovis": "2028",
    "patricio": "2100",
    "roberto": "2099"
};

// Variável para armazenar o usuário logado
let currentUser = null;

// Função para salvar os dados no localStorage
function saveData() {
    const rows = document.querySelectorAll("tbody tr");
    let tableData = [];
    rows.forEach(row => {
        const cols = row.querySelectorAll("input");
        let rowData = [];
        cols.forEach(col => {
            rowData.push(col.value);
        });
        tableData.push(rowData);
    });
    localStorage.setItem("tableData", JSON.stringify(tableData));
    displayHistorico();
}

// Função para carregar os dados do localStorage
function loadData() {
    const tableData = JSON.parse(localStorage.getItem("tableData"));
    if (tableData) {
        const rows = document.querySelectorAll("tbody tr");
        rows.forEach((row, index) => {
            const cols = row.querySelectorAll("input");
            cols.forEach((col, colIndex) => {
                col.value = tableData[index][colIndex];
            });
        });
    }
}

// Função para fazer o backup dos dados
function backupData() {
    const tableData = JSON.parse(localStorage.getItem("tableData"));
    if (tableData) {
        localStorage.setItem("backupData", JSON.stringify(tableData));
        alert("Backup realizado com sucesso!");
    } else {
        alert("Nenhum dado encontrado para backup!");
    }
}

// Função para restaurar o backup dos dados
function restoreBackup() {
    const backupData = JSON.parse(localStorage.getItem("backupData"));
    if (backupData) {
        localStorage.setItem("tableData", JSON.stringify(backupData));
        loadData();
        alert("Backup restaurado com sucesso!");
    } else {
        alert("Nenhum backup encontrado!");
    }
}

// Função para mostrar quem está logado
function updateUserStatus(username) {
    const userStatus = document.getElementById("userStatus");
    const logoutButton = document.getElementById("logoutButton");
    const saveButton = document.getElementById("saveButton");

    if (username) {
        userStatus.textContent = `Logado como: ${username}`;
        currentUser = username; // Atualiza o usuário logado
        logoutButton.disabled = false; // Habilita o botão Deslogar
        saveButton.disabled = false; // Habilita o botão Salvar Alterações
    } else {
        userStatus.textContent = '';
        currentUser = null;
        logoutButton.disabled = true; // Desabilita o botão Deslogar
        saveButton.disabled = true; // Desabilita o botão Salvar Alterações
    }
}

// Função para habilitar ou desabilitar edição das células
function toggleEditCells(enable) {
    const inputs = document.querySelectorAll("tbody input");
    inputs.forEach(input => {
        input.disabled = !enable;
    });
}

// Função para exibir o histórico de alterações
function displayHistorico() {
    const historico = document.getElementById("historico");
    const historicoData = JSON.parse(localStorage.getItem("historicoData"));
    if (historicoData) {
        historico.innerHTML = "<h3>Histórico de Alterações:</h3><ul>";
        historicoData.forEach(entry => {
            historico.innerHTML += `<li>Usuário: ${entry.usuario}, VT/MT: ${entry.vt_mt}, KM Atual: ${entry.km_atual}, Próx. Troca: ${entry.prox_troca}, Óleo Usado: ${entry.oleo_usado}</li>`;
        });
        historico.innerHTML += "</ul>";
    }
}   

// Event listener para o formulário de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] === password) {
        updateUserStatus(username);
        document.getElementById("loginMessage").textContent = 'Login bem-sucedido!';
        toggleEditCells(true); // Habilita a edição das células após login
    } else {
        document.getElementById("loginMessage").textContent = 'Usuário ou senha incorretos!';
        toggleEditCells(false); // Desabilita a edição das células
    }
});

// Event listener para deslogar
document.getElementById("logoutButton").addEventListener("click", () => {
    updateUserStatus(null);
    alert("Deslogado com sucesso!");
    toggleEditCells(false); // Desabilita a edição das células após deslogar
    window.location.reload(); // Exemplo simples de recarregar a página
});

// Event listener para salvar dados manualmente
document.getElementById("saveButton").addEventListener("click", () => {
    if (!currentUser) return; // Verifica se há um usuário logado
    saveData();
    alert("Alterações salvas com sucesso!");
});



// Event listeners para salvar os dados ao editar as células
document.querySelectorAll("tbody input").forEach(input => {
    input.addEventListener("input", saveData);
});

// Carregar os dados ao carregar a página
window.addEventListener("load", () => {
    loadData();
    toggleEditCells(false); // Desabilita a edição das células inicialmente
    document.getElementById("logoutButton").disabled = true; // Desabilita o botão Deslogar inicialmente
    document.getElementById("saveButton").disabled = true; // Desabilita o botão Salvar Alterações inicialmente
});
