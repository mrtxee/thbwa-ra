import React, {useEffect, useState} from "react";

function HeaderThemeSwitcher() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') == null ? "auto" : localStorage.getItem('theme'));
    let themeToIcon = {
        light: "bi-sun",
        dark: "bi-moon-stars",
        auto: "bi-circle-half"
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

    return (
        <div className="btn-group">
            <a href="#" className="nav-link px-2 dropdown-toggle" data-bs-toggle="dropdown"
               aria-expanded="false">
                <i className={"bi " + themeToIcon[theme]}> </i>
            </a>
            <ul className="dropdown-menu dropdown-menu-start">
                {Object.keys(themeToIcon).map(key =>
                    <li key={"HeaderThemeSwitcher" + key}>
                        <a className="dropdown-item" href="#" onClick={() => setTheme(key)}><i
                            className={"bi " + themeToIcon[key]}> </i>{key}</a>
                    </li>
                )
                }
            </ul>
        </div>
    );
}

export default HeaderThemeSwitcher;


