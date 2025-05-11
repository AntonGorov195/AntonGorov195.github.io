/** @type {Ball[]} */
let mousePosition = new Vec2();
const gameCanvas = document.getElementById("game-canvas");

/** @type {Game} */
let game = makeGame(gameCanvas);
function gameUpdate() {
    const FIXED_DT = 1 / 60;
    game.update(FIXED_DT);
    requestAnimationFrame(gameUpdate);
}
gameUpdate();
window.addEventListener("mousedown", (e) => {
    const ball = new Ball(
        20,
        0.5,
        new Color(0.5, 0.7, 0.2),
    );
    game.shoot(ball);
});
window.addEventListener("mousemove", (e) => {
    const rect = gameCanvas.getBoundingClientRect();
    const pos = new Vec2(
        e.pageX - rect.left - window.scrollX,
        e.pageY - rect.top - window.scrollY
    );
    game.moveCursor(pos);
});

function makeGame(canvas) {
    return new Game(canvas, {
        mainBall: new Ball(
            40,
            1,
            new Color(1, 0, 0),
            new Vec2(200, 200),
            new Vec2(100 * Math.PI, 50 * Math.E)
        ),
        gravity: 400,
    });
}
const reset = document.getElementById("game-reset");
reset.addEventListener("click", () => {
    game = makeGame(gameCanvas);
    document.getElementById("game-ui").style.display = "none";
    gameCanvas.style.display = "block";
})