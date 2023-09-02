import React, { useState } from "react";
import { CSVDownload } from "react-csv";
import { useNavigate, useParams } from "react-router-dom";
import { addEntry, editEntry } from "../../../content/entryManager";

import { openInfo } from "../../../globalComponents/infoDisplay";
import PopUp from "../../../globalComponents/popUp";


import DefaultInputField from "../../../globalComponents/defaultInputField";
import DefaultDropdown from "../../../globalComponents/defaultDropdown";
import DefaultCheckbox from "../../../globalComponents/defaultCheckbox";
import { exportData, getOptions, isEncrypted } from "../../../content/exportManager";

function ExportPopUp(props) {

    const [activeFormat, setActiveFormat] = useState(-1);

    const [expDescription, setExpDescription] = useState(true);
    const [expTitle, setExpTitle] = useState(true);

    const [currentExportData, setCurrentExportData] = useState(-1);
    if(currentExportData != -1) {
        console.log(currentExportData);
        return <CSVDownload data={currentExportData} target="_blank" />;
    }

    return <PopUp 
    className={"export"}
    title={"Export Data"}
    
    warning={!isEncrypted(activeFormat) ? "This method does not support encryption! You should save unencrypted files only temporary." : "/e"}
    btnLeft={{
        title: "Export",
        onClick: () => {
            setCurrentExportData(exportData(activeFormat));
        }
    }}>
        <DefaultDropdown items={getOptions()} onChange={setActiveFormat}/>
        
        <DefaultCheckbox checked onChange={setExpDescription}>include description</DefaultCheckbox>
        <DefaultCheckbox checked onChange={setExpTitle}>include title</DefaultCheckbox>
    </PopUp>;

}

export default ExportPopUp;