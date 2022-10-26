import React, {useRef, useState} from 'react';
import classes from "./FilterModal.module.css";

const FilterModal = ({title, resetFilter, ...props}) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalPosition, setModalPosition] = useState({});
    const ref = useRef(null);

    function showModal (e) {
        setModalActive(true);
        setModalPosition(e.target.getBoundingClientRect());
        ref.current.classList.add(classes.pressed);
    }

    return (
        <div>
            <div onClick={showModal}>
                <p ref={ref} className={classes.modal__title}>{title}</p>
            </div>
            <div
                className={modalActive ? (classes.modal + ' ' + classes.active) : classes.modal}
                onClick={(e) => {
                    setModalActive(false);
                    ref.current.classList.remove(classes.pressed);
                }}
            >
                <div
                    className={classes.modal__content}
                    onClick={(e) => e.stopPropagation()}
                    style={{left: modalPosition.left + modalPosition.width / 2}}
                >
                    <div className={classes.modal__header}>
                        <h3>{title}</h3>
                        <button
                            onClick={() => resetFilter()}
                            className={classes.modal__headerBtn}
                        >
                            {"\u2573"}{"\u00A0"}{"\u00A0"}Сбросить
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default FilterModal;