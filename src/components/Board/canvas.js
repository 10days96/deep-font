import { useState } from "react";
import style from "./Board.module.css"

function inputText(props){
    return(
        <div>
            <input
                type="text"
            />
        </div>
    )
}


function Canvas(){

    const [text, setText] = useState('123');

    return(
        <div className={style.canvas}>
            {text}
            <div className={style.inputText}>
                <inputText />
            </div>
        </div>
    )
}

export default Canvas;