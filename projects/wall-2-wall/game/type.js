/**
 * @typedef {() => void} DrawFunc
 */
/**
 * @typedef {{
 *      pos:Vec2,
 *      dir:Vec2,
 *      draw: DrawFunc,
 *      makeBall: () => Ball,
 *  }} Cannon
 */
/**
 * @typedef {{
 *      isActive:boolean,
 *      x:number,
 *      width:number
 * }} Wall
 */
/**
 * @typedef {{
 *      activeColor:Color,
 *      inactiveColor:Color,
 *      walls: Wall[]
 * }} WallsData
 */
/**
 * Represents a 2D vector with x and y components.
 */
class Vec2 {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;
    }
    /**
     * @param {Vec2} v
     * @returns {Vec2}
     */
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    /**
     * @param {Vec2} v
     * @returns {Vec2}
     */
    subtract(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    /**
     * @param {number} scalar
     * @returns {Vec2}
     */
    scale(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    /**
     * @param {Vec2} v
     * @returns {number}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * @returns {number}
     */
    magnitude() {
        return Math.sqrt(this.dot(this));
    }

    /**
     * @returns {Vec2}
     */
    normalize() {
        const mag = this.magnitude();
        return new Vec2(this.x / mag, this.y / mag);
    }
    /**
     *
     * @param {Vec2} normal
     * @returns {Vec2}
     */
    reflect(normal) {
        const dotProduct = this.dot(normal);
        const scaledNormal = normal.scale(2 * dotProduct);
        return this.subtract(scaledNormal);
    }
}
/**
 * Class that represents a color with values between 0 to 1.
 */
class Color {
    /**
     *
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     */
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     *
     * @returns {String}
     */
    toString() {
        return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${
            this.a
        })`;
    }
}
class Ball {
    /**
     *
     * @param {number} r
     * @param {number} mass
     * @param {Color} color
     * @param {Vec2} center
     * @param {Vec2} vel
     * @param {boolean} isActive
     */
    constructor(
        r,
        mass,
        color,
        center = new Vec2(),
        vel = new Vec2(),
        isActive = true
    ) {
        this.r = r;
        this.mass = mass;
        this.color = color;
        this.center = center;
        this.vel = vel;
        this.isActive = isActive;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color.toString();
        ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.closePath();
    }
}
class WallsSetting {
    constructor(activeColor, inactiveColor) {
        this.activeColor = activeColor;
        this.inactiveColor = inactiveColor;
    }
}
class Wall {
    /**
     *
     * @param {number} x
     * @param {number} width
     * @param {boolean} isActive
     */
    constructor(x, width, isActive = true) {
        this.x = x;
        this.width = width;
        this.isActive = isActive;
    }
}