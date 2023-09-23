import { openInfo } from "../globalComponents/infoDisplay";
import { sendAuthRequest } from "./apiManager";
import { decrypt, encrypt } from "./encryptionManager";
import { user } from "./userManager";

var entries = []
var cooldown = false;

function getEntries() {return entries;}

function updateEntryById(id, newEntry) {
    for(var i = 0; i < entries.length; i++) {
        if(entries[i].getId() == id) {
            entries[i] = newEntry;
        }
    }
}

function getEntryById(id) {
    for(var i = 0; i < entries.length; i++) {
        if(entries[i].getId() == id) {
            return entries[i]
        }
    }
    return undefined;
}

function loadEntries(callback) {
    if(cooldown) {
        return
    }
    cooldown = true;
    setTimeout(function() {
        cooldown = false;
    }, 2000);
    sendAuthRequest("entries", "GET", {}, (data) => {
        if(!data.status.includes("200")) {
            return;
        }
        entries = [];
        data.data.entries.forEach((e) => {
            entries.push(new PasswordEntry(
                e.id,
                decrypt(e.title, user.getPassword()),
                decrypt(e.username, user.getPassword()),
                decrypt(e.email, user.getPassword()),
                decrypt(e.url, user.getPassword()),
                decrypt(e.password, user.getPassword()),
                decrypt(e.description, user.getPassword()),
            ));
        });
        callback(entries);
    }, (error) => {
        console.log(error);
    });
}

function deleteEntries(title) {
    for(var i = 0; i < entries.length; i++) {
        if(entries[i].getTitle() === title) {
            deleteEntry(entries[i].getId());
        }
    }
}

function deleteEntry(id) {
    sendAuthRequest("entries/" + id, "DELETE", {}, (data) => {
        if(data.status.includes("200")) {
            setTimeout(() => {
                // TODO Load entries after adding without delay
                loadEntries(() => {
                    window.dispatchEvent(new CustomEvent("updateDashboard"));
                });
            }, 100);
        }else {
            openInfo("Error", data.message);
        }
    }, (error) => {
        openInfo("Error", error.message);
    })
}

function editEntry(id, title, username, url, email, password, description) {
    sendAuthRequest("entries/" + id, "PUT", {
        "entryService": encrypt(title, user.getPassword()),
        "entryUrl": encrypt(url, user.getPassword()),
        "entryDescription": encrypt(description, user.getPassword()),
        "entryUsername": encrypt(username, user.getPassword()),
        "entryEmail": encrypt(email, user.getPassword()),
        "entryPassword": encrypt(password, user.getPassword())
    }, (data) => {
        updateEntryById(id, new PasswordEntry(id, title, username, email, url, password, description));
        // TODO Load entries after adding without delay
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("updateDashboard"));
        }, 100);
    }, (error) => {
        openInfo("Error", error.message);
    });
}

function addEntry(title, username, url, email, password, description) {
    sendAuthRequest("entries", "POST", {
        "entryService": encrypt(title, user.getPassword()),
        "entryUrl": encrypt(url, user.getPassword()),
        "entryDescription": encrypt(description, user.getPassword()),
        "entryUsername": encrypt(username, user.getPassword()),
        "entryEmail": encrypt(email, user.getPassword()),
        "entryPassword": encrypt(password, user.getPassword())

    }, (data) => {
        setTimeout(() => {
            // TODO Load entries after adding without delay
            loadEntries(() => {
                window.dispatchEvent(new CustomEvent("updateDashboard"));
            });
        }, 1000);
    }, (error) => {
        openInfo("Error", error.message);
    });
}

function getUnencryptedJSON(id, title, username, email, url, password, description) {
    var output = [];
    for(var i = 0; i < getEntries().length; i++) {
        var v = getEntries()[i];
        output.push(v.toJSON(id, title, username, email, url, password, description));
    }
    return output;
}

function entryExists(title) {
    for(var i = 0; i < getEntries().length; i++) {
        var v = getEntries()[i];
        if(v.getTitle() === title) {
            return true;
        }
    }
    return false;
}

function getEncryptedJSON(key, id, title, username, email, url, password, description) {
    var output = [];
    for(var i = 0; i < getEntries().length; i++) {
        var v = getEntries()[i];
        output.push(v.toEncryptedJSON(key, id, title, username, email, url, password, description));
    }
    return output;
}

class PasswordEntry {

    constructor(id, title, username, email, url, password, description) {
        this.id = id;
        this.title = title;
        this.username = username;
        this.email = email;
        this.url = url;
        this.password = password;
        this.description = description;
    }

    getUrl() {return this.url;}
    getId() {return this.id;}
    getTitle() {return this.title;}
    getUsername() {return this.username;}
    getEmail() {return this.email;}
    getPassword() {return this.password;}
    getDescription() {return this.description;}

    toEncryptedJSON(key, title, username, password, email, description, url, id) {
        var output = {};
        if(title) {
            output.title = encrypt(this.getTitle(), key);
        }
        if(username) {
            output.username = encrypt(this.getUsername(), key);
        }
        if(password) {
            output.password = encrypt(this.getPassword(), key);
        }
        if(email) {
            output.email = encrypt(this.getEmail(), key);
        }
        if(description) {
            output.description = encrypt(this.getDescription(), key);
        }
        if(url) {
            output.url = encrypt(this.getUrl(), key);
        }
        if(id) {
            output.id = this.getId();
        }
        return output;
    }

    toJSON(title, username, password, email, description, url, id) {
        var output = {}
        if(title) {
            output.title = this.getTitle();
        }
        if(username) {
            output.username = this.getUsername();
        }
        if(password) {
            output.password = this.getPassword();
        }
        if(email) {
            output.email = this.getEmail();
        }
        if(description) {
            output.description = this.getDescription();
        }
        if(url) {
            output.url = this.getUrl();
        }
        if(id) {
            output.id = this.getId();
        }
        return output;
    }

    filter(filter) {
        filter = filter.toLowerCase().trim();
        return this.title.toLowerCase().includes(filter) || this.username.toLowerCase().includes(filter) || this.email.toLowerCase().includes(filter) || this.url.toLowerCase().includes(filter) || this.description.toLowerCase().includes(filter);
    }

}

function clearEntries() {entries = [];}

export { PasswordEntry, loadEntries, getEntries, entryExists, deleteEntries, getEntryById, addEntry, editEntry, deleteEntry, clearEntries, getUnencryptedJSON, getEncryptedJSON }