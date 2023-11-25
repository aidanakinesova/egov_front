import classNames from "classnames";
import classes from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export const Header = () => {
    const { pathname } = useLocation();
    if (pathname === "/" || pathname === "/register") {
        return (
            <header className={classes.containerAuth}>
                <div className="d-flex align-items-center">
                    <Link to="/main"><img src={require("../../../assets/images/logo-egov.png")} alt="logo" width={125} height={38} className="me-2 mt-3"/></Link>
                    <div className={classNames(["ps-2 border-start", classes.phoneNumber])}>1414</div>
                </div>
                <div className={classNames([classes.lang])}>KK</div>
            </header>
        )
    } else {
        return (
            <header className="d-flex flex-column fixed-top z-3">
                <div className={classes.container}>
                    <div className="d-flex align-items-center">
                        <Link to="/main"><img src={require("../../../assets/images/logo-egov-green.png")} alt="logo" width={187} height={61} className="me-2 mt-3"/></Link>
                        <div className={classNames(["ps-2 border-start", classes.desc])}>Мемлекеттік қызметтер <br/> және онлайн ақпарат</div>
                    </div>
                    <div>KK</div>
                </div>
                <div className={classes.menu}>
                    <div><Link to="/personal-account">Личный кабинет</Link></div>
                    <div><Link to="/applications">Заявки</Link></div>
                </div>
            </header>
        )
    }
    
}