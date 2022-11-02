import React, {useRef, useState} from 'react';

const EventsExample = () => {
    const [value, setValue] = useState<string>('');
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.value);
    }

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(inputRef.current?.value)
    }

    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('DRAG')
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(true);
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(false);
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDrag(false);
        console.log("DROP");

    }

    return (
        <div>
            <input value={value} onChange={changeHandler} type="text" placeholder="Управляемый"/>
            <input ref={inputRef} type="text" placeholder="Неуправляемый"/>
            <button onClick={clickHandler}>Click</button>
            <div onDrag={dragHandler} draggable style={{width: 200, height: 200, background: "red"}}/>
            <div
                onDrop={dropHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragOverHandler}
                style={{width: 200, height: 200, background: isDrag ? "blue" : "red", marginTop: 20}}/>
        </div>
    );
};

export default EventsExample;