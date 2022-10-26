import './styles/App.css';
import NavBar from "./pages/NavBar";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import React, {useState} from "react";
import AppRoutes from "./components/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import {AuthContext} from "./components/context";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <Router>
                <ScrollToTop/>
                <NavBar/>
                <AppRoutes/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
