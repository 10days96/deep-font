import React, {createContext, useState} from 'react'

export const StyleTextContextStore = createContext();

const StyleTextContext = (props) => {

    const [flag, setFlag] = useState(true);
    const [style, setStyle] = useState(0)
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [imgPath, setImgPath] = useState('');


    const StyleInfo = {
        flag,
        setFlag,
        style,
        setStyle,
        text,
        setText,
        imgPath,
        setImgPath,
        loading,
        setLoading
    }

    return(<StyleTextContextStore.Provider value={StyleInfo}>
        {props.children}
    </StyleTextContextStore.Provider>)
}

export default StyleTextContext;