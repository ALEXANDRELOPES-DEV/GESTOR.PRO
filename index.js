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

// Função para mostrar quem está logado
function updateUserStatus(username) {
    const userStatus = document.getElementById("userStatus");
    if (username) {
        userStatus.textContent = `Logado como: ${username}`;
    } else {
        userStatus.textContent = '';
    }
}

// Função para habilitar ou desabilitar edição das células
function toggleEditCells(enable) {
    const inputs = document.querySelectorAll("tbody input");
    inputs.forEach(input => {
        input.disabled = !enable;
    });
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
});
