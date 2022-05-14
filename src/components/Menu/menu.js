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
        <div className={style.horizonLine}>
          <span style={{ background: "#fff"}}></span>
        </div>
      ); 
}

function IntegerStep() {
    
    const StyleInfo = useContext(StyleTextContextStore);

    const [state, setState] = useState(1);
    const inputValue = state;

    const onChange = (value) => {
        setState(value)
        StyleInfo.setFlag(false);
        StyleInfo.setLoading(true);
        axios({
            method: 'post',
            url: 'weight',
            data: {
                style: StyleInfo.style,
                weight: state,
                text: StyleInfo.text
            }
        }).then(function(response){
            console.log("데이터 송신 완료");
            console.log(StyleInfo.style)
            StyleInfo.setStyle(StyleInfo.style)
            StyleInfo.setImgPath(response.data);
            StyleInfo.setLoading(false)
        }).catch(function(){
            console.log("에러");
        })
    }

    return(
        <Row>
            <Col span={12}>
                <Slider
                min={1}
                max={5}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
            />
            </Col>
            <Col span={4}>
                <InputNumber
                    className={style.inputSlider}
                    min={1}
                    max={5}
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
        StyleInfo.setFlag(false);
        StyleInfo.setLoading(true);
        axios({
            method: 'post',
            url: 'img',
            data: {
                style: "1",
                text: StyleInfo.text
            }
        }).then(function(response){
            console.log("데이터 송신 완료");
            StyleInfo.setStyle(1)
            StyleInfo.setImgPath(response.data);
            StyleInfo.setLoading(false)
        }).catch(function(){
            console.log("에러");
        })
    }

    const HandleRoundButton = (e) => {
        StyleInfo.setFlag(false)
        StyleInfo.setLoading(true);
        axios({
            method: 'post',
            url: 'img',
            data: {
                style: "2",
                text: StyleInfo.text
            }
        }).then(function(response){
            console.log("데이터 송신 완료");
            StyleInfo.setStyle(2)
            StyleInfo.setImgPath(response.data);
            StyleInfo.setLoading(false);
        }).catch(function(){
            console.log("에러");
        })
    }

    const HandleSerifButton = (e) => {
        StyleInfo.setFlag(false);
        StyleInfo.setLoading(true);
        axios({
            method: 'post',
            url: 'img',
            data: {
                style: "3",
                text: StyleInfo.text
            }
        }).then(function(response){
            console.log("데이터 송신 완료");
            StyleInfo.setStyle(3)
            StyleInfo.setImgPath(response.data);
            StyleInfo.setLoading(false);
        }).catch(function(){
            console.log("에러");
        })
    }

    

    return (
        <div className={style.menu}>
            <div className={style.menu__item}>
                <FontAwesomeIcon icon={faFont} className={style.icon_padding}/>
                    굵기
                <HorizonLine/>
                <IntegerStep fontStyle={StyleInfo.style}/>
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
                    <div className={style.font_style_button}>
                        <button className={style.font_style_button_serif} onClick={HandleSerifButton}>
                            획
                        </button>
                        세리프
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
