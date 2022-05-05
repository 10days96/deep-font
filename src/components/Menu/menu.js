import { useEffect, useState } from "react";
import style from "components/Menu/Menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faFont } from "@fortawesome/free-solid-svg-icons";

function Menu() {
    const [selectedMenu, setSelectedMenu] = useState(0);

    useEffect(() => {
        setSelectedMenu(0);
    }, []);

    const onClickMenu = ({ target }) => {
        target.id === selectedMenu
            ? setSelectedMenu(0)
            : setSelectedMenu(target.id);
        console.log(target);
        console.log(selectedMenu);
    };

    return (
        <div className={style.menu}>
            <div id={1} className={style.menu__item}>
                <div className={style.menu__item__header}>
                    <FontAwesomeIcon icon={faFont} />
                    굵기
                    {/* <span onClick={onClickMenu} className="" */}
                    <FontAwesomeIcon icon={faAngleDown} onClick={onClickMenu} />
                    <div></div>
                </div>
                <div
                    className={
                        selectedMenu === "1"
                            ? [style.onFocus, style.menu__item__contents]
                            : style.menu__item__contents
                    }
                >
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </div>
            </div>
            <div id={2} className={style.menu__item}>
                <div className={style.menu__item__header}>
                    <FontAwesomeIcon icon={faFont} />
                    스타일
                    <FontAwesomeIcon icon={faAngleDown} onClick={onClickMenu} />
                </div>
                <div
                    className={style.menu__item__contents}
                    // className={selectedMenu === "2" ? style.onFocus : ""}
                >
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </div>
            </div>
            <div id={3} className={style.menu__item}>
                <div className={style.menu__item__header}>
                    <FontAwesomeIcon icon={faFont} />
                    검토
                    <FontAwesomeIcon icon={faAngleDown} onClick={onClickMenu} />
                </div>
                <div
                    className={style.menu__item__contents}
                    // className={selectedMenu === "3" ? style.onFocus : ""}
                >
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </div>
            </div>
            {/* <div id={2} onClick={onClickMenu}>
                스타일
                <div className={selectedMenu === "2" ? style.onFocus : ""}>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </div>
            </div>
            <div id={3} onClick={onClickMenu}>
                검토
                <div className={selectedMenu === "3" ? style.onFocus : ""}>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                </div>
            </div> */}
        </div>
    );
}

export default Menu;
