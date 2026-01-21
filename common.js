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
            border-style: dashed;
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
        <a href="/"><img class="logo" src="/assets/logo-A.png" height="64"></a>
        <div class="header-title-container">
            <h1>
                Anton Gorov
            </h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/articles/">Articles</a></li>
                    <li><a href="/">Projects</a></li>
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
            <a href="/articles/content-creation/">Be a Creator, Not a Consumer</a>
        </li>
    </ul>
    `;
    }
}

customElements.define('anton-header', AntonHeader);
customElements.define('anton-articles', AntonArticles);