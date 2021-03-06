import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont, faPalette, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import 'antd/dist/antd.css'
import { Slider, InputNumber, Row, Col } from 'antd';
import { useState } from "react";

import style from "components/Menu/Menu.module.css";

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
                        <button className={style.font_style_button_contrast}>
                            별
                        </button>
                        대비
                    </div>
                    <div className={style.font_style_button}>
                        <button className={style.font_style_button_round}>
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
