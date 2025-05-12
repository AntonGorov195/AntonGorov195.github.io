/**
 *
 * @param {Vec2} pos
 */
function drawMouseCursor(ctx, pos) {
    const CURSOR_WIDTH = 3;
    const CURSOR_HEIGHT = 10;
    const OFFSET = 5;

    // Top
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(
        pos.x - CURSOR_WIDTH / 2,
        pos.y - CURSOR_HEIGHT - OFFSET,
        CURSOR_WIDTH,
        CURSOR_HEIGHT
    );
    ctx.fillRect(
        pos.x - CURSOR_WIDTH / 2,
        pos.y + OFFSET,
        CURSOR_WIDTH,
        CURSOR_HEIGHT
    );
    ctx.fillRect(
        pos.x + OFFSET,
        pos.y - CURSOR_WIDTH / 2,
        CURSOR_HEIGHT,
        CURSOR_WIDTH
    );
    ctx.fillRect(
        pos.x - OFFSET - CURSOR_HEIGHT,
        pos.y - CURSOR_WIDTH / 2,
        CURSOR_HEIGHT,
        CURSOR_WIDTH
    );
    ctx.fillStyle = "#c16161";
    ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
    ctx.fill();
}
/**
 *
 * @param {Vec2} aim
 * @param {number} w
 * @param {number} h
 */
function drawCannon(ctx, aim, w, h) {
    const CANNON_WIDTH = 25;
    const CANNON_LENGTH = 120;

    const angle = Math.atan2(aim.y - h, aim.x - w / 2);
    ctx.save();
    ctx.translate(w / 2, h);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillStyle = "#414141";
    ctx.fillRect(
        -CANNON_WIDTH / 2,
        -CANNON_LENGTH / 1.2,
        CANNON_WIDTH,
        CANNON_LENGTH
    );
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
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
    return sqrDist < (ball1.r + ball2.r) * (ball1.r + ball2.r);
}
