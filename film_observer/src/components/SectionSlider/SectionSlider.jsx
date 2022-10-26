import React, {useEffect, useRef, useState} from 'react';
import FilmList from "./FilmList";
import classes from "./SectionSlider.module.css";

const SectionSlider = ({films, drag, ...props}) => {
    const [positionX, setPositionX] = useState(0);
    const [isBtnHover, setIsBtnHover] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isDrag, setIsDrag] = useState(false);
    const [dragStartPoint, setDragStartPoint] = useState(0);
    const prevBtn = useRef(null);
    const nextBtn = useRef(null);
    const ref = useRef(null);
    const ref1 = useRef();

    const endOfList = (films.length - 5) * 240;

    function changePositionX(e) {
        ref.current.style.transition = 'all 1s ease-in-out';
        if (e.target.id === "prev") {
            if (positionX >= 0) {
                setPositionX(0);
            } else {
                setPositionX(positionX + 5 * 240);
            }
        } else {
            if (positionX > -endOfList) {
                setPositionX(positionX - 5 * 240);
            }
        }
    }

    function slideStart (e) {
        ref.current.style.transition = '';
        ref.current.style.zIndex = '2';
        setDragStartPoint(e.clientX);
        setIsDragging(true);
    }

    function slideAction (e) {
        if (isDragging) {
            setPositionX( positionX + (e.clientX - dragStartPoint));
            setDragStartPoint(e.clientX);
            setIsDrag(true);
        }
    }

    document.addEventListener('mouseup', (e) => {
        const x = ref1.current.getBoundingClientRect().x;
        const y = ref1.current.getBoundingClientRect().y;
        const width = ref1.current.getBoundingClientRect().width;
        const height = ref1.current.getBoundingClientRect().height;
        if (e.clientX < x || e.clientY < y || e.clientX > x + width || e.clientY > y + height) {
            setIsDragging(false);
        }
    })

    function slideEnd () {
        setIsDragging(false);
        setIsDrag(false)
        ref.current.style.zIndex = '0';
        if (positionX > 0) {
            ref.current.style.transition = 'transform .3s ease-in-out';
            setPositionX(0);
        }
        if (positionX < -endOfList - 240) {
            ref.current.style.transition = 'transform .3s ease-in-out';
            setPositionX(-endOfList - 240);
        }
    }

    useEffect(() => {
        if (positionX === 0 && isBtnHover) {
            prevBtn.current.style.opacity = '0';
            prevBtn.current.style.zIndex = '0';
            nextBtn.current.style.opacity = '1';
        } else if (positionX < 0 && positionX > -endOfList && isBtnHover) {
            prevBtn.current.style.opacity = '1';
            prevBtn.current.style.zIndex = '1';
            nextBtn.current.style.opacity = '1';
            nextBtn.current.style.zIndex = '1';
        } else if (positionX <= -endOfList && isBtnHover) {
            nextBtn.current.style.opacity = '0';
            nextBtn.current.style.zIndex = '-1';
            prevBtn.current.style.opacity = '1';
        } else if (!isBtnHover) {
            prevBtn.current.style.opacity = '0';
            nextBtn.current.style.opacity = '0';
        }
        if (films.length < 5) {
            nextBtn.current.style.opacity = '0';
            prevBtn.current.style.opacity = '0';
        }
    });
    return (
        <div className={classes.sectionSlider__wrapper} ref={ref1}>
            <h1 className={classes.sectionSlider__header}>{props.title}</h1>
            <div
                className={classes.sectionSlider}
                onMouseOver={() => {
                    setIsBtnHover(true);
                }}
                onMouseLeave={() => {
                    setIsBtnHover(false);
                }}
            >
                <button
                    ref={prevBtn}
                    onClick={changePositionX}
                    id="prev"
                    className={classes.prevBtn}
                />
                <div
                    onMouseDown={slideStart}
                    onMouseMove={slideAction}
                    onMouseUp={slideEnd}
                    onDragStart={(e) => e.preventDefault()}
                >
                        <FilmList
                            ref={ref}
                            title={props.title}
                            style={{transform: `translateX(${positionX}px)`}}
                            films={films}
                            isDragging={isDrag}
                        />
                </div>
                <button
                    ref={nextBtn}
                    onClick={changePositionX}
                    id="next"
                    className={classes.nextBtn}
                />
            </div>
        </div>
    );
};

export default SectionSlider;