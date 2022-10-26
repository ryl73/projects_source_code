import React from 'react';
import classes from "./FilmCard.module.css";
import {useNavigate} from "react-router";

const FilmCard = ({filmList}) => {
    let router = useNavigate();

    return (
        <div className={classes.filmCardList}>
            {filmList.map((film) =>
            <a
                className={classes.filmCard}
                onClick={() => {
                    router(`films/${film.filmId}`);
                    window.location.reload();
                }}
                key={film.filmId}
            >
                <img
                    className={classes.filmPoster}
                    alt=""
                    src={`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${film.filmId}.jpg`}
                />
                <div className={classes.filmDescription}>
                    <h4>{film.nameRu ? film.nameRu : film.nameEn}</h4>
                    <p>{(film.rating !== 'null') ? film.rating : ''}</p>
                    <p>{film.type === 'FILM' ? 'Фильм,' : film.type ? 'Сериал,' : ''}{film.year}</p>
                </div>
            </a>
            )}
        </div>
    );
};

export default FilmCard;