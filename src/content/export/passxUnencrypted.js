import { ExportOption } from "../exportManager";
import { user } from "../userManager";
import {downloadFile, getCurrentDateAndTimeAsString} from "../../globalComponents/utils";
import { encrypt } from "../encryptionManager";
import { getUnencryptedJSON } from "../entryManager";

import { PasswordEntry } from "../entryManager";

class PassxUnencryptedExport {
    getType() {
        return "passx-backup-unenc";
    }
    getTitle() {
        return "Passx Unencrypted (JSON)";
    }
    isEncrypted() {
        return false;
    }
    export() {
        var output = {};
        output.type = this.getType();
        output.user = {
            name: user.getName(),
            passwordTest: encrypt(user.getPassword(), user.getPasswordTest()),
        };
        output.entries = getUnencryptedJSON(true, true, true, true, true, true, true);
        downloadFile({
            data: JSON.stringify(output),
            fileName: "passx-unenc-" + getCurrentDateAndTimeAsString() + ".json",
            fileType: 'text/json',
        });
    }
    check(data) {
        return data.user.passwordTest && data.entries && data.type === this.getType();
    }
    checkPassword() {
        return true;
    }
    import(data, password) {
        var output = [];
        var entries = data.entries;
        for(var i = 0; i < entries.length; i++) {
            var v = entries[i];
            var newEntry = new PasswordEntry(v.id, v.title, v.username, v.email, v.url, v.password, v.description);
            output.push(newEntry);
        }
        return output;
    }
}

export default PassxUnencryptedExport;