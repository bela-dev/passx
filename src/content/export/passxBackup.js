import { ExportOption } from "../exportManager";
import { user } from "../userManager";
import {downloadFile, getCurrentDateAndTimeAsString, getCurrentDateAsString} from "../../globalComponents/utils";
import { decrypt, encrypt } from "../encryptionManager";
import { getEncryptedJSON, PasswordEntry } from "../entryManager";
import {getPasswordTest} from "../userManager";

class PassxBackupExport {
    getType() {
        return "passx-backup-enc";
    }
    getTitle() {
        return "Passx Backup (JSON)";
    }
    isEncrypted() {
        return true;
    }
    export() {
        var output = {};
        output.type = this.getType();
        output.user = {
            name: user.getName(),
            passwordTest: encrypt(user.getPasswordTest(), user.getPassword()),
        };
        output.entries = getEncryptedJSON(user.getPassword(), true, true, true, true, true, true, true);
        downloadFile({
            data: JSON.stringify(output),
            fileName: "passx-enc-" + getCurrentDateAndTimeAsString() + ".json",
            fileType: 'text/json',
        });
    }
    check(data) {
        return data.user.passwordTest && data.entries && data.type === this.getType();
    }
    checkPassword(data, password) {
        return decrypt(data.user.passwordTest.toString(), password) === getPasswordTest(password);
    }
    import(data, password) {
        var output = [];
        var entries = data.entries;
        for(var i = 0; i < entries.length; i++) {
            var v = entries[i];
            var newEntry = new PasswordEntry(v.id, decrypt(v.title, password), decrypt(v.username, password), decrypt(v.email, password), decrypt(v.url, password), decrypt(v.password, password), decrypt(v.description, password));
            output.push(newEntry);
        }
        return output;
    }
}

export default PassxBackupExport;