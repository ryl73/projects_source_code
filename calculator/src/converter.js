const type = document.querySelector('#type');

const selectTo = document.querySelector('#to');
const selectFrom = document.querySelector('#from');

const inputTo = document.querySelector('#inputTo');
const inputFrom = document.querySelector('#inputFrom');

const executeBtn = document.querySelector('#executeBtn');

const lengthValues = [
    {name: 'км', value: 1e3},
    {name: 'м', value: 1},
    {name: 'дм', value: 1e-1},
    {name: 'см', value: 1e-2},
    {name: 'мм', value: 1e-3},
    {name: 'мкм', value: 1e-6},
    {name: 'нм', value: 1e-9},
    {name: 'пм', value: 1e-12},
]

document.addEventListener('DOMContentLoaded', () => {
    for (let lengthValue of lengthValues) {
        const option = document.createElement('option');
        option.value = lengthValue.value;
        option.innerText = lengthValue.name;
        selectTo.append(option);
    }
    for (let lengthValue of lengthValues) {
        const option = document.createElement('option');
        option.value = lengthValue.value;
        option.innerText = lengthValue.name;
        selectFrom.append(option);
    }
});

executeBtn.addEventListener('click', calculate)

function setOptions() {
    switch(type.value) {
        case 'length': {

        } break;
        case 'square': {

        } break;
        case 'currency': {

        } break;
    }
}

function calculate() {
    if (inputFrom.value !== '') {
        inputTo.value = inputFrom.value * (selectFrom.value / selectTo.value);
    }
}