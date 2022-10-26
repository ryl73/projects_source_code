import React, {forwardRef} from 'react';
import FilmItem from "./FilmItem";
import classes from "./SectionSlider.module.css";
import {ReactComponent as Arrow} from "../../assets/icons/arrow-small-right-free-icon-font.svg";
import {Link} from "react-router-dom";

const FilmList = forwardRef(({films, style, title, isDragging}, ref) => {
    return (
        <div className={classes.film__list} style={style} ref={ref}>
            {films.map(film =>
                <FilmItem key={film.filmId} film={film} isDragging={isDragging}/>
            )}
            {films.length > 5 &&
                <Link
                    className={classes.showAllBtn__wrapper}
                    to={title === 'Топ 250 КиноПоиска' ? 'tops/KP_250' :
                        title === 'Топ 100 популярных фильмов' ? 'tops/top_100' :
                            'tops/top_await'}
                >
                    <p className={classes.showAllBtn__text}>Показать все</p>
                    <Arrow className={classes.showAllBtn}></Arrow>
                </Link>
            }
        </div>
    );
});

export default FilmList;