import classes from "../styles/student.module.css";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ItemsList from "../components/ItemsList";

export default function () {
    const router = useRouter();
    const queryParams = router.query;

    const backgroundsClasses = [
        'cookies',
        'coins',
        'toys',
        'flowers'
    ]

    const [values, setValues] = useState<Array<any>>([]);
    const [sortedValues, setSortedValues] = useState<Array<any>>([]);

    function setRandomBackground() {
        const index = getRandomIntInclusive(0, 3);
        const container = document.getElementById('container');
        container?.classList.add(backgroundsClasses[index]);
    }

    function getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArray(min: number, max: number) {
        let set = new Set();
        while (set.size < 5) set.add(Math.floor(Math.random() * (max - min + 1)) + min);
        const arr = Array.from(set);
        const sortedArr = arr.sort((a, b) => {
            return (a - b);
        })
        setValues(arr);
        setSortedValues(sortedArr);
    }
    function getRandomLetter() {
        let set = new Set();
        while (set.size < Number(queryParams.number) + 1) set.add(Math.floor(Math.random() * (1071 - 1040 + 1)) + 1040);
        let arr: Array<any> = Array.from(set);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = String.fromCharCode(arr[i]);
        }
        setSortedValues(arr.sort())
        setValues(arr);
    }

    function setRandomItemsArr() {
        switch (queryParams.values) {
            case '1': getRandomLetter(); break;
            case '2': getRandomArray(1, 9); break;
            case '3': getRandomArray(10, 19); break;
            case '4': getRandomArray(20, 50); break;
            case '5': getRandomArray(51, 99); break;
            case '6': getRandomArray(100, 999); break;
        }
    }

    useEffect(() => {
        setRandomItemsArr();
    },[queryParams.values])

    useEffect(() => {
        setRandomBackground();
    }, [])

    return (
        <div id="container" className={classes.container}>
            <div className={classes.window}>
                <div className={classes.items__wrapper}>
                    <ItemsList values={values} />
                </div>
                {queryParams.order === 'ascending' ?
                    <p className={classes.orderAscending}>По возрастанию</p>:
                    <p className={classes.orderDescending}>По убыванию</p>
                }
                <div className={classes.block}>
                    <div className={classes.items__cells}>
                        {sortedValues.map((value, index) =>
                            <div id={value} key={index} className={classes.cell}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}