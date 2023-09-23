import React from "react";

import PopUp from "../../../globalComponents/popUp";

import setInfo from "../../../globalComponents/infoDisplay";
import { setParam } from "../../../globalComponents/globalParams";
import { swipeRight } from "../../../globalComponents/animationWrapper";
import { updateUserPassword } from "../../../content/userManager";

var currentPassword, newPassword;

function setCurrentPasswordPopUp(v) {
    currentPassword = v;
}

function setNewPasswordPopUp(v) {
    newPassword = v;
}

function PasswordChangePopUp(props) {
    return <PopUp
        title="Confirm Password Change"
        closeLink="settings/password"
        className="confirm"
        btnLeft={{
            title: "Confirm",
            onClick: () => {
                updateUserPassword(currentPassword, newPassword, (d) => {
                    if(d.status.includes("200")) {
                        setParam("logoutMessage", "Password change was successfull. Please login again");
                        swipeRight("logout");
                    }else {
                        window.dispatchEvent(new CustomEvent("setPasswordSettingsError", {
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
        <p>Are you sure that you want to change your master password? This action cannot be undone!</p>
    </PopUp>;
}

export {setNewPasswordPopUp, setCurrentPasswordPopUp};
export default PasswordChangePopUp;