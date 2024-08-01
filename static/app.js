const API = 'http://localhost:3000';

// const data = [
//     {id: 'A1', name: 'Vacuum Cleaner', rrp: 100.00, info: 'The suckiest vacuum in the world.'},
//     {id: 'A2', name: 'Leaf Blower', rrp: 250.00, info: 'This product will blow your socks off.'},
//     {id: 'B1', name: 'Chocolate bar', rrp: 20.00, info: 'Delicious overpriced chocolate.'}
// ];

const populateProducts = async () => {
    /** clear any content in the products div element */
    const products = document.querySelector('#products');
    products.innerHTML = '';

    /** fetch data from the mock server */
    const res = await fetch(API);
    const data = await res.json();

    for(const product of data) {
        const item = document.createElement('product-item');
        for(const key of ['name', 'rrp', 'info']) {
            const span = document.createElement('span');
            span.slot = key;
            span.textContent = product[key];
            item.appendChild(span);
        }
        products.appendChild(item);
    }
}

document.querySelector('#fetch').addEventListener('click', async () => {
    await populateProducts();
});

class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        const shadow = this.attachShadow({mode: 'open'}); // mode: 'open' -> allows access to the underlying shadowRoot
        shadow.appendChild(itemTemplate.cloneNode(true)); // cloneNode(true) -> includes the subtree
    }
}

customElements.define('product-item', Item);