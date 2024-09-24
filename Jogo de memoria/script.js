const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const times = [
    'corinthians',
    'flamengo',
    'fluminense',
    'palmeiras',
    'santos',
    'saopaulo',
    'vasco',
    'botafogo',
    'bahia',
    'fortaleza',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeirafoto = '';
let segundafoto = '';

const checarFimDeJogo = () => {
    const fotosIndisponiveis = document.querySelectorAll('.foto-indisponivel');

    if (fotosIndisponiveis.length === times.length * 2) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

const corrigirFotos = () => {
    const primeiroTime = primeirafoto.getAttribute('data-time');
    const segundoTime = segundafoto.getAttribute('data-time');

    if (primeiroTime === segundoTime) {
        primeirafoto.firstChild.classList.add('foto-indisponivel');
        segundafoto.firstChild.classList.add('foto-indisponivel');

        primeirafoto = '';
        segundafoto = '';

        checarFimDeJogo();
    } else {
        setTimeout(() => {
            primeirafoto.classList.remove('revelar-foto');
            segundafoto.classList.remove('revelar-foto');

            primeirafoto = '';
            segundafoto = '';
        }, 500);
    }
}

const revelarFoto = ({ target }) => {
    if (target.parentNode.className.includes('revelar-foto')) {
        return;
    }

    if (primeirafoto === '') {
        target.parentNode.classList.add('revelar-foto');
        primeirafoto = target.parentNode;
    } else if (segundafoto === '') {
        target.parentNode.classList.add('revelar-foto');
        segundafoto = target.parentNode;

        corrigirFotos();
    }
}

const createCard = (time) => {
    const fotos = createElement('div', 'fotos');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../fotos/${time}.png')`;

    fotos.appendChild(front);
    fotos.appendChild(back);

    fotos.addEventListener('click', revelarFoto);
    fotos.setAttribute('data-time', time);

    return fotos;
}

const loadGame = () => {
    const duplicarTimes = [...times, ...times];

    const embaralhar = duplicarTimes.sort(() => Math.random() - 0.5);

    embaralhar.forEach((time) => {
        const fotos = createCard(time);
        grid.appendChild(fotos);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

    
}

window.onload = () => {
    
    startTimer();
    loadGame();
}
