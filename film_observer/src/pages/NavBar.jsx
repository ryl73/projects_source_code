import React, {useContext, useEffect, useState} from 'react';
import logo from "../assets/icons/free-icon-3d-movie-4222072.png"
import {Link, NavLink} from "react-router-dom";
import SearchString from "../components/UI/SearchString/SearchString";
import {menuItems} from "./data/menu";
import Modal from "../components/UI/Modal/Modal";
import Login from "../components/Login/Login";
import {AuthContext} from "../components/context";

const NavBar = () => {
    const [modalActive, setModalActive] = useState(false);
    const {isAuth, setIsAuth} = useContext(AuthContext);

    useEffect(() => {
        if (isAuth) setModalActive(false)
    })

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__wrapper">
                    <div className="navbar__section">
                        <Link className="navbar__home" to="/">
                            <img className="navbar__logo" alt="" src={logo}/>
                            <span className="navbar__title">FilmObserver</span>
                        </Link>
                    </div>
                    <div className="navbar__section">
                        {menuItems.map((menuItem) =>
                            <NavLink
                                key={menuItem.id}
                                className={({ isActive }) => isActive ? "navbar__item active" : "navbar__item"}
                                to={menuItem.link}
                            >
                                {menuItem.genre}
                            </NavLink>
                        )}
                    </div>
                    <div className="navbar__section">
                        <SearchString inputWidth={400}/>
                        {!isAuth ? <div className="navbar__item" onClick={() => setModalActive(true)}>
                            Войти
                        </div> :
                        <div className="navbar__item" onClick={() => setIsAuth(false)}>
                            Выйти
                        </div>}
                        <Modal active={modalActive} setActive={setModalActive}>
                            <Login/>
                        </Modal>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;