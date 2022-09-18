function countPages(totalRows = mock.length, rowsPerPage = 5) {
    return Math.ceil(totalRows / rowsPerPage);
}

function getPageArray(page = 0, rowCount = 5) {
    const currentPage = mock.slice(page * rowCount, rowCount + page * rowCount);
    return currentPage;
}

function createPages(pageCount = countPages(), active = 0) {
    const footerRow = document.getElementById("pagination");
    footerRow.innerHTML = "";

    for (let i = 0; i < pageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i + 1;
        pageButton.value = i;
        pageButton.classList = i === active ? "btn-page active" : "btn-page";
        pageButton.disabled = active === i;
        footerRow.appendChild(pageButton);
    }

    const pageButtons = document.querySelectorAll(".btn-page");
    for (const btn of pageButtons) {
        btn.addEventListener("click", (e) => {
            const newActive = e.target.value;
            const currentItems = getPageArray(newActive);
            fillTable(currentItems);
            for (const btn2 of pageButtons) {
                if (btn2.value == newActive) {
                    btn2.className = "btn-page active";
                    btn2.disabled = true;
                } else {
                    btn2.className = "btn-page";
                    btn2.disabled = false;
                }
            }
        });
    }
}

function fillTable(items = getPageArray(), rows = 5) {
    const itemsTable = document.getElementById("items-table");
    itemsTable.innerHTML = "";
    items.forEach((e, i) => {
        const tr = document.createElement("tr");
        const tdItem = document.createElement("td");
        const tdPrice = document.createElement("td");
        const tdImage = document.createElement("td");
        const tdAction = document.createElement("td");
        const img = document.createElement("img");
        const btnDelete = document.createElement("button");
        const btnEdit = document.createElement("button");

        tdItem.textContent = e.item;
        tdPrice.textContent = "P" + e.price.toFixed(2);
        img.src = "https://via.placeholder.com/150";
        tdImage.appendChild(img);

        btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
        btnEdit.innerHTML = '<i class="bi bi-pencil-square"></i>';
        tdAction.append(btnDelete, btnEdit);

        tr.append(tdImage, tdItem, tdPrice, tdAction);
        itemsTable.append(tr);
    });
}

//Event Listeners
document.getElementById("search").addEventListener("keyup", (e) => {
    const searchItem = e.target.value.toLowerCase().trim();
    const results = mock.filter((e) => e.item.toLowerCase().includes(searchItem));
    fillTable(results);
    createPages(countPages(results.length));
});

function bootstrap() {
    fillTable();
    createPages();
}

bootstrap();
