import React, { useEffect, useRef, useState } from "react";

import XMarkIcon from "../assets/icons/xmark";
import FileIcon from "../assets/icons/file";
import CloudArrowIcon from "../assets/icons/cloudarrow";

import "./style/defaultFilePicker.css";

function DefaultFilePicker(props) {

    const el = useRef();
    const inputFile = useRef();
    const [drag, setDrag] = useState(false);
    const [file, setFile] = useState();

    function updateFile(f) {
        const reader = new FileReader();
        reader.readAsText(f);
        setFile(f.name);
        reader.onload = () => {
            props.onChange(reader.result);
        };
    }

    useEffect(() => {
        el.current.addEventListener("drop", (e) => {
            e.preventDefault();
            setDrag(false);
            var file = e.dataTransfer.files[0];
            updateFile(file);
        });
    });

    return <div ref={el} className={"default-file-picker" + (drag ? " drag" : "")}
    onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
    }}
    onDragLeave={() => {
        setDrag(false);
    }}>
        <input type="file" ref={inputFile} style={{display: 'none'}} onChange={(e) => {
            updateFile(e.target.files[0]);
        }}/>
        {file ? <FileIcon/> : <CloudArrowIcon/>}
        <h1>{file ? file : "Drag & Drop File Here"}</h1>
        {file ? <></> : <>
            <h2>OR</h2>
            <button onClick={() => {inputFile.current.click();}}>Browse File</button>
        </>}
        {file ? <div className="remove" onClick={() => {setFile();}}><XMarkIcon/></div> : ""}
    </div>;
}

export default DefaultFilePicker;