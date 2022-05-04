import style from "./Menu.module.css"

function Menu() {

    return(
        <div className={style.menu}>
            <div>
                굵기
            </div>
            <div>
                스타일
            </div>
            <div>
                검토
            </div>
        </div>
    )
}

export default Menu