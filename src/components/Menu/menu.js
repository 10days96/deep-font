import React, { useContext } from "react";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont, faPalette, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import 'antd/dist/antd.css'
import axios from "axios";
import { Slider, InputNumber, Row, Col } from 'antd';

import { StyleTextContextStore } from "components/Context/StyleCommmentContext";
import style from "components/Menu/Menu.module.css";
import SkeletonInput from "antd/lib/skeleton/Input";

function HorizonLine(){
    return (
        <div className={style.horizonLine}
        //   style={{
        //     width: "90%",
        //     textAlign: "center",
        //     borderBottom: "1px solid #aaa",
        //     lineHeight: "0.1em",
        //     margin: "10px 0px 20px",
        //   }}
        >
          {/* <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span> */}
          <span style={{ background: "#fff"}}></span>
        </div>
      ); 
}

function IntegerStep() {
    

    const [state, setState] = useState(1);
    const inputValue = state;

    const onChange = (value) => {
        setState(value)
    }

    return(
        <Row>
            <Col span={12}>
                <Slider
                min={1}
                max={20}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
            />
            </Col>
            <Col span={4}>
                <InputNumber
                    className={style.inputSlider}
                    min={1}
                    max={20}
                    value={inputValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    )

}



function Menu() {

    const StyleInfo = useContext(StyleTextContextStore);

    const HandleContrastButton = (e) => {
        console.log(StyleInfo.text)
        // SkeletonInput()
        

        // 로딩바 작업용 주석
        // axios({
        //     method: 'post',
        //     url: 'data',
        //     data: {
        //         style: "contrast",
        //         comment: StyleInfo.text
        //     }
        // }).then(function(response){
        //     console.log(response.data);
        //     StyleInfo.setImgPath(response.data);
        //     // setImgPath(response.data)
        // }).catch(function(){
        //     console.log("에러");
        // })
    }

    const HandleRoundButton = (e) => {
        console.log(StyleInfo.text)
        // SkeletonInput()
        

        // 로딩바 작업용 주석
        // axios({
        //     method: 'post',
        //     url: 'data',
        //     data: {
        //         style: "contrast",
        //         comment: StyleInfo.text
        //     }
        // }).then(function(response){
        //     console.log(response.data);
        //     StyleInfo.setImgPath(response.data);
        //     // setImgPath(response.data)
        // }).catch(function(){
        //     console.log("에러");
        // })
    }

    return (
        <div className={style.menu}>
            <div className={style.menu__item}>
                <FontAwesomeIcon icon={faFont} className={style.icon_padding}/>
                    굵기
                <HorizonLine/>
                <IntegerStep/>
            </div>
            <div className={style.menu__item}>
                <FontAwesomeIcon icon={faPalette} className={style.icon_padding}/>
                    스타일
                <HorizonLine />
                <div className={style.font_style_grid}>
                    <div className={style.font_style_button}>
                        <button className={style.font_style_button_contrast} onClick={HandleContrastButton}>
                            별
                        </button>
                        대비
                    </div>
                    <div className={style.font_style_button}>
                        <button className={style.font_style_button_round} onClick={HandleRoundButton}>
                            뚠
                        </button>
                        둥글게
                    </div>
                </div>
            </div >
            <HorizonLine />
            <div className={style.menu__item}>
                <FontAwesomeIcon icon={faSquareCheck} className={style.icon_padding}/>
                검토
            </div>
        </div>
    );
}

export default Menu;
