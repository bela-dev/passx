var globalParams = {};

function setParam(key, value) {
    globalParams[key] = value;
}

function getParam(key) {
    if(key in globalParams) {
        return globalParams[key];
    }
    return null;
}

function removeParam(key) {
    globalParams[key] = undefined;
}

export {setParam, getParam, removeParam}