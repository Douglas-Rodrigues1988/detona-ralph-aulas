const state = {
    view: {
        square: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    value: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
    },
}

function randomSquare() {
    state.view.square.forEach((square)=> {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()* 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function addListenerHitBox() {
    state.view.square.forEach(square => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.values.hitPosition = null;
            }   
        });
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();