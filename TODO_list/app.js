const close = document.getElementsByClassName("close");
const list = document.querySelector('ul');
const addBtn = document.querySelector('.addBtn');
const content = document.getElementById('content');
const loader = document.getElementById('loader');
const todayDateEl = document.getElementById('today');
const tomorrowDateEl = document.getElementById('tomorrow');
const afterTomorrowDateEl = document.getElementById('after_tomorrow');
const date = document.querySelector('.date');

// Set date
const todayDate = new Date();
const tomorrowDate = new Date();
const afterTomorrowDate = new Date();

tomorrowDate.setDate(tomorrowDate.getDate() + 1);
afterTomorrowDate.setDate(afterTomorrowDate.getDate() + 2);

const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let todayDateString = `${dayArr[todayDate.getDay()]} ${todayDate.getDate()} ${monthArr[todayDate.getMonth()]}`;

let tomorrowDateString =`${dayArr[tomorrowDate.getDay()]} ${tomorrowDate.getDate()} ${monthArr[tomorrowDate.getMonth()]}`;

let afterTomorrowDateString = `${dayArr[afterTomorrowDate.getDay()]} ${afterTomorrowDate.getDate()} ${monthArr[afterTomorrowDate.getMonth()]}`;

todayDateEl.innerHTML = todayDateString;
tomorrowDateEl.innerHTML = tomorrowDateString;
afterTomorrowDateEl.innerHTML = afterTomorrowDateString;

// Create function to get attribute for every date
function getAttr() {
    for(let i = 0; i < date.children.length; i++) {
        if(date.children[i].classList.contains('active')) {
            return date.children[i].getAttribute('dateAttr');
        }
    }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    let attrValue = getAttr();
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.setAttribute('dateAttr', attrValue);
    if (inputValue !== '') {
        document.getElementById("myUL").appendChild(li);
        document.getElementById("myInput").value = "";
    }

    let span = document.createElement("SPAN");
    span.className = "close";
    li.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            this.parentElement.style.animation = "deleteLi .5s";
            setTimeout(() => {
                this.parentElement.style.display = 'none';
            }, 500);
        }

        close[i].parentElement.addEventListener('mouseover', () => {
            close[i].style.opacity = '100';
            close[i].style.animation = 'deleteBtnAppear .5s';
        });

        close[i].parentElement.addEventListener('mouseout', () => {
            close[i].style.opacity = '0';
            close[i].style.animation = 'deleteBtnDisappear .5s';
        });
    }
}

// Render page after it was load, before this show preloader
window.addEventListener('load', () => {
    // Hide preloader
    content.style.opacity = '100';
    loader.style.display = 'none';

    // Set attributes to dates
    todayDateEl.setAttribute('dateAttr', 'today');
    tomorrowDateEl.setAttribute('dateAttr', 'tomorrow');
    afterTomorrowDateEl.setAttribute('dateAttr', 'afterTomorrow');

    // Add a "checked" symbol when clicking on a list item
    list.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

    // Set 'active' class for date that has been clicked
    date.addEventListener('click', (e) => {
        for(let i = 0; i < date.children.length; i++) {
            date.children[i].classList.remove('active');
        }
        e.target.classList.add('active');
    })

    todayDateEl.addEventListener('click', () => {
        for(let i = 0; i < list.children.length; i++) {
            if(list.children[i].getAttribute('dateAttr') !== 'today') {
                list.children[i].classList.add('hiddenItems');
            } else {
                list.children[i].classList.remove('hiddenItems');
            }
        }
    });

    tomorrowDateEl.addEventListener('click', () => {
        for(let i = 0; i < list.children.length; i++) {
            if(list.children[i].getAttribute('dateAttr') !== 'tomorrow') {
                list.children[i].classList.add('hiddenItems');
            } else {
                list.children[i].classList.remove('hiddenItems');
            }
        }
    });

    afterTomorrowDateEl.addEventListener('click', () => {
        for(let i = 0; i < list.children.length; i++) {
            if(list.children[i].getAttribute('dateAttr') !== 'afterTomorrow') {
                list.children[i].classList.add('hiddenItems');
            } else {
                list.children[i].classList.remove('hiddenItems');
            }
        }
    });

    addBtn.addEventListener('click', newElement);

    window.addEventListener('keydown', (e) => {
        if(e.code === 'Enter') {
            newElement();
        }
    });
})

