import React from "ract";

function ImportPopUp() {
    return <PopUp 
    className={"export"}
    title={"Export Data"}
    
    warning={!isEncrypted(activeFormat) ? "This method does not support encryption! You should save unencrypted files only temporary." : "/e"}
    btnLeft={{
        title: "Import",
        onClick: () => {
            exportData(activeFormat);
        }
    }}>
        <DefaultDropdown items={getOptions()} onChange={setActiveFormat}/>
        
    </PopUp>;
}

export default ImportPopUp;