import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import CheckIcon from "../../../assets/icons/check";
import ReplaceIcon from "../../../assets/icons/replace";

import { user } from "../../../content/userManager";
import { getExportOption } from "../../../content/exportManager";

import DefaultButton from "../../../globalComponents/defaultButton";
import DefaultCheckbox from "../../../globalComponents/defaultCheckbox";
import { addEntry, deleteEntries, entryExists } from "../../../content/entryManager";
import DefaultDropdown from "../../../globalComponents/defaultDropdown";
import DefaultInputField from "../../../globalComponents/defaultInputField";

var confirmedEntries = [];
var replaceEntries = [];

function ImportPopUpLoading(props) {

    var fileContent;
    var exportOption;
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if(!started) {
            setStarted(true);
            setTimeout(() => {
                if(!props.fileContent) {
                    setErrorText("You have to choose a file first");
                }else if(!fileContent) {
                    fileContent = JSON.parse(props.fileContent);
                    exportOption = getExportOption(props.activeFormat);
                    executeLoadingStep(5);
                }
            }, 1000);
        }
        
    });
    
    const navigate = useNavigate();

    const passwordEl = useRef();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState("");

    const [passwordEntries, setPasswordEntries] = useState([]);
    const [lastExecuting, setLastExecuting] = useState(-1);
    const [loadingText, setLoadingText] = useState("Loading file");
    const [errorText, setErrorText] = useState();
    const [successText, setSuccessText] = useState();
    const [loadingState, setLoadingState] = useState(2);
    const [update, setUpdate] = useState(0);

    if(errorText || successText) {
        return <div className="import-loading">
            <div className={"display" + (successText ? " success" : "") + (errorText ? " error" : "")}>
                <h2>{errorText}{successText}</h2>
                <DefaultButton onClick={() => {
                    navigate("/dashboard");
                }}>Ok</DefaultButton>
            </div>
        </div>;
    }

    const loadingSteps = [];
    loadingSteps[5] = () => {
        setLoadingText("Check format");
        if(exportOption.check(fileContent)) {
            executeLoadingStep(10);
        }else {
            setErrorText("Your file format is not a valid!");
        }
    };
    loadingSteps[10] = () => {
        setLoadingText("Authorize");
        if(exportOption.checkPassword(fileContent, user.getPassword())) {
            executeLoadingStep(15);
        }else {
            //TODO: Possibility to enter different password
            executeLoadingStep(12);
        }
    };
    loadingSteps[12] = () => {
        setPasswordVisible(true);
        setLoadingText("Enter password");
    };
    loadingSteps[15] = () => {
        setLoadingText("Reading data");
        confirmedEntries = [];
        replaceEntries = [];
        console.log(fileContent);
        var entries = exportOption.import(fileContent, enteredPassword ? enteredPassword : user.getPassword());
        setPasswordEntries(entries);
    };
    loadingSteps[20] = () => {
        setLoadingText("Adding entries");
        var stepSize = Math.round(80/confirmedEntries.length);
        confirmedEntries.forEach((e, i) => {
            setTimeout(() => {
                if(replaceEntries.includes(e)) {
                    deleteEntries(e.getTitle());
                }
                addEntry(e.getTitle(), e.getUsername(), e.getUrl(), e.getEmail(), e.getPassword(), e.getDescription());
                setLoadingState(20 + stepSize * (i+1));
            }, i * 400);
        });
        setTimeout(() => {
            setSuccessText("Successfully imported " + confirmedEntries.length + " entries");
        }, confirmedEntries.length * 400 + 400);
    };


    function executeLoadingStep(step) {
        setLoadingState(step);
        setTimeout(() => {
            loadingSteps[step]();
        }, 600);
    }

    return <div className="import-loading">
        <div className="display">
            <h3>{loadingText}...</h3>
            <div className="loading" style={{
                width: loadingState + "%"
            }}/>
            {passwordVisible ? <div className="password-input" ref={passwordEl}>
                <DefaultInputField password placeholder="Enter Password" onChange={(e) => {setEnteredPassword(e.target.value)}}/>
                <div className="confirm-password" onClick={() => {
                    exportOption = getExportOption(props.activeFormat);
                    fileContent = JSON.parse(props.fileContent);
                    if(enteredPassword && exportOption.checkPassword(fileContent, enteredPassword)) {
                        executeLoadingStep(15);
                        setPasswordVisible(false);
                    }else {
                        setEnteredPassword("");
                        passwordEl.current.children[0].classList.add("fail");
                        passwordEl.current.children[0].value = "";
                        
                        setTimeout(() => {
                            passwordEl.current.children[0].classList.remove("fail");
                        }, 400);
                    }
                }}><CheckIcon/></div>
            </div> : ""}
            {passwordEntries.length > 0 && loadingState == 15 ? <div className="choose-wrapper">
                <div className="entry-list">
                    <div className="entry">
                        {passwordEntries.map((e) => {
                            return <DefaultCheckbox icons={
                                <>
                                    {entryExists(e.getTitle()) ? <div className={"icon" + (replaceEntries.includes(e) ? " active" : "")} title="Replace current Entry" onClick={() => {
                                        if(replaceEntries.includes(e)) {
                                            replaceEntries.splice(replaceEntries.indexOf(e), 1);
                                            
                                        }else {
                                            replaceEntries.push(e);

                                        }
                                        setUpdate(update + 1);
                                    }}><ReplaceIcon/></div> : ""}
                                </>
                            } textclick checked onChange={(v) => {
                                if(v === undefined) return;
                                
                                if(v) {
                                    if(!confirmedEntries.includes(e)) {
                                        confirmedEntries.push(e);
                                        setUpdate(update + 1);
                                    }
                                }else if(v === false) {
                                    if(confirmedEntries.includes(e)) {
                                        confirmedEntries.splice(confirmedEntries.indexOf(e), 1);
                                        setUpdate(update + 1);
                                    }
                                }
                            }}>{e.title}</DefaultCheckbox>;
                        })}
                    </div>
                </div>
                <div className="confirm">
                    <h3>Import {confirmedEntries.length} item{confirmedEntries.length !== 1 ? "s" : ""}</h3>
                    <DefaultButton onClick={() => {executeLoadingStep(20)}}>Import</DefaultButton>
                    <DefaultButton onClick={() => {navigate("/dashboard");}}>Cancel</DefaultButton>
                </div>
            </div> : ""}
        </div>
    </div>;
}

export default ImportPopUpLoading;