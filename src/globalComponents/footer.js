import React from "react";

import CuodeXIcon from "../assets/icons/cuodex";
import { getCookieUsername } from "../content/cookieManager";
import { user } from "../content/userManager";
import { swipeRight } from "./animationWrapper";
import { openInfo } from "./infoDisplay";

import "./style/footer.css";

function Footer() {

    var changeApiDisabled = user || getCookieUsername() != undefined || window.location.href.endsWith("change-api");

    function handleChangeApi() {
        if(changeApiDisabled) {
            openInfo("Error", "You have to log out to perform this action!");
            return;
        }
        swipeRight("change-api");
    }

    return <footer>
        <div className="cuodex" title="Cuodex" onClick={() => {
            window.open("https://cuodex.net", "_blank");
        }}>
            <CuodeXIcon/>
        </div>
        <div className="links">
            <a onClick={handleChangeApi} className={changeApiDisabled ? "disabled" : ""}>Change API</a>
            <span>|</span>
            <a href="https://cuodex.net/passx" target="_blank">About PassX</a>
            <span>|</span>
            <a href="https://policies.cuodex.net/imprint" target="_blank">Imprint</a>
        </div>
    </footer>;
}

export default Footer;