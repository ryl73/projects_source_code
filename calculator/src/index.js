const switchBtns = document.querySelector('.switchBtns');
const frame = document.querySelector('.frame');

switchBtns.addEventListener('click', (e) => {
    if (e.target.classList.contains('switchBtn')) {
        const btns = document.querySelectorAll('.switchBtn');
        for (let btn of btns) {
            btn.classList.remove('active');
        }
        e.target.classList.add('active');
        if (e.target.id === 'calc') {
            frame.style.transform = 'translateX(0)';
        } else {
            frame.style.transform = 'translateX(-275px)';
        }
    }
})