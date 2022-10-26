import React, {useEffect, useState} from 'react';
import classes from "./FilmFullStyle.module.css";
import {useFetching} from "../../hooks/useFetching";
import FilmService from "../../API/FilmService";
import {ReactComponent as FilterIcon} from "../../assets/icons/filter-free-icon-font.svg";
import FilterModal from "../UI/FilterModal/FilterModal";
import {Slider} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import Select from "../UI/Select/Select";

const FilterSidebar = ({defaultFilters, acceptFilters}) => {
    // Формируем состояния для списка жанров и стран
    const [filtersList, setFiltersList] = useState({genres: [], countries: []});
    // Фильтруем пустые значения жанров и стран
    filtersList.genres = filtersList.genres.filter((genre) => genre.genre !== '');
    filtersList.countries = filtersList.countries.filter((country) => country.country !== '');
    // Получаем список жанров и стран от сервера
    const [fetchFilters] = useFetching(async () => {
        const response = await FilmService.getFilters();
        setFiltersList(response.data);
    });

    useEffect(() => {
        fetchFilters();
        if (Number(searchParams.get('yearFrom')) === 0) {
            setYear(defaultYear);
        }
        if (Number(searchParams.get('ratingFrom')) === 0) {
            setRating(defaultRating);
        }
    }, []);

    const [searchParams] = useSearchParams();

    const defaultYear = [defaultFilters.yearFrom, defaultFilters.yearTo];
    const defaultRating = [defaultFilters.ratingFrom, defaultFilters.ratingTo];

    const [year, setYear] = useState([Number(searchParams.get('yearFrom')), Number(searchParams.get('yearTo'))]);
    const [rating, setRating] = useState([Number(searchParams.get('ratingFrom')), Number(searchParams.get('ratingTo'))]);

    const [filter, setFilter] = useState(defaultFilters);

    function setOrder (order) {
        acceptFilters({...filter, order: order});
        setFilter({...filter, order: order})
    }

    function applyFilters () {
        acceptFilters(filter);
    }

    function setDefaultFilters () {
        setFilter(defaultFilters);
        setYear(defaultYear);
        setRating(defaultRating);
        acceptFilters(defaultFilters);
        const item = document.querySelectorAll("li");
        for (let i = 0; i < item.length; i++) {
            item[i].classList.remove(classes.active);
        }
    }

    function makeActiveType (e) {
        const item = e.target.parentNode.querySelectorAll("a");
        if (e.target.classList.contains(classes.filterSidebar__type)) {
            for (let i = 0; i < item.length; i++) {
                item[i].classList.remove(classes.active);
            }
            e.target.classList.add(classes.active);
        }
        switch (e.target.innerHTML) {
            case 'Все': {
                acceptFilters({...filter, type: 'ALL'});
                setFilter({...filter, type: 'ALL'});
            }
                break;
            case 'Фильмы': {
                acceptFilters({...filter, type: 'FILM'});
                setFilter({...filter, type: 'FILM'});
            }
                break;
            case 'Сериалы': {
                acceptFilters({...filter, type: 'TV_SERIES'});
                setFilter({...filter, type: 'TV_SERIES'});
            }
                break;
        }
    }

    function makeActive (e) {
        const item = e.target.parentNode.querySelectorAll("li");
        if (e.target.classList.contains(classes.list__item)) {
            for (let i = 0; i < item.length; i++) {
                item[i].classList.remove(classes.active);
            }
            e.target.classList.add(classes.active);
        }
    }

    function setDefaultGenre () {
        setFilter({...filter, genres: defaultFilters.genres});
        const ul = document.querySelectorAll('ul');
        for (let i = 0; i < ul.length; i++) {
            if (ul[i].id === 'genre') {
                const li = ul[i].querySelectorAll('li');
                for (let j = 0; j < li.length; j++) {
                    li[j].classList.remove(classes.active);
                }
            }
        }
    }

    function setDefaultCountry () {
        setFilter({...filter, countries: defaultFilters.countries});
        const ul = document.querySelectorAll('ul');
        for (let i = 0; i < ul.length; i++) {
            if (ul[i].id === 'country') {
                const li = ul[i].querySelectorAll('li');
                for (let j = 0; j < li.length; j++) {
                    li[j].classList.remove(classes.active);
                }
            }
        }
    }

    function setYearClass () {
        if (
            ((year[0] !== defaultYear[0]) || (year[1] !== defaultYear[1]))
            ||
            (Number(searchParams.get('yearFrom')) !== defaultYear[0] || Number(searchParams.get('yearTo')) !== defaultYear[1])
        ) {
            return `${classes.filterSidebar__item} ${classes.active}`
        } else
            return classes.filterSidebar__item
    }

    function setGenresClass () {
        if ((searchParams.get('genres') !== defaultFilters.genres) || (filter.genres !== defaultFilters.genres)) {
            return `${classes.filterSidebar__item} ${classes.active}`
        } else
            return classes.filterSidebar__item
    }

    function setCountriesClass () {
        if ((searchParams.get('countries') !== defaultFilters.countries) || (filter.countries !== defaultFilters.countries)) {
            return `${classes.filterSidebar__item} ${classes.active}`
        } else
            return classes.filterSidebar__item
    }

    function setRatingClass () {
        if (
            ((rating[0] !== defaultRating[0]) || (rating[1] !== defaultRating[1]))
            ||
            (Number(searchParams.get('ratingFrom')) !== defaultRating[0] || Number(searchParams.get('ratingTo')) !== defaultRating[1])
        ) {
            return `${classes.filterSidebar__item} ${classes.active}`
        } else
            return classes.filterSidebar__item
    }

    return (
        <div className={classes.filterSidebar}>
            <div className={classes.filterSidebar__wrapper}>
                <div className={classes.filterSidebar__types} onClick={makeActiveType}>
                    <a className={searchParams.get('type') === 'ALL' ?
                        `${classes.filterSidebar__type} ${classes.active}` : classes.filterSidebar__type}>Все</a>
                    <a className={searchParams.get('type') === 'FILM' ?
                        `${classes.filterSidebar__type} ${classes.active}` : classes.filterSidebar__type}>Фильмы</a>
                    <a className={searchParams.get('type') === 'TV_SERIES' ?
                        `${classes.filterSidebar__type} ${classes.active}` : classes.filterSidebar__type}>Сериалы</a>
                </div>

                <div className={classes.filterSidebar__filters}>
                    <FilterIcon className={classes.filterSidebar__icon}/>
                    <h4>Фильтр</h4>
                    <div className={setYearClass()}>
                        <FilterModal
                            title="Год выпуска"
                            resetFilter={() => {
                                setFilter({
                                    ...filter,
                                    yearFrom: defaultFilters.yearFrom,
                                    yearTo: defaultFilters.yearTo
                                });
                                setYear(defaultYear);
                            }}
                        >
                            <Slider
                                value={year}
                                valueLabelDisplay="on"
                                onChange={(event, newValue) => {
                                    setYear(newValue);
                                    setFilter({...filter, yearFrom: newValue[0], yearTo: newValue[1]});
                                }}
                                min={1984}
                                max={2023}
                                sx={{
                                    color: '#c55b2a;',
                                    width: '244px',
                                    margin: '40px 28px 10px 28px',
                                }}
                            />
                        </FilterModal>
                    </div>
                    <div className={setGenresClass()}>
                        <FilterModal
                            title="Жанры"
                            resetFilter={setDefaultGenre}
                        >
                            <ul className={classes.list} id="genre" onClick={makeActive}>
                                {filtersList.genres.map((genre) =>
                                    <li
                                        key={genre.id}
                                        className={Number(searchParams.get('genres')) === genre.id ?
                                            `${classes.list__item} ${classes.active}` : classes.list__item}
                                        onClick={() => setFilter({...filter, genres: genre.id})}
                                    >
                                        {genre.genre}
                                    </li>
                                )}
                            </ul>
                        </FilterModal>
                    </div>
                    <div className={setCountriesClass()}>
                        <FilterModal
                            title="Страны"
                            resetFilter={setDefaultCountry}
                        >
                            <ul className={classes.list} id="country" onClick={makeActive}>
                                {filtersList.countries.map((country) =>
                                    <li
                                        key={country.id}
                                        className={Number(searchParams.get('countries')) === country.id ?
                                            `${classes.list__item} ${classes.active}` : classes.list__item}
                                        onClick={() => setFilter({...filter, countries: country.id})}
                                    >
                                        {country.country}
                                    </li>
                                )}
                            </ul>
                        </FilterModal>
                    </div>
                    <div className={setRatingClass()}>
                        <FilterModal
                            title="Рейтинг"
                            resetFilter={() => {
                                setFilter({
                                    ...filter,
                                    ratingFrom: defaultFilters.ratingFrom,
                                    ratingTo: defaultFilters.ratingTo
                                })
                                setRating(defaultRating);
                            }}
                        >
                            <Slider
                                value={rating}
                                valueLabelDisplay="on"
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                    setFilter({...filter, ratingFrom: newValue[0], ratingTo: newValue[1]});
                                }}
                                min={0}
                                max={10}
                                sx={{
                                    color: '#c55b2a;',
                                    width: '244px',
                                    margin: '40px 28px 10px 28px',
                                }}
                            />
                        </FilterModal>
                    </div>
                </div>
                <div className={classes.filterSidebar__btns}>
                    <button
                        className={classes.filterBtn}
                        onClick={applyFilters}
                    >
                        Применить фильтры
                    </button>
                    <button
                        className={classes.filterBtn}
                        onClick={setDefaultFilters}
                    >
                        {"\u2573"}{"\u00A0"}{"\u00A0"}Сбросить
                    </button>
                </div>
            </div>
            <div style={{display: 'flex', flexFlow: 'row', paddingBottom: '10px'}}>
                Сортировать по {"\u00A0"}
                <Select
                    defaultOption={{value: 'NUM_VOTE', name: 'популярности'}}
                    setOrder={setOrder}
                    options={[
                        {value: 'NUM_VOTE', name: 'популярности'},
                        {value: 'RATING', name: 'рейтингу'},
                        {value: 'YEAR', name: 'году'},
                    ]}
                />
            </div>
        </div>
    );
};

export default FilterSidebar;