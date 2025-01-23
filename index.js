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

// Event listener para o formulário de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    updateUserStatus(username);
    document.getElementById("loginMessage").textContent = 'Login bem-sucedido!';
    // Aqui você pode adicionar a lógica adicional para autenticação
});

// Event listener para deslogar
document.getElementById("logoutButton").addEventListener("click", () => {
    updateUserStatus(null);
    alert("Deslogado com sucesso!");
    window.location.reload(); // Exemplo simples de recarregar a página
});

// Event listener para salvar dados manualmente
document.getElementById("saveButton").addEventListener("click", () => {
    saveData();
    alert("Alterações salvas com sucesso!");
});

// Event listeners para salvar os dados ao editar as células
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", saveData);
});

// Carregar os dados ao carregar a página
window.addEventListener("load", loadData);
