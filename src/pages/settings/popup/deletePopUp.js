import React from "react";

import PopUp from "../../../globalComponents/popUp";

import setInfo from "../../../globalComponents/infoDisplay";
import { setParam } from "../../../globalComponents/globalParams";
import { swipeRight } from "../../../globalComponents/animationWrapper";
import { deleteAccount, updateUserPassword } from "../../../content/userManager";
import { useNavigate } from "react-router-dom";

var password;

function setPasswordPopUp(v) {
    password = v;
}

function DeletePopUp(props) {

    const navigate = useNavigate();

    return <PopUp
        title="Confirm Delete Account"
        closeLink="settings/delete"
        className="confirm"
        btnLeft={{
            title: "Delete",
            onClick: () => {
                deleteAccount(password, (d) => {
                    if(d.status.includes("200")) {
                        setTimeout(() => {
                            navigate("/error/666");
                        }, 700);
                    }else {
                        window.dispatchEvent(new CustomEvent("setDeleteSettingsError", {
                            detail: {
                                error: d.message
                            }
                        }));
                    }
                })
            }
        }}
        btnRight={{
            title: "Cancel",
            onClick: () => {}
        }}
    >
        <p>Are you sure that you want to delete your account? All your stored passwords will be completely deleted from all our systems!</p>
    </PopUp>;
}

export {setPasswordPopUp};
export default DeletePopUp;