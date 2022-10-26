import React, {useContext, useRef, useState} from 'react';
import classes from "./Login.module.css";
import {users} from "../../pages/data/users";
import {AuthContext} from "../context";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const registrationUsernameRef = useRef(null);
    const registrationEmailRef = useRef(null);
    const [positionX, setPositionX] = useState(0);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [registrationUsername, setRegistrationUsername] = useState('');
    const [registrationPassword, setRegistrationPassword] = useState('');
    const [registrationEmail, setRegistrationEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);

    function moveFrame (e) {
        const ul = document.querySelector('ul');
        const notRegistered = document.getElementById('forgot')
        const a = notRegistered.querySelectorAll('a');
        const li = ul.querySelectorAll('li');
        const login = li[0].querySelector('a');
        const signUp = li[1].querySelector('a');
        if (e.target === login) {
            setPositionX(0);
            signUp.parentNode.classList.remove(classes.active);
            e.target.parentNode.classList.add(classes.active);
        }
        if (e.target === signUp) {
            setPositionX(-390);
            login.parentNode.classList.remove(classes.active);
            e.target.parentNode.classList.add(classes.active);
        }
        if (e.target === a[1]) {
            setPositionX(-390);
            login.parentNode.classList.remove(classes.active);
            signUp.parentNode.classList.add(classes.active);
        }
    }

    function usernameChangeHandler (e) {
        setUsernameValue(e.target.value);
        usernameRef.current.style.display = 'none';
    }

    function passwordChangeHandler (e) {
        setPasswordValue(e.target.value);
        passwordRef.current.style.display = 'none';
    }

    function registrationUsernameChangeHandler (e) {
        setRegistrationUsername(e.target.value);
        registrationUsernameRef.current.style.display = 'none';
    }

    function registrationEmailChangeHandler (e) {
        setRegistrationEmail(e.target.value);
        registrationEmailRef.current.style.display = 'none';
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!EMAIL_REGEXP.test(e.target.value)) {
            setEmailDirty(true);
        } else {
            setEmailDirty(false);
        }
        console.log(emailDirty)
    }

    function checkProfile (e) {
        e.preventDefault();
        for (let user of users) {
            if (user.userName === usernameValue) {
                if (user.password === passwordValue) {
                    usernameRef.current.style.display = 'none';
                    passwordRef.current.style.display = 'none';
                    setIsAuth(true);
                    return
                } else {
                    usernameRef.current.style.display = 'none';
                    passwordRef.current.style.display = 'block';
                }
            } else {
                usernameRef.current.style.display = 'block';
                passwordRef.current.style.display = 'none';
            }
        }
    }

    function createProfile (e) {
        e.preventDefault();
        const ul = document.querySelector('ul');
        const li = ul.querySelectorAll('li');
        const login = li[0].querySelector('a');
        const signUp = li[1].querySelector('a');
        let isOk = true;
        for (let user of users) {
            if (user.userName === registrationUsername) {
                registrationUsernameRef.current.style.display = 'block';
                isOk = false;
                return;
            } else if (user.email === registrationEmail) {
                registrationEmailRef.current.style.display = 'block';
                isOk = false;
                return;
            } else isOk = true;
        }

        if (isOk && !emailDirty) {
            users.push({
                userName: registrationUsername,
                password: registrationPassword,
                email: registrationEmail,
            })
            setRegistrationUsername('');
            setRegistrationPassword('');
            setRegistrationEmail('');
            setPositionX(0);
            signUp.parentNode.classList.remove(classes.active);
            login.parentNode.classList.add(classes.active);
        }
    }

    return (
        <div className={classes.login}>
            <ul className={classes.login__links} onClick={moveFrame}>
                <li className={classes.active}><a>Войти</a></li>
                <li><a>Зарегистироваться</a></li>
            </ul>
            <div className={classes.frames} style={{transform: `translateX(${positionX}px)`}}>
                <div className={classes.frame}>
                    <form className={classes.login__form}>
                        <div className={classes.login__section}>
                            <label className={classes.login__label} htmlFor="username">
                                Имя пользователя
                            </label>
                            <input
                                id="username"
                                className={classes.login__input}
                                type="text"
                                name="username"
                                onChange={usernameChangeHandler}
                            />
                            <div className={classes.wrongField} ref={usernameRef}>Неверное имя пользователя</div>
                        </div>
                        <div className={classes.login__section}>
                            <label className={classes.login__label} htmlFor="password">Пароль</label>
                            <input
                                id="password"
                                className={classes.login__input}
                                type="password"
                                name="password"
                                onChange={passwordChangeHandler}
                            />
                            <div className={classes.wrongField} ref={passwordRef}>Неверный пароль</div>
                        </div>
                        <div className={classes.login__sectionCheckbox}>
                            <label className={classes.switch}>
                                <input type="checkbox"/>
                                <span className={classes.slider}></span>
                            </label>
                            <label className={classes.login__label} htmlFor="checkbox">
                                Оставаться в системе?
                            </label>
                        </div>
                        <button className={classes.login__btn} type="submit" onClick={checkProfile}>Войти</button>
                        <div className={classes.login__forgotPassword} id="forgot">
                            <a>Забыли свой пароль?</a>
                            <a onClick={moveFrame}>Нет учетной записи?</a>
                        </div>
                    </form>
                </div>
                <div className={classes.frame}>
                    <form className={classes.login__form}>
                        <div className={classes.login__section}>
                            <label className={classes.login__label} htmlFor="username">
                                Имя пользователя
                            </label>
                            <input
                                value={registrationUsername}
                                className={classes.login__input}
                                type="text"
                                name="username"
                                onChange={registrationUsernameChangeHandler}
                            />
                            <div className={classes.wrongField} ref={registrationUsernameRef}>
                                Такое имя пользователя уже существует
                            </div>
                        </div>
                        <div className={classes.login__section}>
                            <label className={classes.login__label} htmlFor="email">E-mail</label>
                            <input
                                value={registrationEmail}
                                className={classes.login__input}
                                type="email"
                                name="email"
                                onChange={registrationEmailChangeHandler}
                            />
                            <div className={classes.wrongField} ref={registrationEmailRef}>
                                Такой e-mail уже существует
                            </div>
                            {emailDirty && <div className={classes.wrongField} style={{display: 'block'}}>
                                Введите корректный e-mail
                            </div>}
                        </div>
                        <div className={classes.login__section}>
                            <label className={classes.login__label} htmlFor="password">Пароль</label>
                            <input
                                value={registrationPassword}
                                className={classes.login__input}
                                type="password"
                                name="password"
                                onChange={(e) => setRegistrationPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className={classes.login__btn}
                            type="submit"
                            style={{marginTop: '20px'}}
                            onClick={createProfile}
                        >
                            Зарегистироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;