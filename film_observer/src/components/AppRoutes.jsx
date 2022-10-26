import React from 'react';
import MainPage from "../pages/MainPage";
import {Routes, Route, Navigate} from "react-router";
import AllFilmsPage from "../pages/AllFilmsPage";
import FilmIdPage from "../pages/FilmIdPage";
import PersonIdPage from "../pages/PersonIdPage";

const AppRoutes = () => {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="filters/" element={<AllFilmsPage/>}/>
                <Route path="tops/KP_250" element={<AllFilmsPage topName={'TOP_250_BEST_FILMS'}/>}/>
                <Route path="tops/top_100" element={<AllFilmsPage topName={'TOP_100_POPULAR_FILMS'}/>}/>
                <Route path="tops/top_await" element={<AllFilmsPage topName={'TOP_AWAIT_FILMS'}/>}/>
                <Route path="films/:id" element={<FilmIdPage />}/>
                <Route path="persons/:id" element={<PersonIdPage />}/>
                <Route path="/*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
};

export default AppRoutes;