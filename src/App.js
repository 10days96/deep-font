import "App.css";
import Header from "components/Header/header";
import Menu from "components/Menu/menu";
import Board from "components/Board/board";
import { useEffect, useState } from "react";

function App() {

    return (
        <div className="App">
            <Header />
            <div className="container">
                <Menu />
                <Board />
            </div>
        </div>
    );
}

export default App;
