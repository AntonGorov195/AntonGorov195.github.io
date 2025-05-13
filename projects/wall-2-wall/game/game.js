class Game {
    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {{
     *      mainBall: Ball,
     *      bulletBall: Ball,
     *      ceilHeight:number,
     *      wals
     * }} gameSettings
     */
    constructor(
        canvas, // Must
        {
            mainBall = new Ball(0, 1, new Color(0, 0, 0)),
            bulletBalls = [],
            ceilHeight = 0,
            gravity = 0,
            cursorPos = new Vec2(),
        } = {}
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.mainBall = mainBall;
        this.bulletBalls = bulletBalls;
        this.ceilHeight = ceilHeight;
        this.gravity = gravity;
        this.cursorPos = cursorPos;
        this.wallLeftIsActive = true;
        this.wallRightIsActive = true;
        this.score = 0;
        this.bestScore = localStorage.getItem("wall-2-wall-best-score") * 1;
    }
    /**
     * Advance the game by 'dt' seconds.
     * @param {number} dt
     */
    update(dt) {
        if (!this.mainBall.isActive) {
            return;
        }
        const w = this.canvas.width;
        const h = this.canvas.height;
        if (this.wallLeftIsActive) {
            this.canvas.parentElement.style.borderLeftColor = "green";
        } else {
            this.canvas.parentElement.style.borderLeftColor = "red";
        }
        if (this.wallRightIsActive) {
            this.canvas.parentElement.style.borderRightColor = "green";
        } else {
            this.canvas.parentElement.style.borderRightColor = "red";
        }
        this.bulletBalls = this.bulletBalls.filter((ball) => {
            return ball.isActive;
        });
        {
            this.mainBall.center.x += this.mainBall.vel.x * dt;
            this.mainBall.center.y += this.mainBall.vel.y * dt;
            // bounceBall(this.mainBall, w, h);
            {
                if (this.mainBall.center.x + this.mainBall.r > w) {
                    this.mainBall.center.x = w - this.mainBall.r;
                    this.mainBall.vel.x *= -1;
                    if (this.wallRightIsActive) {
                        this.wallRightIsActive = false;
                        this.wallLeftIsActive = true;
                        this.score += 1;
                    }
                }
                if (this.mainBall.center.x - this.mainBall.r < 0) {
                    this.mainBall.center.x = this.mainBall.r;
                    this.mainBall.vel.x *= -1;
                    if (this.wallLeftIsActive) {
                        this.wallLeftIsActive = false;
                        this.wallRightIsActive = true;
                        this.score += 1;
                    }
                }
                if (this.mainBall.center.y - this.mainBall.r > h) {
                    this.mainBall.isActive = false;
                    this.canvas.style.display = "none";
                    document.getElementById("game-ui").style.display = "flex";
                    this.canvas.parentElement.style.borderRightColor = "white";
                    this.canvas.parentElement.style.borderLeftColor = "white";
                }
                if (this.mainBall.center.y - this.mainBall.r < 0) {
                    this.mainBall.center.y = this.mainBall.r;
                    this.mainBall.vel.y *= -1;
                }
            }
            this.mainBall.vel.y += this.gravity * dt;

            for (let i = 0; i < this.bulletBalls.length; i++) {
                for (let j = i + 1; j < this.bulletBalls.length; j++) {
                    if (
                        checkBallCollision(
                            this.bulletBalls[i],
                            this.bulletBalls[j]
                        )
                    ) {
                        ballCollide(this.bulletBalls[i], this.bulletBalls[j]);
                    }
                }
            }
            this.bulletBalls.forEach((ball) => {
                ball.center.x += ball.vel.x * dt;
                ball.center.y += ball.vel.y * dt;
                bounceBall(ball, w, h);
                // Main ball collision
                if (checkBallCollision(ball, this.mainBall)) {
                    ballCollide(this.mainBall, ball);
                }
                ball.vel.y += this.gravity * dt;
            });
        }
        this.ctx.fillStyle = "skyblue";
        this.ctx.fillRect(0, 0, w, h);
        this.bulletBalls.forEach((ball) => {
            ball.draw(this.ctx);
        });
        this.mainBall.draw(this.ctx);
        drawCannon(this.ctx, this.cursorPos, w, h);
        drawMouseCursor(this.ctx, this.cursorPos);
        this.ctx.font = "30px Monospace";
        this.ctx.fillText(`score: ${this.score}`, 100, 100);
        if (this.bestScore > 0) {
            this.ctx.fillText(`best score: ${this.bestScore}`, 100, 130);
        }
        if (this.score > this.bestScore) {
            localStorage.setItem("wall-2-wall-best-score", this.score + "");
        }
    }
    moveCursor(pos) {
        this.cursorPos = pos;
    }
    /**
     * adds the ball
     * @param {Ball} ball
     */
    shoot(ball) {
        const angle =
            -Math.atan2(
                this.cursorPos.y - this.canvas.height,
                this.cursorPos.x - this.canvas.width / 2
            ) +
            Math.PI / 2;

        ball.center = new Vec2(this.canvas.width / 2, this.canvas.height);
        ball.vel = new Vec2(1000 * Math.sin(angle), 1000 * Math.cos(angle));

        this.bulletBalls.push(ball);
    }
}
/**
 * Handles elastic collision and overlap resolution between two Ball instances.
 * @param {Ball} ball1
 * @param {Ball} ball2
 */
function ballCollide(ball1, ball2) {
    // Idea: use relativity + conservation of momentum + Minkowski sum.
    // In this version ball1 is moving while ball2 is not in motion.
    // By finding the velocity of ball1 after collision you can find the velocity of ball2.
    // Ball1 is a single point and ball2 is a circle with radius equal to the sum of the balls.
    const offset = ball2.center.subtract(ball1.center); // end - start
    const distSqr = offset.dot(offset);
    const radiiSum = ball1.r + ball2.r;

    // No collision
    if (distSqr > radiiSum * radiiSum) {
        return;
    }

    // Don't divide by zero
    if (distSqr < 0.0001) {
        ball1.center += 0.0001;
        ballCollide(ball1, ball2);
        return;
    }
    const offsetNorm = offset.normalize();
    const dist = Math.sqrt(distSqr);
    {
        // overlap
        const overlap = radiiSum - dist;
        const resolver = offsetNorm.scale(overlap / 2);
        ball1.center = ball1.center.subtract(resolver);
        ball2.center = ball2.center.add(resolver);
    }

    const m1 = ball1.mass;
    const m2 = ball2.mass;
    const mr = m1 / m2;
    
    const vel1 = ball1.vel;
    const sv = ball1.vel.subtract(ball2.vel);
    const fvec = new Vec2(sv.x, sv.y).scale(mr / (mr + 1));
    const rvec = sv.reflect(offsetNorm).scale(1 / (mr + 1));
    
    const ev = fvec.add(rvec)
    ball1.vel = ev.add(ball2.vel)
    ball2.vel = vel1.scale(m1).add(ball2.vel.scale(m2)).subtract(ball1.vel.scale(m1)).scale( 1 / m2);
}
