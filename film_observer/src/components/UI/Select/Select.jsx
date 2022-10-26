import React, {useEffect, useState} from 'react';
import classes from "./Select.module.css";
import {useSearchParams} from "react-router-dom";

const Select = ({options, defaultOption, setOrder}) => {
    const [searchParams] = useSearchParams();
    const [currentOption, setCurrentOption] = useState(defaultOption.name);
    const [visible, setVisible] = useState('0');

    function showOptions () {
        if (visible === '0') {
            setVisible('1');
        } else {
            setVisible('0');
        }
    }


    useEffect(() => {
        for (let option of options) {
            if (option.value === searchParams.get('order')) {
                setCurrentOption(option.name);
            }
        }
    })

    return (
        <div className={classes.select__wrapper}>
            <div className={classes.currentSelect} onClick={showOptions}>{currentOption}</div>
            <ul className={classes.select} style={{opacity: visible}}>
                {options.map(option =>
                    <li
                        className={classes.option}
                        key={option.value}
                        value={option.value}
                        onClick={() => {
                            setCurrentOption(option.name);
                            setOrder(option.value);
                            showOptions();
                        }}
                    >
                        {option.name}
                    </li>
                )}
            </ul>

        </div>
    );
};

export default Select;