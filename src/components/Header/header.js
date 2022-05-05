import style from "./Header.module.css";

function Header() {
    return (
        <header className={style.header}>
            <div className={style.headerTitle}>
                <h1>DEEP-FONT</h1>
            </div>
        </header>
    );
}

export default Header;
