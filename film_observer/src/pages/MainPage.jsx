import React, {useEffect, useState} from 'react';
import SectionSlider from "../components/SectionSlider/SectionSlider";
import {useFetching} from "../hooks/useFetching";
import FilmService from "../API/FilmService";
import Loader from "../components/UI/Loader/Loader";

const MainPage = () => {
    const [filmsKP, setFilmsKP] = useState([]);
    const [filmsPopular, setFilmsPopular] = useState([]);
    const [filmsAwait, setFilmsAwait] = useState([]);

    const [fetchFilms, isFilmsLoading, filmError] = useFetching(async () => {
        const responseTop250 = await FilmService.getTop('TOP_250_BEST_FILMS', 1);
        responseTop250.data.films.pop();
        setFilmsKP(responseTop250.data.films);

        const responseTop100Popular = await FilmService.getTop('TOP_100_POPULAR_FILMS', 1);
        responseTop100Popular.data.films.pop();
        setFilmsPopular(responseTop100Popular.data.films);

        const responseTopAwait = await FilmService.getTop('TOP_AWAIT_FILMS', 1);
        setFilmsAwait(responseTopAwait.data.films)
    })

    useEffect(() => {
        fetchFilms();
    }, [])

    return (
        <div style={{paddingBottom: '40px'}}>
            {!isFilmsLoading ? <div>
                <SectionSlider
                    title="Топ 250 КиноПоиска"
                    films={filmsKP}
                    loading={isFilmsLoading}
                />
                <SectionSlider
                    title="Топ 100 популярных фильмов"
                    films={filmsPopular}
                    loading={isFilmsLoading}
                />
                <SectionSlider
                    title="Топ ожидаемых фильмов"
                    films={filmsAwait}
                    loading={isFilmsLoading}
                />
            </div> : <Loader style={{height: '87.1vh', width: '99.1vw'}}/>}
        </div>
    );
};

export default MainPage;