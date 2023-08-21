import React, {useEffect, useState} from "react";

function HeaderThemeSwitcher() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') == null ? "auto" : localStorage.getItem('theme'));
    let themeToIcon = {
        light: "bi-sun", dark: "bi-moon-stars", auto: "bi-circle-half"
    };
    useEffect(() => {
        localStorage.setItem('theme', theme);

        let renderTheme = theme;
        if ("auto" === theme) {
            renderTheme = "light";
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                renderTheme = "dark";
            }
        }
        document.body.setAttribute('data-bs-theme', renderTheme);
    }, [theme]);

    return (<div className={"border-end border-1 pe-3 me-3"}>
        <div className="btn-group h-100">
            <button type="button" className="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false">
                <i className={"bi " + themeToIcon[theme]}> </i>
            </button>
            <ul className="dropdown-menu">
                {Object.keys(themeToIcon).map(key => <li key={"HeaderThemeSwitcher" + key}>
                    <button type="button" className="btn btn-link dropdown-item" onClick={() => setTheme(key)}><i
                        className={"bi " + themeToIcon[key]}> </i>{key}</button>
                </li>)}
            </ul>
        </div>
    </div>);
}

export default HeaderThemeSwitcher;


