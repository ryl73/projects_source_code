const output = document.querySelector('#output');
const history = document.querySelector('#history');
const btns = document.querySelector('.btns');

let evalStr = '';

btns.addEventListener('click', (e) => {
    if (e.target.classList.contains('operation') || e.target.classList.contains('digit')) {
        output.innerText += e.target.innerText;
        evalStr += e.target.innerText;
    }
    switch (e.target.id) {
        case 'eval':  {
            history.innerText = output.innerText;
            output.innerText = eval(evalStr);
        } break;
        case 'AC':  {
            output.innerText = '';
            history.innerText = '';
            evalStr = '';
        } break;
        case 'delete':  {
            output.innerText = output.innerText.slice(0, output.innerText.length - 1);
            evalStr = output.innerText.slice(0, output.innerText.length - 1);
        } break;
        case 'deleteIcon':  {
            output.innerText = output.innerText.slice(0, output.innerText.length - 1);
            evalStr = output.innerText.slice(0, output.innerText.length - 1);
        } break;
        case 'divide':  {
            output.innerText += e.target.innerText;
            evalStr += '/';
        } break;
        case 'multiply':  {
            output.innerText += e.target.innerText;
            evalStr += '*';
        } break;
        case 'brackets':  {
            if (output.innerText.includes('(')) {
                output.innerText += ')';
                evalStr += ')';
            } else {
                output.innerText += '(';
                evalStr += '(';
            }
        } break;
    }
})
