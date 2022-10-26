import React from 'react';
import classes from "./RatingStars.module.css";

const RatingStars = () => {
    return (
        <div className={classes.stars}>
            <div className={classes.stars__items}>

                <input id="star__10" type="radio" className={classes.stars__item} name="star" value={10}/>
                <label htmlFor="star__10" className={classes.stars__label}></label>

                <input id="star__9" type="radio" className={classes.stars__item} name="star" value={9}/>
                <label htmlFor="star__9" className={classes.stars__label}></label>

                <input id="star__8" type="radio" className={classes.stars__item} name="star" value={8}/>
                <label htmlFor="star__8" className={classes.stars__label}></label>

                <input id="star__7" type="radio" className={classes.stars__item} name="star" value={7}/>
                <label htmlFor="star__7" className={classes.stars__label}></label>

                <input id="star__6" type="radio" className={classes.stars__item} name="star" value={6}/>
                <label htmlFor="star__6" className={classes.stars__label}></label>

                <input id="star__5" type="radio" className={classes.stars__item} name="star" value={5}/>
                <label htmlFor="star__5" className={classes.stars__label}></label>

                <input id="star__4" type="radio" className={classes.stars__item} name="star" value={4}/>
                <label htmlFor="star__4" className={classes.stars__label}></label>

                <input id="star__3" type="radio" className={classes.stars__item} name="star" value={3}/>
                <label htmlFor="star__3" className={classes.stars__label}></label>

                <input id="star__2" type="radio" className={classes.stars__item} name="star" value={2}/>
                <label htmlFor="star__2" className={classes.stars__label}></label>

                <input id="star__1" type="radio" className={classes.stars__item} name="star" value={1}/>
                <label htmlFor="star__1" className={classes.stars__label}></label>

            </div>
        </div>
    );
};

export default RatingStars;