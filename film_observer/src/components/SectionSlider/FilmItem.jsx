import React, {useEffect, useState} from 'react';
import classes from "./SectionSlider.module.css";
import {useNavigate} from "react-router";

const FilmItem = ({film, isDragging}) => {
    const router = useNavigate();
    const [bgColor, setBgColor] = useState('#5cda12');

    function setBgColorFromRating () {
        if (!film.rating.includes('%')) {
            if(film.rating >= 7) {
                setBgColor('rgba(59,179,59,0.8)');
            } else if (film.rating < 7 && film.rating > 5) {
                setBgColor('rgba(245,229,6,0.8)');
            } else {
                setBgColor('rgba(197,0,0,0.8)');
            }
        } else {
            let rating = film.rating.slice(-3, -1);
            if(rating >= 90) {
                setBgColor('rgba(92,218,18,0.8)');
            } else if (rating < 90 && rating > 50) {
                setBgColor('rgba(245,229,6,0.8)');
            } else {
                setBgColor('rgba(197,0,0,0.8)');
            }
        }
    }

    useEffect(() => {
        setBgColorFromRating();
    }, [bgColor])

    return (
        <div
            onMouseUp={() => {
                if (isDragging) {
                    return
                } else router(`films/${film.filmId}`);
            }}
            className={classes.film__item}
        >
            <img
                className={classes.film__poster}
                alt=""
                src={`https://kinopoiskapiunofficial.tech/images/posters/kp/${film.filmId}.jpg`}
            />
            <span style={{backgroundColor: bgColor}} className={classes.film__rating}>{film.rating}</span>
        </div>
    );
};

export default FilmItem;