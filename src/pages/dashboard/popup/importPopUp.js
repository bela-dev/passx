import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "../style/importPopUp.css";

import PopUp from "../../../globalComponents/popUp";

import DefaultInputField from "../../../globalComponents/defaultInputField";
import DefaultDropdown from "../../../globalComponents/defaultDropdown";
import DefaultCheckbox from "../../../globalComponents/defaultCheckbox";
import { getExportOption, getOptionTitles } from "../../../content/exportManager";
import DefaultFilePicker from "../../../globalComponents/defaultFilePicker";
import DefaultButton from "../../../globalComponents/defaultButton";
import { user } from "../../../content/userManager";
import ImportPopUpLoading from "./importPopUpLoading";

function ImportPopUp(props) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [fileContent, setFileContent] = useState();
    const [activeFormat, setActiveFormat] = useState(-1);

    if(loading) {
        return <ImportPopUpLoading fileContent={fileContent} activeFormat={activeFormat}/>;
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
        <DefaultFilePicker onChange={setFileContent}/>
        <DefaultDropdown items={getOptionTitles()} onChange={setActiveFormat}/>
    </PopUp>;
}

export default ImportPopUp;