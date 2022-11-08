import classes from '../../styles/Slider.module.css'
import React, {useState} from "react";

interface slider {
    items: Array<String>;
    width: number;
    onChange: Function;
}

export default function ({items, width, onChange}:slider) {
    const [value, setValue] = useState('1');

    function changeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
        onChange(e.currentTarget.value);
    }

    return (
        <div className={classes.slider__wrapper} style={{width: width}}>
            <div className={classes.slider__items}>
                {items.map((item, index) =>
                    <span key={index}>{item}</span>
                )}
            </div>
            <input
                type="range"
                min="1"
                max={items.length}
                value={value}
                onChange={changeHandler}
                className={classes.slider}
            />
        </div>
    )
}