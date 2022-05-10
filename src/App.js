import "App.css";
import Header from "components/Header/header";
import Menu from "components/Menu/menu";
import Board from "components/Board/board";
import StyleTextContext from "components/Context/StyleCommmentContext";

function App() {

    return (
        <div className="App">
            <Header />
            <div className="container">
                <StyleTextContext>
                    <Menu />
                    <Board />
                </StyleTextContext>
            </div>
        </div>
    );
}

export default App;
