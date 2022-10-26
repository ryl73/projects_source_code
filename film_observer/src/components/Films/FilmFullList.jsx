import React from 'react';
import FilmFullItem from "./FilmFullItem";
import classes from "./FilmFullStyle.module.css";

const FilmFullList = ({films, ...props}) => {
    return (
        <div className={classes.film__list}>
            {films.map((film) =>
                <FilmFullItem film={film} key={film.kinopoiskId ? film.kinopoiskId : film.filmId}/>
            )}
            {props.children}
        </div>
    );
};

export default FilmFullList;