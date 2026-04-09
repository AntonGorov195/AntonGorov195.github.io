/**
 * @typedef {{x: number, y: number}} Vector2Object
 */

/**
 * 
 * @param {*} start 
 * @param {*} end 
 * @param {*} t 
 */

/**
 * 
 * @param {number} start 
 * @param {number} end 
 * @param {number} t 
 * @param {(t: number) => number | undefined} f 
 * @returns {number}
 */
function interpolate(start, end, t, f) {
    if (f === undefined) {
        f = (t) => t;
    }
    const interp = f(t);
    return start * (1 - interp) + end * interp;
}
class AntonHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
    <link rel='stylesheet' type='text/css' media='screen' href='/vars.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='/common.css'>
    <style>
        header {
            width: 100%;
            background-color: var(--main-bg-color);
            padding: 15px;
            font-weight: bold;
            display: flex;
            align-items: center;
        }
        h1 {
            text-decoration: underline;
        }
        header nav ul {
            display: flex;
            list-style: none;
            gap: 1rem;
            font-size: 1.3rem;
        }
    </style>
    <header>
        <a aria-label="Go to home page" href="/"><img alt="website logo" class="logo" src="/assets/logo-A.png" height="64"></a>
        <div class="header-title-container">
            <h1>
                Anton Gorov
            </h1>
            <nav>
                <ul>
                    <li><a aria-label="Go to home page" href="/">Home</a></li>
                    <li><a aria-label="Go to articles list page" href="/articles/">Articles</a></li>
                    <li><a aria-label="Go to projects list page" href="/">Projects</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `;
    }
}
class AntonArticles extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
    <link rel='stylesheet' type='text/css' media='screen' href='/vars.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='/common.css'>
    <style>
        ul {
            padding-left: 25px;
        }
    </style>
    <ul>
        <li>
            <a href="/articles/content-creation/">Be a Active, Not Just Passive</a>
        </li>
    </ul>
    `;
    }
}

customElements.define('anton-header', AntonHeader);
customElements.define('anton-articles', AntonArticles);

// not in global scope
function commonMain() {
    const canvas = document.createElement("canvas");
    canvas.id = "screenCanvas";
    document.body.prepend(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        console.error("2d canvas failed")
        return;
    }
    /**
     * @type {{
     * start_position: Vector2Object,
     * end_position:   Vector2Object,
     * time:           number,
     * duration:       number,
     * size:           number,
     * color:          string,
     * }[]}
     */
    const particles = [];
    /**
     * 
     * @param {number} time delta time, in milliseconds
     */
    let lastFrameTime = 0;
    function UpdateScreenCanvas(time) {
        const dt = time - lastFrameTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            let particle = particles[i];
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(
                interpolate(particle.start_position.x, particle.end_position.x, particle.time / particle.duration, Math.sqrt),
                interpolate(particle.start_position.y, particle.end_position.y, particle.time / particle.duration, Math.sqrt),
                particle.size,
                0,
                2 * Math.PI,
            )
            ctx.fill();

            particle.time += dt
            if (particle.time > particle.duration) {
                particles.splice(i, 1);
            }
        }
        lastFrameTime = time;
        requestAnimationFrame(UpdateScreenCanvas);
    }
    UpdateScreenCanvas(16);

    window.addEventListener("click", (event) => {
        // DISABLED
        // const x = event.clientX;
        // const y = event.clientY;
        // for (let i = 0; i < 50; i += 1) {
        //     const angle = Math.random() * Math.PI * 2;
        //     particles.push({
        //         color: "#ffdb39",
        //         duration: interpolate(100, 500, Math.random()),
        //         time: 0,
        //         size: interpolate(5, 10, Math.random()),
        //         start_position: {
        //             x: x,
        //             y: y,
        //         },
        //         end_position: {
        //             x: x + Math.cos(angle) * (interpolate(10, 100, Math.random())),
        //             y: y + Math.sin(angle) * (interpolate(10, 100, Math.random())),
        //         },
        //     });
        // }
    })
}
commonMain();