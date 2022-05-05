import { useState } from "react";
import style from "./Board.module.css"

function InputText(props){

    const [inputValue, setInputValue] = useState("")

    const onTextChange = (e) => {
        setInputValue(e.target.value);
    }

    return(
        <div>
            <input
                type="text" placeholder="글자를 입력해주세요" onChange={onTextChange} value={inputValue}
            />
        </div>
    )
}


function Canvas(){

    const [text, setText] = useState('123');

    return(
        <div className={style.canvas}>
            {text}
            {/* <div className={style.inputText}>
                <InputText />
            </div> */}
        </div>
    )
}

export default Canvas;