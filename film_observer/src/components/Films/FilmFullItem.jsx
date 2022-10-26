import React from 'react';
import classes from "./FilmFullStyle.module.css";
import {useNavigate} from "react-router";

const FilmFullItem = ({film}) => {
    const router = useNavigate();
    return (
        <div className={classes.film__item}>
            <img
                onClick={() => router(`/films/${film.kinopoiskId ? film.kinopoiskId : film.filmId}`)}
                className={classes.film__poster}
                alt=""
                src={`https://kinopoiskapiunofficial.tech/images/posters/kp/${film.kinopoiskId ? film.kinopoiskId : film.filmId}.jpg`}
            />
        </div>
    );
};

export default FilmFullItem;