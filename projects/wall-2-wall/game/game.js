class Game {
    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = null;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = null;
        /** @type {Ball} */
        this.mainBall = null;
        this.ceilHeight = 0;
        /** @type {Wall[]} */
        this.walls = [];
        /** @type {WallsSetting} */
        this.wallSettings = new WallsSetting();
        this.gravity = 0;
    }
    /**
     * Advance the game by 'dt' seconds.
     * @param {number} dt
     */
    update(dt) {
        bulletBalls = bulletBalls.filter((ball) => {
            return ball.isActive;
        });
        w = gameCanvas.width;
        h = gameCanvas.height;
        c.fillStyle = "skyblue";
        c.fillRect(0, 0, w, h);
        {
            mainBall.center.x += mainBall.vel.x * dt;
            mainBall.center.y += mainBall.vel.y * dt;
            bounceBall(mainBall, w, h);
            {
                // Main ball handle...
            }
            mainBall.vel.y += 400 * dt;

            for (let i = 0; i < bulletBalls.length; i++) {
                for (let j = i + 1; j < bulletBalls.length; j++) {
                    if (checkBallCollision(bulletBalls[i], bulletBalls[j])) {
                        ballCollide(bulletBalls[i], bulletBalls[j]);
                    }
                }
            }
            bulletBalls.forEach((ball) => {
                ball.center.x += ball.vel.x * dt;
                ball.center.y += ball.vel.y * dt;
                bounceBall(ball, w, h);
                // Main ball collision
                if (checkBallCollision(ball, mainBall)) {
                    ballCollide(mainBall, ball);
                }
                ball.vel.y += 400 * dt;
            });
        }
        c.strokeText;
        bulletBalls.forEach((ball) => {
            ball.draw(c);
        });
        mainBall.draw(c);
        drawCannon(mousePosition, w, h);
        drawMouseCursor(mousePosition);
    }
    moveCursor(pos) {}
    /**
     * adds the ball
     * @param {Ball} ball
     */
    shoot(ball) {}
}
