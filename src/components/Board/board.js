import { useContext, useEffect, useState } from "react";

import { StyleTextContextStore } from "components/Context/StyleCommmentContext";
import style from './Board.module.css'
import Spinner from "img/Ellipsis-2.9s-200px.gif"
import { resolveOnChange } from "antd/lib/input/Input";

function Canvas(props){

    if(props.flag){
        return(
            <div className = {style.canvas}>
                <div className={style.text}>
                    {props.text}
                </div>
            </div>
        )
    }

    else{
        return(
            <div className = {props.loading === true ? style.canvasLoading : style.canvas}>
                {
                    props.loading === true
                    ? <img src={Spinner} /> 
                    : <img src={`http://127.0.0.1:5000/static/${props.path}`}/>
                }
            </div>
        )
    }
}

function Board() {

    const StyleInfo = useContext(StyleTextContextStore);

    const onTextChange = (e) => {
        StyleInfo.setText(e.target.value);
    }

    return(
        <div className={style.board}>
            <Canvas path={StyleInfo.imgPath} loading={StyleInfo.loading} text={StyleInfo.text} flag={StyleInfo.flag}/>
            <div className={style.inputText}>
                <input
                    type="text" placeholder="글자를 입력해주세요" onChange={onTextChange} value={StyleInfo.text}
                    maxLength='6'
                />
                <div className={style.maxText}>
                    {StyleInfo.text.length} / 6
                </div>
            </div>
        </div>
    )
}

export default Board