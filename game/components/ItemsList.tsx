import Item from "./Item";

interface IItemsList {
    values: Array<string>
}

export default function ({values}: IItemsList) {
    return (

        <div>
            {values.length === 2 &&
                <div>
                    <Item value={values[0]} style={{top: 70, left: 250}}/>
                    <Item value={values[1]} style={{top: 70, left: 450}}/>
                </div>
            }
            {values.length === 3 &&
                <div>
                    <Item value={values[0]} style={{top: 150, left: 200}}/>
                    <Item value={values[1]} style={{top: 0, left: 360}}/>
                    <Item value={values[2]} style={{top: 150, left: 500}}/>
                </div>
            }
            {values.length === 4 &&
                <div>
                    <Item value={values[0]} style={{top: 150, left: 0}}/>
                    <Item value={values[1]} style={{top: 0, left: 250}}/>
                    <Item value={values[2]} style={{top: 150, left: 460}}/>
                    <Item value={values[3]} style={{top: 0, left: 700}}/>
                </div>
            }
            {values.length === 5 &&
                <div>
                    <Item value={values[0]} style={{top: 100, left: 0}}/>
                    <Item value={values[1]} style={{top: 0, left: 200}}/>
                    <Item value={values[2]} style={{top: 150, left: 350}}/>
                    <Item value={values[3]} style={{top: 0, left: 520}}/>
                    <Item value={values[4]} style={{top: 100, left: 720}}/>
                </div>
            }
        </div>
    )
}