import React, {useState, createRef} from 'react';
import './styles/index.scss';
const img = require('./assets/images/image.jpg');
let markups: Array<Object> = [];
let markupId = 1;
let markupsJSON;

interface RectStyles {
    display: string;
    top: number | string;
    left: number | string;
    width: number | string;
    height: number | string;
}

function App() {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);

    const [rectStyles, setRectStyles] = useState<RectStyles>({
        display: 'none',
        top: '',
        left: '',
        width: '',
        height: ''
    })

    const imgRef = createRef<HTMLDivElement>();

    function drawStart(e: React.MouseEvent) {
        setIsDrawing(true);
        removeDots();
        setRectStyles({
            display: 'block',
            width: '',
            height: '',
            top: e.pageY,
            left: e.pageX
        })
        setIsBtnDisabled(true);
    }

    function drawAction(e: React.MouseEvent) {
        if (isDrawing) {
            setRectStyles({
                ...rectStyles,
                width: Math.abs(e.pageX - Number(rectStyles.left)),
                height: Math.abs(e.pageY - Number(rectStyles.top))
            })
            setIsBtnDisabled(false);
        }
    }

    function drawEnd() {
        setIsDrawing(false);
        if (rectStyles.width === '' && rectStyles.height === '') {
            setRectStyles({...rectStyles, display: 'none'})
        }
        createDots(6, [
            -3,
            Number(rectStyles.height) - 4,
            -3,
            Number(rectStyles.height) - 5,
            -3,
            Number(rectStyles.height) - 4
        ], [
            -3,
            -3,
            Number(rectStyles.width) - 5,
            Number(rectStyles.width) - 5,
            Number(rectStyles.width)/2 - 3,
            Number(rectStyles.width)/2 - 3
        ])
    }

    function createDots(numberOfDots:Number, top: Array<number>, left: Array<number>) {
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement("div");
            const rect = document.getElementById('rect');
            dot.classList.add('dot');
            dot.style.top = `${top[i]}px`;
            dot.style.left = `${left[i]}px`;
            rect?.prepend(dot);
        }

    }

    function removeDots() {
        const dots = document.querySelectorAll('.dot');
        for (let i = 0; i < dots.length; i++) {
            dots[i].remove();
        }
    }

    function createJSON() {
        let markup = {
            id: markupId,
            region: {
                origin: {
                    x: Number(rectStyles.left) - imgRef.current!.getBoundingClientRect().x,
                    y: Number(rectStyles.top) - imgRef.current!.getBoundingClientRect().y
                },
                size: {
                    width: rectStyles.width,
                    height: rectStyles.height
                }
            }
        };
        markups.push(markup);
        markupsJSON = JSON.stringify(markups);
        alert(markupsJSON);
        console.log(markupsJSON);
        markupId++;
        setIsBtnDisabled(true);
    }

    return (
    <div className="app">
        <div className="container">
            <div
                ref={imgRef}
                className="img__wrapper"
                onMouseDown={drawStart}
                onMouseMove={drawAction}
                onMouseUp={drawEnd}
                onDragStart={(e: React.MouseEvent) => e.preventDefault()}
            >
                {/* Динамическая картинка */}
                <img className="img" src="https://picsum.photos/1200/800" alt="No img" />
                {/* Статическая картинка */}
                {/*<img className="img" src={img} alt="No img" />*/}
                <div
                    style={rectStyles}
                    id="rect"
                />
            </div>
            <button disabled={isBtnDisabled} className="addBtn" onClick={createJSON}>Добавить</button>
        </div>
    </div>
    );
}

export default App;