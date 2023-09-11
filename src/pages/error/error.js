import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import DefaultWrapper from "../../globalComponents/defaultWrapper";

import SadSmiley from "../../assets/icons/sadSmiley";
import HappySmiley from "../../assets/icons/happySmiley";

import "./error.css";
import { isCookieAllowed } from "../../content/cookieManager";
import { setParam } from "../../globalComponents/globalParams";

const errorMsgs = new Map();
errorMsgs.set("401", {
    title: "Unauthorized",
    msg: "Sorry, but you are not authorized to get in here"
});
errorMsgs.set("404", {
    title: "Not Found",
    msg: "Ooops. This page does not exist..."
});
errorMsgs.set("500", {
    title: "Internal Server Error",
    msg: "Sorry, it's our fault! Please try again later"
});
errorMsgs.set("666", {
    "title": ":(",
    "msg": "We are very sad, that you left us"
});
errorMsgs.set("601", {
    "title": "Session expired",
    "msg": "Your session is expired. Please login again."
});
errorMsgs.set("701", {
    "title": "Enabled 2FA",
    "msg": "You successfully enabled two factor authentification"
});
errorMsgs.set("702", {
    "title": "Disabled 2FA",
    "msg": "You successfully disabled two factor authentification"
});


function ErrorPage() {

    const { error } = useParams();
    const navigate = useNavigate();

    var errorCode = error;

    if(!errorMsgs.has(errorCode)) {
        errorCode = "404";
    }
    useEffect(() => {
        if(errorCode === "601" && isCookieAllowed()) {
            setParam("reloginMsg", "Your session expired!");
            navigate("/relogin");
        }
    });

    return <DefaultWrapper>
        <div className="error-page">
            {errorCode > 700 ? <HappySmiley/> : <SadSmiley/>}
            <div className="content">
                <h1>{errorCode} {errorMsgs.get(errorCode).title}</h1>
                <p>{errorMsgs.get(errorCode).msg}</p>
                <p><a href="/login">Go to login</a></p>
            </div>
        </div>
    </DefaultWrapper>;
}

export default ErrorPage;