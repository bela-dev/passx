import React, { useState, useEffect } from "react";
import { enable2FA } from "../../content/2faManager";

function TwoFASettings() {

    const [qrCode, setQrCode] = useState("");

    useEffect(() => {
        enable2FA(setQrCode);
    })

    return <div className="2fa">
        <p className="info">To enable two factor authentification scan the QR Code below </p>
        <img src={qrCode} alt={qrCode}/>
    </div>;
}

export default TwoFASettings;