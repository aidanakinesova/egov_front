import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import classNames from "classnames";

export const AppContainer = () => {
    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Header />
            <main className={classNames(["d-flex flex-grow-1 container"])}>
                {/* <SideBar /> */}
                <div className="main-container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}