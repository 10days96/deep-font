import style from './Board.module.css'
import Canvas from './canvas'

function Board() {
    return(
        <div className={style.board}>
            <Canvas/>
        </div>
    )
}

export default Board