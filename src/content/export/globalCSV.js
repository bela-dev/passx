import React from "react";
import { getEntries } from "../entryManager";

import { PasswordEntry } from "../entryManager";

import { downloadFile } from "../../globalComponents/utils";
import { getCurrentDateAndTimeAsString } from "../../globalComponents/utils";
import { getCSV, getEntriesFromCSV } from "./csvManager";

const CSV_TITLES = ["Account", "Login Name", "Password", "Web Site", "Comments"];

class GlobalCSV {
    getType() {
        return "global-csv";
    }
    getFormat() {
        return "csv";
    }
    getTitle() {
        return "Global CSV (" + this.getType().toUpperCase() + ")";
    }
    isEncrypted() {return false;}
    export() {
        var entries = [];
        for(var i = 0; i < getEntries().length; i++) {
            var e = getEntries()[i];
            entries.push([e.getTitle(), e.getUsername(), e.getPassword(), e.getUrl(), e.getDescription()]);
        }
        var output = getCSV(
            CSV_TITLES,
            entries
        );
        downloadFile({
            data: output,
            fileName: "global-csv-" + getCurrentDateAndTimeAsString() + "." + this.getFormat(),
            fileType: 'text/csv',
        });
    }
    check(data) {
        return data.startsWith('"');
    }
    checkPassword(data) {return true;}
    import(data, password) {
        var entries = getEntriesFromCSV(CSV_TITLES, data);
        var output = [];
        for(var i = 0; i < entries.length; i++) {
            var v = entries[i];
            var newEntry = new PasswordEntry(-1, v[0], v[1], "", v[3], v[2], v[4]);
            output.push(newEntry);
        }
        return output;
    }
}

export default GlobalCSV;