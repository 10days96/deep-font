import React, {createContext, useState} from 'react'

export const StyleTextContextStore = createContext();

const StyleTextContext = (props) => {

    const [style, setStyle] = useState('');
    const [text, setText] = useState('');
    const [imgPath, setImgPath] = useState('');

    const StyleInfo = {
        style,
        setStyle,
        text,
        setText,
        imgPath,
        setImgPath
    }

    return(<StyleTextContextStore.Provider value={StyleInfo}>
        {props.children}
    </StyleTextContextStore.Provider>)
}

export default StyleTextContext;