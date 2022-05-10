import { useContext, useState } from "react";
import axios from 'axios'

import { StyleTextContextStore } from "components/Context/StyleCommmentContext";
import style from './Board.module.css'
import Spinner from "img/Ellipsis-2.9s-200px.gif"

function Canvas(props){

    // const imgPath = {props.path
    const loading = props.loading

    return(
        <div className = {loading === true ? style.canvasLoading : style.canvas}>
            {
                loading === true
                ? <img src={Spinner} /> 
                : <img src={props.path}/>
            }
        </div>
    )
}

function Board() {

    const StyleInfo = useContext(StyleTextContextStore);
    const [loading, setLoading] = useState(false);

    const onTextChange = (e) => {
        StyleInfo.setText(e.target.value);
        setLoading(true)
    }

    return(
        <div className={style.board}>
            <Canvas path={StyleInfo.imgPath} loading={loading}/>
            <div className={style.inputText}>
                <input
                    type="text" placeholder="글자를 입력해주세요" onChange={onTextChange} value={StyleInfo.text}
                    maxLength='6'
                />
                <div style={{textAlign: "left", fontSize: "10px"}}>
                    {StyleInfo.text.length} / 6
                </div>
            </div>
        </div>
    )
}

export default Board