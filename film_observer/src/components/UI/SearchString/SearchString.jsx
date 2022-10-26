import React, {useEffect, useState} from 'react';
import {ReactComponent as SearchIcon} from "../../../assets/icons/search-free-icon-font.svg";
import classes from "./SearchString.module.css";
import {useFetching} from "../../../hooks/useFetching";
import FilmService from "../../../API/FilmService";
import {useNavigate} from "react-router";
import FilmCard from "../../FilmCard/FilmCard";
import Loader from "../Loader/Loader";

const SearchString = ({inputWidth}) => {
    const [inputStyle, setInputStyle] = useState(['0', '0']);
    const [showIcon, setShowIcon] = useState([true, false]);
    const [showDropDown, setShowDropDown] = useState('0');
    const [keyword, setKeyword] = useState('');
    const [defaultFilms, setDefaultFilms] = useState([]);
    const [filmsByKeyword, setFilmsByKeyword] = useState([]);
    const [filmCount, setFilmCount] = useState(1);

    const [fetchFilms, isFilmsLoading, filmError] = useFetching(async () => {
        const responseFilms = await FilmService.getFilmByKeyWord(keyword, 1);
        setFilmsByKeyword(responseFilms.data.films);
        setFilmCount(responseFilms.data.searchFilmsCountResult);
        const responseDefaultFilms = await FilmService.getTop('TOP_100_POPULAR_FILMS');
        setDefaultFilms(responseDefaultFilms.data.films);
    })

    useEffect(() => {
        fetchFilms();
    }, [keyword])


    function toggleSearchString () {
        const input = document.querySelector('input');
        setInputStyle(['1', `${inputWidth}px`]);
        setShowIcon([false, true]);
        input.focus();
        if (showIcon[0] === false && showIcon[1] === true) {
            input.blur();
            setInputStyle(['0', '0']);
            setShowIcon([true, false]);
        }
    }

    return (
        <div className={classes.input__wrapper}>
            <div
                onFocus={() => setShowDropDown('400px')}
                onBlur={() => setShowDropDown('0')}
                tabIndex={-1}
            >
                <input
                    value={keyword}
                    style={{opacity: inputStyle[0], width: inputStyle[1]}}
                    className={classes.input}
                    placeholder="Найти фильмы и сериалы"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div
                    className={classes.input__dropDown}
                    style={{width: inputStyle[1], maxHeight: showDropDown}}
                >
                    {(isFilmsLoading) ? <Loader/> :
                        (keyword !== '') ?
                            <FilmCard filmList={filmsByKeyword}/> :
                            <FilmCard filmList={defaultFilms}/>}
                    {(filmCount === 0 && keyword !== '' && !isFilmsLoading) && <div className={classes.nothingFound}>
                        По вашему запросу ничего не найдено
                    </div>}
                </div>
            </div>

            <div className="navbar__item" id="search" onClick={toggleSearchString}>
                <SearchIcon
                    style={{display: (showIcon[0]) ? 'block' : 'none'}}
                    className={classes.icon}
                />
                <div
                    style={{display: (showIcon[1]) ? 'block' : 'none', marginTop: '-5px'}}
                    className={classes.icon}
                >
                    {"\u2573"}
                </div>
            </div>
        </div>
    );
};

export default SearchString;