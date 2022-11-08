import classes from "../styles/student.module.css";
import React, {useState} from "react";
import {headers} from "next/headers";

interface IStyle {
    top: number;
    left: number;
}

interface IItem {
    value: string;
    style: IStyle;
}

export default function ({value, style}: IItem) {
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [start, setStart] = useState({x: 0, y: 0});

    function onMouseDownHandler(e: React.MouseEvent) {
        setIsDrag(true);
        const element = e.target as HTMLElement;
        if (element.tagName === 'DIV') {
            element.style.zIndex = '1';
        } else {
            element.parentElement!.style.zIndex = '1';
        }
        setStart({x: e.clientX, y: e.clientY})
    }

    function onMouseMoveHandler(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        if (isDrag) {
            if (element.tagName === 'DIV') {
                element.style.top = `${style.top + (e.clientY - start.y)}px`;
                element.style.left = `${style.left + (e.clientX - start.x)}px`;
            } else {
                element.parentElement!.style.top = `${style.top + (e.clientY - start.y)}px`;
                element.parentElement!.style.left = `${style.left + (e.clientX - start.x)}px`;
            }

        }
    }

    function onMouseUpHandler(e: React.MouseEvent) {
        setIsDrag(false);
        const element = e.target as HTMLElement;
        const cells = document.querySelectorAll(`.${classes.cell}`);
        const window = document.querySelector(`.${classes.window}`);
        for (let i = 0; i < cells.length; i++) {
            const x = cells[i].getBoundingClientRect().x;
            const y = cells[i].getBoundingClientRect().y;
            const width = cells[i].getBoundingClientRect().width;
            const height = cells[i].getBoundingClientRect().height;

            if (cells[i].id === element.firstElementChild?.innerHTML || cells[i].id === element.innerHTML) {
                if ((e.clientX >= x && e.clientX <= x + width) && (e.clientY >= y && e.clientY <= y + height)) {
                    if (element.tagName === 'DIV') {
                        element.style.top = `${y - window!.getBoundingClientRect().y - 10}px`;
                        element.style.left = `${x - window!.getBoundingClientRect().x - 10}px`;
                    } else {
                        element.parentElement!.style.top = `${y - window!.getBoundingClientRect().y - 10}px`;
                        element.parentElement!.style.left = `${x - window!.getBoundingClientRect().x - 10}px`;
                    }
                    cells[i].id = 'checked';
                } else {
                    if (element.tagName === 'DIV') {
                        element.style.top = `${style.top}px`;
                        element.style.left = `${style.left}px`;
                    } else {
                        element.parentElement!.style.top = `${style.top}px`;
                        element.parentElement!.style.left = `${style.left}px`;
                    }
                }
            }
        }
    }

    return (
        <div
            className={classes.item}
            style={style}
            onMouseDown={onMouseDownHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseUpHandler}
            onDragStart={(e: React.MouseEvent) => e.preventDefault()}
        >
            <p>
                {value}
            </p>
        </div>
    )
}