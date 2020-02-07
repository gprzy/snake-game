// Ao carregar a página, o jogo é renderizado

window.onload = function() {
    var stage = document.getElementById("stage");
    var context = stage.getContext("2d");
    // Ao pressionar uma tecla o evento "KeyPush" é acionado
    document.addEventListener("keydown", keyPush);
    //timer();

    // Ritmo do jogo

    setInterval(game, 60);
    mili = 0;
    seconds = 0;
    minutes = 0;
    var myTimer = setInterval(miliseconds, 1);

    // VARIÁVEIS -------------------------------------------------------------------------

    const vel = 1;
    var vx = 0;
    var vy = 0;
    var px = 20; // Posição x inicial da cobra
    var py = 65; // Posição y inicial da cobra
    var size = 20;
    var len = 30;
    var applex = 15;
    var appley = 15;
    var score = 0;
    start = false;

    var trail = []
    tail = 5; // Tamanho inicial da cobra

    // LÓGICA DO JOGO --------------------------------------------------------------------

    function game() {
        px += vx;
        py += vy;

        // Caso o jogador atinja as bordas do mapa, retorna à borda oposta

        // Borda esquerda
        if (px < 0) {
            px = len - 1;
        }

        // Borda direita
        if (px > len - 1) {
            px = 0;
        }

        // Borda superior
        if (py < 0) {
            py = len - 1;
        }

        // Borda inferior
        if (py > len - 1) {
            py = 0;
        }

        // Cenário
        context.fillStyle = "black";
        context.fillRect(0, 0, stage.width, stage.height);

        // Maçã
        context.fillStyle = "#E83449";
        context.fillRect(applex * size, appley * size, size, size);

        // Cobra
        context.fillStyle = "#66D3A7";
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * size, trail[i].y * size, size, size);

            if (trail[i].x == px && trail[i].y == py) {
                vx = 0;
                vy = 0;
                tail = 4;
            }
        }

        trail.push({
            x: px,
            y: py
        });

        while (trail.length > tail) {
            trail.shift();
        }

        // Caso coma a maçã, uma nova é posicionada
        if ((applex == px) && (appley == py)) {
            score++;
            document.getElementById("score").innerHTML = "Score " + score; // Apresenta o score na tela

            tail++;
            applex = Math.floor(Math.random() * len);
            appley = Math.floor(Math.random() * len);
        }
    }

    // ------------------------------- Eventos das teclas para mover a cobra

    function keyPush(event) {

        switch (event.keyCode) {
            // Esquerda
            case 37:
                vx = -vel;
                vy = 0;
                start = true;
                break;

                // Cima
            case 38:
                vx = 0;
                vy = -vel;
                start = true;
                break;

                // Direita
            case 39:
                vx = vel;
                vy = 0;
                start = true;
                break;

                // Baixo
            case 40:
                vx = 0;
                vy = vel;
                start = true;
                break;

                // Ao apertar a barra de espaço o jogo é pausado
            case 32:
                alert("Pause");
        }
    }

    function miliseconds() {
        if (start == true) {
            mili += 4;
            if (mili >= 999) {
                mili = 0;
                seconds++;

            } else if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }

            document.getElementById("timer").innerHTML = "0" + minutes + ":" + seconds + ":" + mili;
        }
    }
}