window.onload = function() {
    var stage = document.getElementById("stage");
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    setInterval(game, 120);

    const vel = 1;
    var vx = 0;
    var vy = 0;
    var px = 10;
    var py = 15;
    var size = 20;
    var len = 30;
    var applex = 15;
    var appley = 15;
    var score = 0;

    var trail = []
    tail = 5;

    function game() {
        px += vx;
        py += vy;

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
            tail++;
            applex = Math.floor(Math.random() * len);
            appley = Math.floor(Math.random() * len);
        }
    }

    // Eventos das teclas para mover a cobra
    function keyPush(event) {

        switch (event.keyCode) {
            // Esquerda
            case 37:
                vx = -vel;
                vy = 0;
                break;

                // Cima
            case 38:
                vx = 0;
                vy = -vel;
                break;

                // Direita
            case 39:
                vx = vel;
                vy = 0;
                break;

                // Baixo
            case 40:
                vx = 0;
                vy = vel;
                break;

                // Ao apertar a barra de espaço a pontuação é exibida
            case 32:
                alert("Pontuação: " + score);

            default:

                break;
        }
    }
}