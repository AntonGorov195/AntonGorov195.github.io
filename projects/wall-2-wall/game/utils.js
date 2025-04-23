/**
 *
 * @param {number} radius
 * @param {number} mass
 * @param {Color} color
 * @param {Vec2 | undefined} initPos
 * @param {Vec2 | undefined} initVel
 * @returns {Ball}
 */
function makeBall(radius, mass, color, initPos, initVel) {
    return {
        radius: radius,
        mass: mass,
        color: color,
        isActive: true,
        pos: initPos ?? nullVector(),
        vel: initVel ?? nullVector(),
        draw: function () {
            c.beginPath();
            c.fillStyle = colorString(this.color);
            c.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
            c.fill();
            c.fillStyle = "black";
            c.closePath();
        },
    };
}
/**
 *
 * @param {Vec2} pos
 */
function drawMouseCursor(pos) {
    const CURSOR_WIDTH = 3;
    const CURSOR_HEIGHT = 10;
    const OFFSET = 5;

    // Top
    c.beginPath();
    c.fillStyle = "black";
    c.fillRect(
        pos.x - CURSOR_WIDTH / 2,
        pos.y - CURSOR_HEIGHT - OFFSET,
        CURSOR_WIDTH,
        CURSOR_HEIGHT
    );
    c.fillRect(
        pos.x - CURSOR_WIDTH / 2,
        pos.y + OFFSET,
        CURSOR_WIDTH,
        CURSOR_HEIGHT
    );
    c.fillRect(
        pos.x + OFFSET,
        pos.y - CURSOR_WIDTH / 2,
        CURSOR_HEIGHT,
        CURSOR_WIDTH
    );
    c.fillRect(
        pos.x - OFFSET - CURSOR_HEIGHT,
        pos.y - CURSOR_WIDTH / 2,
        CURSOR_HEIGHT,
        CURSOR_WIDTH
    );
    c.fillStyle = "#c16161";
    c.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
    c.fill();
}
/**
 *
 * @param {Vec2} aim
 * @param {number} w
 * @param {number} h
 */
function drawCannon(aim, w, h) {
    const CANNON_WIDTH = 25;
    const CANNON_LENGTH = 120;

    const angle = Math.atan2(aim.y - h, aim.x - w / 2);
    c.save();
    c.translate(w / 2, h);
    c.rotate(angle + Math.PI / 2);
    c.fillStyle = "#414141";
    c.fillRect(
        -CANNON_WIDTH / 2,
        -CANNON_LENGTH / 1.2,
        CANNON_WIDTH,
        CANNON_LENGTH
    );
    c.beginPath();
    c.fillStyle = "black";
    c.arc(0, 0, 25, 0, 2 * Math.PI);
    c.fill();
    c.closePath();
    c.restore();
}
/**
 *
 * @param {Ball} ball
 * @param {number} w
 * @param {number} h
 */
function bounceBall(ball, w, h) {
    if (ball.center.x + ball.r > w) {
        ball.center.x = w - ball.r;
        ball.vel.x *= -1;
    }
    if (ball.center.x - ball.r < 0) {
        ball.center.x = ball.r;
        ball.vel.x *= -1;
    }
    if (ball.center.y > h) {
        ball.isActive = false;
    }
    if (ball.center.y - ball.r < 0) {
        ball.center.y = ball.r;
        ball.vel.y *= -1;
    }
}
/**
 *
 * @param {Ball} ball1
 * @param {Ball} ball2
 * @returns
 */
function checkBallCollision(ball1, ball2) {
    // Main ball collision
    sqrDist =
        (ball1.center.x - ball2.center.x) * (ball1.center.x - ball2.center.x) +
        (ball1.center.y - ball2.center.y) * (ball1.center.y - ball2.center.y);
    return (
        sqrDist < (ball1.r + ball2.r) * (ball1.r + ball2.r)
    );
}
