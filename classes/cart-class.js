var Product = require("./product-class");

module.exports = class Cart {
    constructor(products) {
        this.items = products || [];
        this.numberOfItems = this.items.length || 0;
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
        var index;
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
        var sum = 0;
        this.items.forEach(item => {
            sum += item.price;
        });
        return sum;
    }
}

// NOT FINISHED