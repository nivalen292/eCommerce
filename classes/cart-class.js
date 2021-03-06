let Product = require("./product-class");

module.exports = class Cart {
    constructor(products) {
        this.items = products || [];
    }

    add(item) {
        if (!(item instanceof Product)) {
            throw new Error("Item is not a product");
        }       

        this.items.push(item);
        this.numberOfItems++;

        return this;
    }

    remove(item) {
        let index;
        if (typeof item === "string") {
            index = this.items.findIndex(i => i.title === item);
            this.items.splice(index, 1);

            return this;
        }
        else if (typeof item === "object") {
            index = this.items.findIndex(i => i.title === item.title);
            this.items.splice(index, 1);

            return this;
        }
    }

    getTotalPrice() {
        let sum = 0;
        this.items.forEach(item => {
            sum += item.price;
        });
        return sum;
    }

    getItemCount() {
        return this.items.length;
    }
}

// NOT FINISHED