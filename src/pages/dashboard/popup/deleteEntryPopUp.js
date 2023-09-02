import React from "react";
import { deleteEntry } from "../../../content/entryManager";
import PopUp from "../../../globalComponents/popUp";

function DeleteEntryPopUp(props) {
    return <PopUp
        title="Delete Entry"
        className="delete"
        btnLeft={{
            title: "Delete",
            onClick: () => {
                deleteEntry(props.entryId);
            }
        }}
        btnRight={{
            title: "Cancel",
            onClick: () => {}
        }}
    >
        <p>Are you sure that you want to delete this entry?</p>
    </PopUp>;
}

export default DeleteEntryPopUp;