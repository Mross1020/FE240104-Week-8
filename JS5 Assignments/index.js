class Pizza {
    constructor(name) {
        this.name = name;
        this.ingredients = [];
    }
//adds a class, and a blank array that we can add to
    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }

    describe() {
        return `${this.name} contains: ${this.ingredients.join(', ')}.`;
    }
}
// items assigned the class "Pizza" are added to this new parent class
class Order {
    constructor(name) {
        this.name = name;
        this.pizzas = [];
    }

    addPizza(pizza) {
        if (pizza instanceof Pizza) {
            this.pizzas.push(pizza);
        } else {
            throw new Error(`You can only order Pizza. PLease try again. ${pizza}`);
        }
    }

    
    describe() {
        return `${this.name} has ${this.pizzas.length} pizzas.`;
    }
}

class Menu {
    constructor() {
        this.orders = [];
        this.selectedOrder = null;
        this.ingredientsList = ['cheese', 'pepperoni', 'mushrooms', 'peppers', 'sausage'];
    }
//a greeting, and then the menu opens
    start() {
        alert(`Welcome to Promineo Pizza! Let's build a pizza!`);
        let selection = this.showMainMenuOptions();
        while (selection != '0') {
            switch (selection) {
                case '1':
                    this.createOrder();
                    break;
                case '2':
                    this.viewOrder();
                    break;
                case '3':
                    this.deleteOrder();
                    break;
                case '4':
                    this.displayOrders();
                    break;
                default:
                    selection = '0';
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new order
            2) view order
            3) delete order
            4) display all orders
        `);
    }

    showOrderMenuOptions(orderInfo) {
        return prompt(`
            0) back
            1) create pizza
            2) delete pizza
            -------------------
            ${orderInfo}
        `);
    }

    displayOrders() {
        let orderString = '';
        for (let i = 0; i < this.orders.length; i++) {
            orderString += i + ') ' + this.orders[i].name + '\n';
        }
        alert(orderString);
    }

    createOrder() {
        let name = prompt('Enter name for new order:');
        this.orders.push(new Order(name));
    }

    viewOrder() {
        let index = parseInt(prompt('Enter the index of the order you wish to view:'));
        if (index > -1 && index < this.orders.length) {
            this.selectedOrder = this.orders[index];
            let description = 'Order Name: ' + this.selectedOrder.name + '\n';

            for (let i = 0; i < this.selectedOrder.pizzas.length; i++) {
                description += i + ') ' + this.selectedOrder.pizzas[i].describe() + '\n';
            }

            let selection = this.showOrderMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPizza();
                    break;
                case '2':
                    this.deletePizza();
            }
        }
    }
//the user may delete their entire order and start over
    deleteOrder() {
        let index = parseInt(prompt('Enter the index of the order you wish to delete:'));
        if (index > -1 && index < this.orders.length) {
            this.orders.splice(index, 1);
        }
    }

    createPizza() {
        let name = prompt('Enter name for new pizza:');
        let pizza = new Pizza(name);
        this.selectedOrder.addPizza(pizza);

        let addingIngredients = true;
        while (addingIngredients) {
            let ingredientSelection = this.showIngredientOptions();
            if (ingredientSelection === '5') {
                addingIngredients = false;
            } else {
                let ingredient = this.ingredientsList[parseInt(ingredientSelection)];
                if (ingredient) {
                    pizza.addIngredient(ingredient);
                } else {
                    alert('Invalid selection. Please try again.');
                }
            }
        }
    }
//the user will select the toppings for their pizza
    showIngredientOptions() {
        return prompt(`
            Choose an ingredient:
            0) cheese
            1) pepperoni
            2) mushrooms
            3) peppers
            4) sausage
            5) done
        `);
    }
//the user may delete their pizza if they wish to start over
    deletePizza() {
        let index = parseInt(prompt('Enter the index of the pizza you wish to delete:'));
        if (index > -1 && index < this.selectedOrder.pizzas.length) {
            this.selectedOrder.pizzas.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();