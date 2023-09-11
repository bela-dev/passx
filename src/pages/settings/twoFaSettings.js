import React, { useState, useEffect } from "react";
import { enable2FA, is2FAActivated } from "../../content/2faManager";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EnableTwoFaSettings from "./enableTwoFaSettings";
import DisableTwoFaSettings from "./disableTwoFaSettings";

function TwoFASettings() {

    const [content, setContent] = useState(<></>);

    useEffect(() => {
        is2FAActivated((active) => {
            if(active) {
                setContent(<DisableTwoFaSettings/>);
            }else {
                setContent(<EnableTwoFaSettings/>);
            }
        });
    })

    return <div className="twofa">
        {content}
    </div>;
}

export default TwoFASettings;