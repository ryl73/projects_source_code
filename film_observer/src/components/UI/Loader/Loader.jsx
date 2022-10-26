import React from 'react';
import classes from "./Loader.module.css";

const Loader = ({style}) => {
    return (
        <div className={classes.loader__wrapper} style={style}>
            <div className={classes.loader}/>
        </div>
    );
};

export default Loader;