const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

const items = JSON.parse(localStorage.getItem('items')) || [];

const clearList = document.querySelector('.clearList');
const checkButtons = document.querySelectorAll('.button')


function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type='checkbox' data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) {
        return // skip this unless its and input
    }
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem
}

function clearHandler(e) {
    localStorage.clear();
    items.length = 0;
    localStorage.setItem("items", JSON.stringify(items));
    populateList([], itemsList);
}

function checkHandler(e) {
    items.forEach((item, i) => {
        e.target.name === 'checkAll' ? (items[i].done = true) : (items[i].done = false)
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList)
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearList.addEventListener('click', clearHandler);
checkButtons.forEach(button => {
    button.addEventListener('click', checkHandler)
});

populateList(items, itemsList);