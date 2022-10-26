import React, {useEffect, useRef, useState} from 'react';
import FilmFullList from "../components/Films/FilmFullList";
import FilterSidebar from "../components/Films/FilterSidebar";
import {useFetching} from "../hooks/useFetching";
import FilmService from "../API/FilmService";
import {useObserver} from "../hooks/useObserver";
import Loader from "../components/UI/Loader/Loader";
import {useSearchParams} from "react-router-dom";

const AllFilmsPage = ({topName}) => {
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const lastElement = useRef();
    const defaultFilters = {
            order: "NUM_VOTE",
            type: 'ALL',
            countries: '',
            genres: '',
            ratingFrom: 8,
            ratingTo: 10,
            yearFrom: 2000,
            yearTo: 2022,
        };
    const [filters, setFilters] = useState(defaultFilters);
    const [searchParams, setSearchParams] = useSearchParams(defaultFilters);

    const [fetchFilms, isFilmsLoading, filmError] = useFetching(async () => {
        const response = await FilmService.getFilmByFilter(searchParams.toString(), page);
        setFilms([...films, ...response.data.items]);
        setTotalPages(response.data.totalPages);
        setSearchParams(searchParams);
    })

    const [fetchTops, isTopsLoading, topsError] = useFetching(async () => {
        const response = await FilmService.getTop(topName, page);
        setFilms([...films, ...response.data.films]);
        setTotalPages(response.data.pagesCount);
    })

    useObserver(lastElement, page < totalPages, isFilmsLoading, () => {
        setPage(page + 1);
    })

    useObserver(lastElement, page < totalPages, isTopsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        setFilms([]);
        setPage(1);
    }, [topName])

    useEffect(() => {
        if (topName) {
            fetchTops();
        } else {
            fetchFilms();
        }
    }, [page, filters, searchParams])

    function acceptFilters(filter) {
        setFilms([]);
        setPage(1);
        setFilters(filter);
        setSearchParams(filter);
    }

    return (
        <div className="container">
            {!topName ? <FilterSidebar filters={filters} defaultFilters={defaultFilters} acceptFilters={acceptFilters}/> : ''}
            <div style={!topName ? {marginTop: '85px'} : {marginTop: '0'}}>
                {
                    (!isFilmsLoading && totalPages === 0) && <div>Ничего не найдено</div>
                }
                <FilmFullList films={films}>
                    {isFilmsLoading && <Loader/>}
                    {isTopsLoading && <Loader/>}
                </FilmFullList>
                <div ref={lastElement} style={{height: '50px'}}/>
            </div>
        </div>
    );
};

export default AllFilmsPage;