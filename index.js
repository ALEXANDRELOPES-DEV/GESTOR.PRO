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

// Event listeners para salvar os dados ao editar as células
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", saveData);
});

// Carregar os dados ao carregar a página
window.addEventListener("load", loadData);

// A função de deletar todos os dados ao pressionar a tecla delete foi removida daqui
