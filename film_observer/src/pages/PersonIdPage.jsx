import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import FilmService from "../API/FilmService";
import {useNavigate, useParams} from "react-router";
import Carousel from "../components/UI/Carousel/Carousel";

const PersonIdPage = () => {
    const params = useParams();
    const router = useNavigate();
    const [person, setPerson] = useState({spouses: [], films: [], facts: []});
    const [dragStatus, setDragStatus] = useState(false);

    const [fetchPerson, isPersonLoading, personError] = useFetching(async () => {
        const response = await FilmService.getPersonById(params.id);
        let filteredFilms = response.data.films.reduce((acc, film) => {
            if (acc.map[film.filmId]) return acc;
            acc.map[film.filmId] = true;
            acc.filteredFilms.push(film);
            return acc;
        }, {
            map: {},
            filteredFilms: []
        })
            .filteredFilms;
        response.data.films = filteredFilms;
        setPerson(response.data);
    })

    function setTextFontSize () {
        const cards = document.querySelectorAll('.carousel__card');
        for (let card of cards) {
            const text = card.querySelector('p');
            if (text.innerHTML.length > 15) {
                text.style.fontSize = '16px';
            }
            if (text.innerHTML.length > 20) {
                text.style.fontSize = '14px';
            }
        }
    }

    useEffect(() => {
        fetchPerson();
    }, [])

    useEffect(() => {
        setTextFontSize();
    })

    function drag (dragStatus) {
        setDragStatus(dragStatus);
    }

    return (
        <div className="container">
            <div className="person__wrapper">
                <div className="person__section">
                    <div className="person___sectionContent">
                        <img className="person__poster" src={person.posterUrl} alt=""/>
                        <div className="person__info">
                            <h1>{person.nameRu}</h1>
                            <h2>{person.nameEn}</h2>
                            <h3>О персоне</h3>
                            <div className="person__about">
                                <div className="about__headers">
                                    <p>Карьера</p>
                                    {person.growth ? <p>Рост</p> : ''}
                                    {person.birthday && <p>Дата рождения</p>}
                                    {person.birthplace && <p>Место рождения</p>}
                                    {person.death && <p>Дата смерти</p>}
                                    {person.deathplace && <p>Место смерти</p>}
                                    {person.spouses.map((spouse) =>
                                        <p key={spouse.personId}>
                                            {spouse.relation === 'супруга' ? 'Супруга' : 'Супруг'}
                                        </p>
                                    )}
                                    {person.films.length !== 0 && <p>Всего фильмов</p>}
                                </div>
                                <div className="about__content">
                                    {person.profession && <p>{person.profession}</p>}
                                    {person.growth ? <p>{person.growth} см</p> : ''}
                                    {person.birthday && <p>{person.birthday}, {person.age} лет</p>}
                                    {person.birthplace && <p>{person.birthplace}</p>}
                                    {person.death && <p>{person.death}</p>}
                                    {person.deathplace && <p>{person.deathplace}</p>}
                                    {person.spouses.map((spouse) =>
                                        <p key={spouse.personId}>
                                        <span>
                                            <a href={`/persons/${spouse.personId}`}>{spouse.name}</a>{"\n"}
                                            {spouse.divorced && <span>(развод) </span>}
                                            {spouse.children && <span>{spouse.children} детей</span>}
                                        </span>
                                        </p>
                                    )}
                                    {person.films.length !== 0 && <p>{person.films.length}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="person__section">
                    <div className="person__sectionHeader">Фильмы</div>
                    <Carousel numberOfItems={person.films.length} numberOfItemsShow={5} drag={drag}>
                        {person.films.map((film, index) =>
                            <div
                                key={film.filmId}
                                onClick={() => {
                                    if (dragStatus) {
                                        setDragStatus(false);
                                        return
                                    } else {
                                        router(`/films/${film.filmId}`)
                                    }
                                }}
                                className="carousel__card"
                            >
                                <img
                                    alt=""
                                    src={`https://kinopoiskapiunofficial.tech/images/posters/kp/${film.filmId}.jpg`}
                                    className="carousel__img"
                                />
                                <p className="carousel__text" style={{fontSize: '20px', marginRight: '0'}}>
                                    {film.description}
                                </p>
                            </div>
                        )}
                    </Carousel>
                </div>

                {person.facts.length !== 0 &&
                    <div className="person__section">
                        <div className="person__sectionHeader">Интересные факты</div>
                        <div className="person___sectionContent">
                            <ul>
                                {person.facts.map((fact ,index) =>
                                    <li key={index + 1}>{fact}</li>
                                )}
                            </ul>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default PersonIdPage;