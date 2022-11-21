import classes from "../../styles/EndGameModal.module.css";
import React from 'react';
import Link from "next/link";

interface IModal {
    isModalActive: boolean;
}

const EndGameModal = ({isModalActive}: IModal) => {
    return (
        <div className={isModalActive ? classes.modal + " " + classes.active : classes.modal}>
            <div className={classes.modalContent}>
                <h1 className={classes.modal__header}>
                    Победа!
                </h1>

                <p className={classes.modal__text}>Молодец! Ты успешно справился с заданием!</p>
                <Link href={`/`}>
                    <button className={classes.modal__btn}>Заново</button>
                </Link>
                <div className={classes.star1}/>
                <div className={classes.star2}/>
                <div className={classes.star3}/>
                <div className={classes.star4}/>
                <div className={classes.star5}/>
            </div>
        </div>
    );
};

export default EndGameModal;