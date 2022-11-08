import Slider from "../components/UI/Slider";
import React, {useState} from "react";
import Link from "next/link";

export default function Home() {
    const [states, setStates] = useState({
        numberOfThings: '1',
        values: '1',
        order: 'ascending',
    })

    function makeOrderActive(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const parent = document.querySelector('.buttons__order');
        const buttons = parent?.querySelectorAll('button');
        if (element.tagName === 'BUTTON') {
            if (buttons) {
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('active');
                    element.classList.add('active');
                }
            }
            if (element.innerHTML === 'По возрастанию') {
                setStates({...states, order: 'ascending'});
            } else {
                setStates({...states, order: 'descending'});
            }
        }
    }

  return (
    <div className="container">
        <div className="window">
            <div className="window__wrapper">
                <div className="section__wrapper">
                    <div className="window__section">
                        <h1>Кол-во предметов</h1>
                        <Slider
                            items={['2', '3', '4', '5']}
                            width={366}
                            onChange={(number: string) => setStates({...states, numberOfThings: number})}/>
                    </div>
                    <div className="window__section">
                        <h1>Значения</h1>
                        <Slider
                            items={['A', '9', '19', '50', '99', '999']}
                            width={531}
                            onChange={(value: string) => setStates({...states, values: value})}/>
                    </div>
                </div>

                <div className="window__buttons">
                    <div className="buttons__order" onClick={makeOrderActive}>
                        <button className="btn__order active">По возрастанию</button>
                        <button className="btn__order">По убыванию</button>
                    </div>
                    <Link href={`/student?number=${states.numberOfThings}&values=${states.values}&order=${states.order}`}>
                        <button className="btn__play">Играть</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
