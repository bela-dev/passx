import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "../style/importPopUp.css";

import PopUp from "../../../globalComponents/popUp";

import DefaultInputField from "../../../globalComponents/defaultInputField";
import DefaultDropdown from "../../../globalComponents/defaultDropdown";
import DefaultCheckbox from "../../../globalComponents/defaultCheckbox";
import { checkFileEncryptionType, getExportOption, getOptionTitles } from "../../../content/exportManager";
import DefaultFilePicker from "../../../globalComponents/defaultFilePicker";
import DefaultButton from "../../../globalComponents/defaultButton";
import { user } from "../../../content/userManager";
import ImportPopUpLoading from "./importPopUpLoading";
import { openInfo } from "../../../globalComponents/infoDisplay";

function ImportPopUp(props) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [fileContent, setFileContent] = useState();
    const [activeFormat, setActiveFormat] = useState(-1);
    const [defaultFormat, setDefaultFormat] = useState(-1);

    if(loading) {
        return <ImportPopUpLoading fileContent={fileContent} activeFormat={defaultFormat !== -1 ? defaultFormat : activeFormat}/>;
    }

    return <PopUp 
    noclose
    className={"import"}
    title={"Import Data"}
    btnLeft={{
        title: "Import",
        onClick: () => {
            setLoading(true);
            return;
        }
    }}>
        <DefaultFilePicker onChange={(v, callbackValid) => {
            if(!v) {
                setFileContent(v);
                setDefaultFormat(-1);
                return;
            }
            var checkResult = checkFileEncryptionType(v);
            if(checkResult != -1) {
                setFileContent(v);
                setDefaultFormat(checkResult);
            }else {
                openInfo("Error", "Invalid File");
                callbackValid(false);
            }
        }}/>
        <DefaultDropdown items={getOptionTitles()} onChange={setActiveFormat} forceActive={defaultFormat}/>
    </PopUp>;
}

export default ImportPopUp;