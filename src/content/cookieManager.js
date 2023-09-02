import Cookies from 'universal-cookie';
import { user } from './userManager';

//** Cookie Managmang */
const cookies = new Cookies();

function getCookieSessionId() {
    return cookies.get("sessionId");
}

function getCookieUsername() {
    return cookies.get("username");
}

function getCookiePasswordLength() {
    return cookies.get("passwordLength");
}

function storeUser(user) {
    cookies.set('username', user.getName(), { path: '/', expires: getExpiresDate() });
    cookies.set('sessionId', user.getSessionId(), { path: '/', expires: getExpiresDate() });
    cookies.set("passwordLength", user.getPassword().length, {path: "/", expires: getExpiresDate()});
}

function getExpiresDate() {
    // Cookies expires one year in future
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
}

function unstoreUser(user) {
    cookies.remove("username");
    cookies.remove("sessionId");
    cookies.remove("passwordLength");
}

function isCookieAllowed() {
    return user ? (cookies.get("username") === user.getName()) : cookies.get("username") != undefined;
}

function setApiUrlCookie(apiUrl) {
    cookies.set("apiUrl", apiUrl, { path: '/', expires: getExpiresDate() });
}

function getApiUrlCookie() {
    return cookies.get("apiUrl");
}

function removeApiUrlCookie() {
    cookies.remove("apiUrl");
}

export {storeUser, getCookieSessionId, getCookieUsername, getCookiePasswordLength, isCookieAllowed, unstoreUser, setApiUrlCookie, removeApiUrlCookie, getApiUrlCookie}