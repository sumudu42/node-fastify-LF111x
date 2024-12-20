const data = [
    { id: 'A1', name: 'Vacuum Cleaner', rrp: '99.99', info: 'The suckiest vacuum in the world' },
    { id: 'A2', name: 'Leaf Blower', rrp: '300.00', info: 'This product will blow your socks off' },
    { id: 'B1', name: 'Chocolate Bar', rrp: '22.99', info: 'Delicious overpriced chocolate' },
];

const API = 'http://localhost:3000';

const keys = ['name', 'rrp', 'info'];

const populateProducts = async () => {
    // clear any content in the #products div
    const products = document.querySelector('#products');
    products.innerHTML = '';

    // fetch data from the remote server
    const res = await fetch(API);
    const data = await res.json();

    for (const product of data) {
        const item = document.createElement('product-item');
        for (const key of keys) {
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
})

customElements.define('product-item', class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        this.attachShadow({ mode: 'open' }).appendChild(itemTemplate.cloneNode(true));
    }
});
