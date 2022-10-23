function countPages(totalRows = currentResults.length, rowsPerPage = 5) {
    return Math.ceil(totalRows / rowsPerPage);
}

function getPageArray(page = 0, rowCount = 5) {
    const currentPage = currentResults.slice(page * rowCount, rowCount + page * rowCount);
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

/**
 * It creates a table row for each item in the array, and adds it to the table
 * @param [items] - the array of items to be displayed in the table
 */
function fillTable(items = getPageArray()) {
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
        img.src = "https://via.placeholder.com/125";
        tdImage.appendChild(img);

        tr.id = e.id;
        btnDelete.innerHTML = '<i class="bi bi-trash"></i>';
        btnDelete.className = "delete";
        btnDelete.addEventListener("click", async () => {
            await db.delete(e.id, e.item);
        });

        btnEdit.innerHTML = '<i class="bi bi-pencil-square"></i>';
        btnEdit.className = "edit";

        tdAction.append(btnDelete, btnEdit);

        tr.append(tdImage, tdItem, tdPrice, tdAction);
        itemsTable.append(tr);
    });
}

//Event Listeners and global variables
let currentResults = [];
const search = document.getElementById("search");
const clear = document.getElementById("clear");
const modal = document.getElementById("modal-add");
const closeModal = document.getElementById("modal-btn-close");
const openModal = document.getElementById("modal-btn-open");
const submit = document.getElementById("modal-btn-submit");

search.addEventListener("keyup", async (e) => {
    const searchItem = e.target.value.toLowerCase().trim();

    searchItem == "" ? (clear.style.display = "none") : (clear.style.display = "inline");

    if (searchItem === "") {
        currentResults = JSON.parse(sessionStorage.getItem("items"));
        clear.style.display = "none";
        loadDefault();
        return;
    }
    currentResults = JSON.parse(sessionStorage.getItem("items")).filter((e) =>
        e.item.toLowerCase().includes(searchItem)
    );
    fillTable(getPageArray());
    createPages(countPages(currentResults.length));
});

clear.addEventListener("click", () => {
    search.value = "";
    loadDefault();
});

openModal.addEventListener("click", () => {
    modal.showModal();
});

closeModal.addEventListener("click", () => {
    modal.close();
});

submit.addEventListener("click", () => {
    if (db.submit()) {
        loadDefault();
        modal.close();
    }
});

async function loadDefault() {
    clear.style.display = "none";
    /* Sorting the items alphabetically. */
    const items = await db.getAllItems();
    currentResults = items.sort((a, b) => {
        let fa = a.item.toLowerCase(),
            fb = b.item.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    fillTable();
    createPages();
}

loadDefault();
