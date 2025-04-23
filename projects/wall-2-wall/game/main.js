/** @type {WallData} */
const wallData = {
    activeColor: new Color(0, 1, 0),
};

/** @type {Ball[]} */
let bulletBalls = [];
let mousePosition = new Vec2();

const gameCanvas = document.getElementById("game-canvas");
const c = gameCanvas.getContext("2d");

/** @type {Game} */
let game;
{
    // Init game
    const gameCanvas = document.getElementById("game-canvas");
    const ctx = gameCanvas.getContext("2d");
    const mainBall = new Ball(
        40,
        1,
        new Color(1, 0, 0),
        new Vec2(200, 200),
        new Vec2(100 * Math.PI, 50 * Math.E)
    );
    const wallSetting = new WallsSetting(
        new Color(0, 1, 0),
        new Color(1, 0, 0)
    );
    const DEFAULT_WALL_WIDTH = 20;
    const walls = [
        new Wall(0, DEFAULT_WALL_WIDTH, true),
        new Wall(gameCanvas.w - DEFAULT_WALL_WIDTH, DEFAULT_WALL_WIDTH, true),
    ];

    game = new Game();
}
const mainBall = new Ball(
    40,
    1,
    new Color(1, 0, 0),
    new Vec2(200, 200),
    new Vec2(100 * Math.PI, 50 * Math.E)
);
let score = 0;
let isWin = false;

let dt = 1 / 60;
if (c === null) {
    console.error("Failed to create a canvas 2d context.");
}

let w = gameCanvas.width;
let h = gameCanvas.height;
function update(delta) {
    // dt = 1 / (delta / 1000);
    // console.log(dt);
    requestAnimationFrame(update);
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
update(16);
function gameUpdate() {
    const FIXED_DT = 1 / 60; 
    // game.update(FIXED_DT);
    requestAnimationFrame(gameUpdate);
}
gameUpdate();
window.addEventListener("mousedown", (e) => {
    const angle =
        -Math.atan2(mousePosition.y - h, mousePosition.x - w / 2) + Math.PI / 2;
    const ball = new Ball(
        20,
        0.5,
        new Color(1, 1, 0),
        new Vec2(w / 2, h),
        new Vec2(1000 * Math.sin(angle), 1000 * Math.cos(angle))
    );
    bulletBalls.push(ball);
    game.shoot();
});
window.addEventListener("mousemove", (e) => {
    const rect = gameCanvas.getBoundingClientRect();
    const pos = new Vec2(
        e.pageX - rect.left - window.scrollX,
        e.pageY - rect.top - window.scrollY,
    );
    mousePosition = pos;
    w = gameCanvas.width;
    h = gameCanvas.height;
    game.moveCursor(pos);
});
function advancePhys() {}
/**
 * Handles elastic collision and overlap resolution between two Ball instances.
 * @param {Ball} ball1
 * @param {Ball} ball2
 */
function ballCollide(ball1, ball2) {
    const offset = ball2.center.subtract(ball1.center);
    const distanceSq = offset.dot(offset);
    const radiiSum = ball1.r + ball2.r;
    const radiiSumSq = radiiSum * radiiSum;

    // Avoid divide-by-zero and unnecessary processing
    if (distanceSq === 0 || distanceSq > radiiSumSq) return;

    const normal = offset.normalize();

    const v1 = ball1.vel;
    const v2 = ball2.vel;
    const m1 = ball1.mass;
    const m2 = ball2.mass;

    const v1n = v1.dot(normal);
    const v2n = v2.dot(normal);

    // Compute new velocities along the normal using elastic collision equations
    const v1nPrime = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);
    const v2nPrime = (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2);

    // Final velocities = original velocity + delta along normal
    const v1Final = v1.add(normal.scale(v1nPrime - v1n));
    const v2Final = v2.add(normal.scale(v2nPrime - v2n));

    ball1.vel = v1Final;
    ball2.vel = v2Final;

    // --- Resolve positional overlap ---
    const distance = Math.sqrt(distanceSq);
    const overlap = radiiSum - distance;

    if (overlap > 0) {
        const correction = normal.scale(overlap / 2);
        ball1.center = ball1.center.subtract(correction);
        ball2.center = ball2.center.add(correction);
    }
}
function makeGame() {}
// circle_collide :: proc(circle1, circle2: ^Circle) {
// 	using raylib
//
// 	m1 := circle1.mass
// 	m2 := circle2.mass
//
// 	v1 := circle1.velocity
// 	v2 := circle2.velocity
//
// 	offset := circle2.center - circle1.center
// 	distance_sq := offset.x*offset.x + offset.y*offset.y
// 	radii_sum := circle1.radius + circle2.radius
// 	radii_sum_sq := radii_sum * radii_sum
//
// 	// Prevent divide-by-zero
// 	if distance_sq == 0 {
// 		return
// 	}
//
// 	// Check for collision (based on distance between centers)
// 	if distance_sq > radii_sum_sq {
// 		return
// 	}
//
// 	// Collision normal
// 	normal := linalg.normalize(offset)
//
// 	// Project velocities onto normal
// 	v1n := linalg.dot(v1, normal)
// 	v2n := linalg.dot(v2, normal)
//
// 	// Compute new normal velocities using elastic collision formula
// 	v1n_prime := (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2)
// 	v2n_prime := (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2)
//
// 	// Update velocities along the normal
// 	circle1.velocity += (v1n_prime - v1n) * normal
// 	circle2.velocity += (v2n_prime - v2n) * normal
//
// 	// --- Positional resolution ---
//
// 	distance := linalg.sqrt(distance_sq)
// 	overlap := radii_sum - distance
//
// 	// Only resolve if there's overlap
// 	if overlap > 0 {
// 		resolve_vector := normal * (overlap / 2)
// 		circle1.center -= resolve_vector
// 		circle2.center += resolve_vector
// 	}
// }
