import React, {useEffect, useRef, useState} from 'react';
import classes from "./Carousel.module.css";

const Carousel = ({children, drag, ...props}) => {
    const [positionX, setPositionX] = useState(0);
    const [dragStartPoint, setDragStartPoint] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef(null);
    const ref1 = useRef(null);
    const prevBtn = useRef(null);
    const nextBtn = useRef(null);

    const itemWidth = 220;

    const endOfList = (props.numberOfItems - props.numberOfItemsShow) * itemWidth;

    function changePositionX(e) {
        ref.current.style.transition = 'all .3s ease-in-out';
        if (e.target.id === "prev") {
            if (positionX >= 0) {
                setPositionX(0);
            } else {
                setPositionX(positionX + itemWidth);
            }
        } else {
            if (positionX > -endOfList) {
                setPositionX(positionX - itemWidth);
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
            drag(true);
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
        if (positionX > 0) {
            ref.current.style.transition = 'all .3s ease-in-out';
            setPositionX(0);
        }
        if (positionX < -endOfList) {
            ref.current.style.transition = 'all .3s ease-in-out';
            setPositionX(-endOfList);
        }
    }

    useEffect(() => {
        if (positionX === 0) {
            prevBtn.current.style.opacity = '0';
            prevBtn.current.style.zIndex = '0';
        } else if (positionX < 0 && positionX > -endOfList) {
            prevBtn.current.style.opacity = '1';
            prevBtn.current.style.zIndex = '1';
            nextBtn.current.style.opacity = '1';
            nextBtn.current.style.zIndex = '1';
        } else if (positionX <= -endOfList) {
            nextBtn.current.style.opacity = '0';
            nextBtn.current.style.zIndex = '0';
        }
    }, [positionX]);

    return (
        <div className={classes.carousel__wrapper} ref={ref1}>
            <button
                ref={prevBtn}
                id="prev"
                className={classes.prevBtn}
                onClick={changePositionX}
            />
            <div
                ref={ref}
                className={classes.carousel}
                style={{transform: `translateX(${positionX}px)`}}
                onMouseDown={slideStart}
                onMouseMove={slideAction}
                onMouseUp={slideEnd}
                onTouchStart={slideStart}
                onTouchMove={slideAction}
                onTouchEnd={slideEnd}
                onDragStart={(e) => e.preventDefault()}
            >
                {children}
            </div>
            <button
                ref={nextBtn}
                id="next"
                className={classes.nextBtn}
                onClick={changePositionX}
            />
        </div>
    );
};

export default Carousel;