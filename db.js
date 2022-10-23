class db {
    static async getAllItems() {
        const response = await fetch("https://sari-sari-store-backend-dv13.vercel.app/products/getallitems", {
            method: "GET",
        });
        const data = await response.json();
        sessionStorage.setItem("items", JSON.stringify(data));
        return data;
    }

    static async submit() {
        const newItem = this.getInput();
        if (newItem) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(newItem),
                redirect: "follow",
            };

            const response = await fetch(
                "https://sari-sari-store-backend-dv13.vercel.app/products/add",
                requestOptions
            );
            const data = await response.status;

            this.reset();
            await loadDefault();
            return true;
        }
        alert("cannot submit new item");
        return false;
    }

    /**
     * It takes the values from the input fields and returns an object with the values.
     * @returns The newItem object.
     */
    static getInput() {
        const newItem = {
            item: this.itemName.value,
            price: Number(this.itemPrice.value),
            tags: this.itemTags.value,
            image: this.itemImg.value,
        };

        if (!(newItem.item || newItem.price)) {
            return false;
        }

        /* Capitalizing the first letter of each word in the name. */
        newItem.item = newItem.item
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return newItem;
    }

    static async delete(id, name) {
        const requestOptions = {
            method: "DELETE",
        };

        const response = await fetch(
            "https://sari-sari-store-backend-dv13.vercel.app/products/delete/" + id,
            requestOptions
        );

        await loadDefault();
        alert("successfully deleted: " + name);
    }

    static reset() {
        this.itemName.value = "";
        this.itemPrice.value = "";
        this.itemTags.value = "";
        this.itemImg.value = "";
    }

    static itemName = document.getElementById("item-name");
    static itemPrice = document.getElementById("item-price");
    static itemTags = document.getElementById("item-tags");
    static itemImg = document.getElementById("item-img");
}
