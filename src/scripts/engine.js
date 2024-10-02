const state = {
    view: {
        square: document.querySelectorAll('.square'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },

    values: {
        gameVelocity: 1000,
        hitPosition: null, // Começa com null
        result: 0,
        currentTime: 60,
    },

    actions: {
        timerId: null,
        countDownTimerId: null,
    },

    sounds: {
        hit: new Audio('./src/audios/hit.m4a'),
    },
};

// Configurar o volume do áudio
state.sounds.hit.volume = 0.2;

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);

        // Exibir alerta com a pontuação final e reiniciar o jogo apenas após confirmação
        setTimeout(() => {
            alert("Game Over! O seu resultado foi: " + state.values.result);
            resetGame(); // Reiniciar o jogo quando o jogador clicar em "OK"
        }, 100);  // Delay para garantir que o intervalo foi completamente parado
    }
}

function playSound(audio) {
    audio.currentTime = 0; // Reiniciar o áudio antes de tocar
    audio.play();
}

function randomSquare() {
    // Remover a classe "enemy" do quadrado anterior, se existir
    state.view.square.forEach(square => {
        square.classList.remove("enemy");
    });

    // Selecionar um quadrado aleatório diferente do anterior
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * state.view.square.length);
    } while (state.values.hitPosition === state.view.square[randomNumber].id);

    // Adicionar a classe "enemy" ao novo quadrado selecionado
    const randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id; // Atualizar a posição correta
}

function addListenerHitBox() {
    state.view.square.forEach(square => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; // Resetar após um acerto
                playSound(state.sounds.hit);
            }
        });
    });
}

function startGame() {
    // Iniciar o ciclo de quadrados aleatórios e o contador
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function resetGame() {
    // Reiniciar os valores e limpar os intervalos
    state.values.result = 0;
    state.values.currentTime = 60;
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.currentTime;

    // Garantir que todos os intervalos anteriores sejam limpos
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);

    // Reiniciar o jogo
    startGame();
}

function initialize() {
    addListenerHitBox(); // Adicionar listeners de clique
    resetGame(); // Iniciar o jogo
}

initialize();