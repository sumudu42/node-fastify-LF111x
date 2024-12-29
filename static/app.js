const API = 'http://localhost:3000';

const keys = ['name', 'rrp', 'info'];

const populateProducts = async (category, method='GET', payload) => {

    // clear any content within the products div
    const products = document.querySelector('#products');
    products.innerHTML = '';

    // build the payload based on HTTP method
    const send = method === 'GET' ? {} : {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }

    const res = await fetch(`${API}/${cateogry}`, {method, ...send});
    const status = await res.status;
    const data = await res.json();
    console.log(`Status: ${status}, Data: ${data}`);


   /** Populate the product div with data */
    for(const product of data) {
        /** For each product create a custom 'product-item' with children (span) with slot names name, rrp, and info and populate
         * them with the product data corresponding to their key names, and append each element to its (custom) parent element.
         */
        const item = document.createElement('product-item');
        for(const key of keys) {
            const span = document.createElement('span');
            span.slot = key;   // slot name == key
            span.textContent = product[key];    // get the actual value
            item.appendChild(span)
        }
        /** Append each 'product-item' element to the #products div */
        product.appendChild(item);
    }
}

const category = document.querySelector('#category');
const add = document.querySelector('#add');

category.addEventListener('input', async ({ target }) => {  // == event.target/object destructuring
    const selectedCategory = e.target.value;
    add.style.display = 'block';
    await populateProducts(selectedCategory);     // GET request with empty payload
});

add.addEventListener('submit', async (e) => {
    e.preventDefault();    // prevent default form submission behaviour
    const { target } = e;
    const payload = {
        name: target.name.value,
        rrp: target.rrp.vaue,
        info: target.info.value
    }
    await populateProducts(category.value, 'POST', payload);    // POST requst with product information as payload
    target.reset();    // reset the form()
});

/** Define custom 'product-item' element */
customElements.define('product-item', class Item extends HTMLElement {
    constructor() {
        super();
        const itemTemplate = document.querySelector('#item').content;
        this.attachShadow({mode: open}).appendChild(itemTemplate.cloneNode(true));
    }
});