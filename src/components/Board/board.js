import { useState } from "react";
import style from './Board.module.css'
// import Canvas from './canvas'

// function InputText(props){

//     const [inputValue, setInputValue] = useState("")

//     const onTextChange = (e) => {
//         setInputValue(e.target.value);
//     }

//     return(
//         <div>
//             <input
//                 type="text" placeholder="글자를 입력해주세요" onChange={onTextChange} value={inputValue}
//             />
//         </div>
//     )
// }


function Canvas(props){

    return(
        <div>
            {props.text}
        </div>
    )
}

function Board() {

    const [inputValue, setInputValue] = useState("")

    const onTextChange = (e) => {
        setInputValue(e.target.value);
    }

    return(
        <div className={style.board}>
            <div className={style.canvas}>
                <Canvas text={inputValue}/>
            </div>
            <div className={style.inputText}>
                <input
                    type="text" placeholder="글자를 입력해주세요" onChange={onTextChange} value={inputValue}
                />
            </ div>
        </div>
    )
}

export default Board