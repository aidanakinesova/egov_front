import React, { useState } from "react";

export const Login = (props) => {
    const [iinbin, setIINBIN] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(iinbin);
    }

    return (
        <div>
        <header>
            <a href="https://egov.kz/">
                <img className="logo" src="/idp/images/logoegov-e7e0829bcb587b1ad9b6e2cf64023c9f.png" alt="logo"></img>
            </a>
            <nav>
                <ul className="nav__links">
                    <li><a href="#">Тіркелу</a></li>
                </ul>
            </nav>
        </header>
        <body>
            <div className="auth-form-container">
                <h2>Порталға кіру</h2>
                <div className="mt-0">
                    <span className="mainword">
                    Құрметті пайдаланушылар!</span>
                </div>
                <div className="mt-0">
                    <span>Сіздің бейініңіздің қауіпсіздігін арттыру
                    және қорғау мақсатында Сізге авторизациялау көп
                    факторлы авторизация (логин (ЖСН/БСН) және пароль
                    енгізілгеннен кейін ЭЦҚ міндетті түрде қол қою)
                    қолданылатынын хабарлаймыз.Осы тәсіл Қазақстан
                    Республикасы Үкіметінің 2016 жылғы 20 желтоқсандағы
                    №832 қаулысымен бекітілген
                    ақпараттық-коммуникациялық технологиялар және
                    ақпараттық қауіпсіздікті қамтамасыз ету саласындағы
                    бірыңғай талаптарға сәйкес енгізіледі.</span>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="iinbin">ЖСН немесе БСН *</label>
                    <input value={iinbin} onChange={(e) => setIINBIN(e.target.value)}type="text" placeholder="------------" id="iinbin" name="iinbin" />
                    <label htmlFor="password">Жасырын сөз *</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Жасырын сөзді ұмыттыңыз ба?</button>
                    <button type="submit">Жүйеге кіру</button>
                </form>
            </div>
        </body>
        </div>
    )
}