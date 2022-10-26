import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {useFetching} from "../hooks/useFetching";
import FilmService from "../API/FilmService";
import kpIcon from "../assets/icons/icons8-бобина-с-пленкой-64.png"
import imdbIcon from "../assets/icons/icons8-imdb-96.png"
import RatingStars from "../components/UI/RatingStars/RatingStars";
import Carousel from "../components/UI/Carousel/Carousel";
import Modal from "../components/UI/Modal/Modal";
import {useObserver} from "../hooks/useObserver";

const FilmIdPage = () => {
    const params = useParams();
    const router = useNavigate();
    const imageTypes = [
        'STILL',
        'SHOOTING',
        'POSTER',
        'FAN_ART',
        'PROMO'
    ]

    const [modalActive, setModalActive] = useState(false);
    const [imageURL, setImageURL] = useState('');

    const [positionX, setPositionX] = useState(0);
    const [film, setFilm] = useState({genres: [], countries: []});

    const [staff, setStaff] = useState([]);

    const [facts, setFacts] = useState([]);

    const [awards, setAwards] = useState([{persons: []}]);

    const [allReviews, setAllReviews] = useState([]);
    const [currentTypeOfReviews, setCurrentTypeOfReviews] = useState([]);
    const [currentReviewTypeId, setCurrentReviewTypeId] = useState('total');
    const [order, setOrder] = useState('DATE_DESC');

    const [stillImages, setStillImages] = useState([]);
    const [shootingImages, setShootingImages] = useState([]);
    const [posterImages, setPosterImages] = useState([]);
    const [fanArtImages, setFanArtImages] = useState([]);
    const [promoImages, setPromoImages] = useState([]);

    const [filtersList, setFiltersList] = useState({genres: [], countries: []});
    const [fullDescriptionVisible, setFullDescriptionVisible] = useState(false);
    const [dragStatus, setDragStatus] = useState(false);
    const header = useRef(null);
    const btnShow = useRef(null);
    const btnHide = useRef(null);

    const [fetchData, isDataLoading, dataError] = useFetching(async () => {
        const responseFilm = await FilmService.getFilmById(params.id);
        setFilm(responseFilm.data);

        const responseStaff = await FilmService.getStaffByFilmId(params.id);
        setStaff(responseStaff.data);

        const responseFacts = await FilmService.getFilmFacts(params.id);
        for (let fact of responseFacts.data.items) {
            fact.text = fact.text.replace(/[^А-яЁё ]/g,"")
        }
        setFacts(responseFacts.data.items);

        const responseAwards = await FilmService.getFilmAwards(params.id);
        setAwards(responseAwards.data.items);

        for (let imageType of imageTypes) {
            const responseImages = await FilmService.getFilmImages(params.id, 1, imageType);
            switch (imageType) {
                case 'STILL': {
                    setStillImages(responseImages.data.items)
                }
                    break;
                case 'SHOOTING': {
                    setShootingImages(responseImages.data.items)
                }
                    break;
                case 'POSTER': {
                    setPosterImages(responseImages.data.items)
                }
                    break;
                case 'FAN_ART': {
                    setFanArtImages(responseImages.data.items)
                }
                    break;
                case 'PROMO': {
                    setPromoImages(responseImages.data.items)
                }
                    break;
            }
        }

        const responseReviews = await FilmService.getFilmReviews(params.id, 1, order);
        setAllReviews(responseReviews.data.items);
        setCurrentTypeOfReviews(responseReviews.data.items);

        const responseFilters = await FilmService.getFilters();
        setFiltersList(responseFilters.data);
    });

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        f();
    }, [currentReviewTypeId])

    const actors = staff.filter((staffItem) => {
        return staffItem.professionKey === 'ACTOR';
    })

    const directors = staff.filter((staffItem) => {
        return staffItem.professionKey === 'DIRECTOR';
    })

    function getCountryId (countryName) {
        for (let country of filtersList.countries) {
            if (country.country === countryName) {
                return country.id;
            }
        }
    }

    function getGenreId (genreName) {
        for (let genre of filtersList.genres) {
            if (genre.genre === genreName) {
                return genre.id;
            }
        }
    }

    function showFullDescription () {
        header.current.style.marginTop = '50px';
        btnShow.current.style.display = 'none';
        btnHide.current.style.display = 'inline';
        setFullDescriptionVisible(true);
    }

    function hideFullDescription () {
        header.current.style.marginTop = '';
        btnHide.current.style.display = 'none';
        btnShow.current.style.display = 'inline';
        setFullDescriptionVisible(false);
    }

    function setTextFontSize () {
        const cards = document.querySelectorAll('.carousel__card');
        for (let card of cards) {
            const text = card.querySelector('p');
            if (text.innerHTML.length > 15) {
                text.style.fontSize = '16px';
            }
        }
    }

    function drag (dragStatus) {
        setDragStatus(dragStatus);
    }

    function moveFrame (e) {
        const ul = document.querySelector('.film__menu');
        const li = ul.querySelectorAll('li');
        const facts = li[0].querySelector('a');
        const awards = li[1].querySelector('a');
        const reviews = li[2].querySelector('a');
        const images = li[3].querySelector('a');
        switch (e.target) {
            case facts: {
                setPositionX(0);
                for (let item of li) {
                    item.classList.remove('active')
                }
                e.target.parentNode.classList.add('active');
            } break;
            case awards: {
                setPositionX(-1180);
                for (let item of li) {
                    item.classList.remove('active')
                }
                e.target.parentNode.classList.add('active');
            } break;
            case reviews: {
                setPositionX(2 * -1180);
                for (let item of li) {
                    item.classList.remove('active')
                }
                e.target.parentNode.classList.add('active');
            } break;
            case images: {
                setPositionX(3 * -1180);
                for (let item of li) {
                    item.classList.remove('active')
                }
                e.target.parentNode.classList.add('active');
            }
        }
    }

    function setActiveReviews (e) {
        const parent = document.querySelector('.reviews__counter');
        const children = parent.querySelectorAll('div');
        if (e.target.tagName === 'H2') {
            for (let child of children) {
                const h2 = child.querySelector('h2');
                h2.classList.remove('activeVertical');
            }
            e.target.classList.add('activeVertical');
            setCurrentReviewTypeId(e.target.id);
        }
    }

    function f () {
        switch (currentReviewTypeId) {
            case 'total': {
                setCurrentTypeOfReviews(allReviews);
            } break;
            case 'positive': {
                setCurrentTypeOfReviews(allReviews.filter((review) => review.type === 'POSITIVE'));
            } break;
            case 'neutral': {
                setCurrentTypeOfReviews(allReviews.filter((review) => review.type === 'NEUTRAL'));
            } break;
            case 'negative': {
                setCurrentTypeOfReviews(allReviews.filter((review) => review.type === 'NEGATIVE'));
            } break;
        }
    }

    useEffect(() => {
        setTextFontSize();
    })

    return (
        <div>
            <div
                className="filmHeader"
                style={
                    {
                        backgroundImage: `url(${film.coverUrl ? film.coverUrl : ""})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center top',
                        backgroundSize: 'cover',
                    }}
            >
                <div className="filmHeader__overlay">
                    <div className="container">
                        <div className="filmHeader__wrapper">
                            <div ref={header} className="film__section">
                                <h1>{film.nameRu}</h1>
                                <h2>{film.nameOriginal}</h2>
                            </div>
                            <div className="film__section">
                                <a href={`/filters?yearFrom=${film.year}&yearTo=${film.year}`}>{film.year}</a>
                                {film.countries.map((country, index) =>
                                    <a
                                        href={`/filters?countries=${getCountryId(country.country)}`}
                                        key={index + 1}
                                    >
                                        {country.country}
                                    </a>
                                )}
                                {film.genres.map((genre, index) =>
                                    <a
                                        href={`/filters?genres=${getGenreId(genre.genre)}`}
                                        key={index + 1}
                                    >
                                        {genre.genre}
                                    </a>
                                )}
                            </div>
                            <div className="film__section">
                                <p>
                                    {film.shortDescription === null ?
                                        film.description : fullDescriptionVisible ? film.description : film.shortDescription}
                                    {film.shortDescription === null ||
                                        <a
                                        ref={btnShow}
                                        style={{display: 'inline', fontSize: '20px', marginLeft: '10px'}}
                                        onClick={showFullDescription}
                                    >
                                        Показать полное описание
                                    </a>}
                                    <a
                                        ref={btnHide}
                                        style={{display: 'none', fontSize: '20px', marginLeft: '10px'}}
                                        onClick={hideFullDescription}
                                    >
                                        Скрыть полное описание
                                    </a>
                                </p>
                            </div>
                            <div className="film__section">
                                <img className="filmHeader__icon" alt="" src={kpIcon}/>
                                <a href={`/filters?ratingFrom=${Math.floor(film.ratingKinopoisk)}&ratingTo=${Math.ceil(film.ratingKinopoisk)}`}>
                                    <p>{film.ratingKinopoisk}</p>
                                </a>
                                <img className="filmHeader__icon" alt="" src={imdbIcon}/>
                                <p>{film.ratingImdb}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filmBody">
                <div className="container">
                    <div className="film__section">
                        <div className="film__directors">
                            <h2 style={{marginBottom: '1.4rem'}}>Режиссеры</h2>
                            {directors.map((director, index) =>
                                <a
                                    key={director.staffId}
                                    onClick={() => router(`/persons/${director.staffId}`)}
                                >
                                    {director.nameRu ? director.nameRu : director.nameEn}
                                </a>
                            )}
                        </div>
                        <div className="film__rating">
                            <h2 style={{textAlign: 'right'}}>Рейтинг фильма</h2>
                            <RatingStars/>
                        </div>
                    </div>
                    <div className="film__body">
                        <h2>Актерский состав</h2>
                        <div className="actorsPoster__wrapper">
                            <Carousel numberOfItems={actors.length} numberOfItemsShow={5} drag={drag}>
                                {actors.map((actor, index) =>
                                    <div
                                        className="carousel__card"
                                        key={actor.staffId}
                                        onClick={() => {
                                            if (dragStatus) {
                                                setDragStatus(false);
                                                return
                                            } else {
                                                router(`/persons/${actor.staffId}`);
                                            }
                                        }}
                                    >
                                        <img className="carousel__img" alt="" src={actor.posterUrl}/>
                                        <p
                                            className="carousel__text"
                                            style={{fontSize: '20px', marginRight: '0'}}
                                        >
                                            {(actor.nameRu) ? actor.nameRu : actor.nameEn}
                                        </p>
                                    </div>
                                )}
                            </Carousel>
                        </div>
                    </div>
                    <div className="film__body">
                        <ul className="film__menu" onClick={moveFrame}>
                            <li className="film__menuItem active"><a>Факты и ошибки</a></li>
                            <li className="film__menuItem"><a>Награды</a></li>
                            <li className="film__menuItem"><a>Рецензии</a></li>
                            <li className="film__menuItem"><a>Изображения</a></li>
                        </ul>
                        <div className="film__menuWindow">
                            <div className="film__menuFrames" style={{transform: `translateX(${positionX}px)`}}>
                                <div className="film__menuFrame">
                                    <div className="film__factsAndBloopers">
                                        <div className="film__facts">
                                            <h3>Факты</h3>
                                            <ul>
                                                {facts.map((fact, index) =>
                                                    fact.type === 'FACT' && <li key={index + 1}>{fact.text}</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="film__bloopers">
                                            <h3>Ошибки</h3>
                                            <ul>
                                                {facts.map((fact, index) =>
                                                    fact.type === 'BLOOPER' && <li key={index + 1}>{fact.text}</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="film__menuFrame">
                                    <div className="film__awards">
                                        {awards.map((award, index) =>
                                            <div className="award__card" key={index + 1}>
                                                {award.imageUrl && <img src={award.imageUrl} alt="" className="award__cardImg"/>}
                                                <div className="award__cardContent">
                                                    <h4>{award.name}</h4>
                                                    <p>{award.nominationName}</p>
                                                    <p>{award.year}</p>
                                                    {award.persons.length !== 0 && <h4>Номинанты</h4>}
                                                    <div className="award__cardPersons">
                                                        {award.persons.map((person, index) =>
                                                            <div
                                                                key={index + 1}
                                                                className="award__cardPerson"
                                                                onClick={() => router(`/persons/${person.kinopoiskId}`)}
                                                            >
                                                                <img src={person.posterUrl} alt=""/>
                                                                <p>{person.nameRu}</p>
                                                            </div>

                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="film__menuFrame">
                                    <div className="film__reviews__wrapper">
                                        <div className="film__reviews">
                                            {currentTypeOfReviews.map((review, index) =>
                                                <div
                                                    key={index + 1}
                                                    className="review"
                                                    style={review.type === 'POSITIVE' ?
                                                        {backgroundColor: 'rgba(153, 255, 153, 0.5)'} :
                                                        review.type === 'NEUTRAL' ?
                                                            {backgroundColor: 'rgba(51, 51, 51, 1)'} :
                                                            {backgroundColor: 'rgba(255, 0, 0, 0.5)'}}
                                                >
                                                    <div className="review__header">
                                                        <h4>{review.author}</h4>
                                                        <p>{review.date}</p>
                                                    </div>
                                                    <div className="review__body">
                                                        <h3>{review.title}</h3>
                                                        <p>{review.description}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="reviews__counter" onClick={setActiveReviews}>
                                            <div>
                                                <h2
                                                    id="total"
                                                    className="activeVertical"
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    {allReviews.length}
                                                </h2>
                                                <p>Всего</p>
                                            </div>
                                            <div>
                                                <h2
                                                    id="positive"
                                                    style={{color: 'rgba(153, 255, 153, 0.5)', cursor: 'pointer'}}
                                                >
                                                    {allReviews.filter((review) => review.type === 'POSITIVE').length}
                                                </h2>
                                                <p>Положительные</p>
                                            </div>
                                            <div>
                                                <h2
                                                    id="neutral"
                                                    style={{color: 'rgba(51, 51, 51, 1)', cursor: 'pointer'}}
                                                >
                                                    {allReviews.filter((review) => review.type === 'NEUTRAL').length}
                                                </h2>
                                                <p>Нейтральные</p>
                                            </div>
                                            <div className="">
                                                <h2
                                                    id="negative"
                                                    style={{color: 'rgba(255, 0, 0, 0.5)', cursor: 'pointer'}}
                                                >
                                                    {allReviews.filter((review) => review.type === 'NEGATIVE').length}
                                                </h2>
                                                <p>Отрицательные</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="film__menuFrame">
                                    <div className="images">
                                        <h2>Кадры из фильма</h2>
                                        <div className="images__wrapper">
                                            {stillImages.map((image, index) =>
                                                <div>
                                                    <img
                                                        key={index + 1}
                                                        className="image"
                                                        src={image.previewUrl} alt=""
                                                        onClick={() => {
                                                            setModalActive(true);
                                                            setImageURL(image.imageUrl);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <h2>Кадры со съемок</h2>
                                        <div className="images__wrapper">
                                            {shootingImages.map((image, index) =>
                                                <img
                                                    key={index + 1}
                                                    className="image"
                                                    src={image.previewUrl} alt=""
                                                    onClick={() => {
                                                        setModalActive(true);
                                                        setImageURL(image.imageUrl);
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <h2>Постеры</h2>
                                        <div className="images__wrapper">
                                            {posterImages.map((image, index) =>
                                                <img
                                                    key={index + 1}
                                                    className="image"
                                                    src={image.previewUrl} alt=""
                                                    onClick={() => {
                                                        setModalActive(true);
                                                        setImageURL(image.imageUrl);
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <h2>Фан-арты</h2>
                                        <div className="images__wrapper">
                                            {fanArtImages.map((image, index) =>
                                                <img
                                                    key={index + 1}
                                                    className="image"
                                                    src={image.previewUrl} alt=""
                                                    onClick={() => {
                                                        setModalActive(true);
                                                        setImageURL(image.imageUrl);
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <h2>Промо</h2>
                                        <div className="images__wrapper">
                                            {promoImages.map((image, index) =>
                                                <img
                                                    key={index + 1}
                                                    className="image"
                                                    src={image.previewUrl} alt=""
                                                    onClick={() => {
                                                        setModalActive(true);
                                                        setImageURL(image.imageUrl);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <img src={imageURL} style={{maxHeight: '90vh', maxWidth: '90vw'}} alt=""/>
                </Modal>
            </div>
        </div>


    );
};

export default FilmIdPage;