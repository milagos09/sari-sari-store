class db {
    static submit() {
        if (this.getInput()) {
            const newItem = this.getInput();
            mock.push({ item: newItem.name, price: newItem.price, tags: newItem.tags });
            this.reset();
            alert(`"${newItem.name}" has been added successfully`);
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
            name: this.itemName.value,
            price: Number(this.itemPrice.value),
            tags: this.itemTags.value,
            img: this.itemImg.value,
        };

        if (!(newItem.name || newItem.price)) {
            return false;
        }

        /* Capitalizing the first letter of each word in the name. */
        newItem.name = newItem.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return newItem;
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
