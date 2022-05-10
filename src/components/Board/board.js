import { useContext, useState } from "react";
import axios from 'axios'

import { StyleTextContextStore } from "components/Context/StyleCommmentContext";
import style from './Board.module.css'

function Canvas(props){

    // const imgPath = {props.path


    return(
        <div>
            {
                props.path !== ''
                ? <img src={props.path}/>
                : null
            }
        </div>
    )
}

function Board() {

    const StyleInfo = useContext(StyleTextContextStore);

    const onTextChange = (e) => {
        StyleInfo.setText(e.target.value);
    }

    return(
        <div className={style.board}>
            <div className={style.canvas}>
                <Canvas path={StyleInfo.imgPath}/>
            </div>
            <div className={style.inputText}>
                <input
                    type="text" placeholder="글자를 입력해주세요" onChange={onTextChange} value={StyleInfo.text}
                />
            </ div>
        </div>
    )
}

export default Board