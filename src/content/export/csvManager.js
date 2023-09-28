function getCSV(titles, entries) {
    var output = getCSVLine(titles);
    for(var i = 0; i < entries.length; i++) {
        var e = entries[i];
        output += getCSVLine(e);
    }
    return output;
}

function getEntriesFromCSV(titles, data) {
    const lines = data.split("\n");
    var output = [];
    for(var i = 1; i < lines.length; i++) {
        var lineEntries = lines[i].split('",');
        var entry = [];
        for(var y = 0; y < lineEntries.length; y++) {
            entry.push(lineEntries[y].substring(1, lineEntries[y].length));
        }
        output.push(entry);
    }
    return output;
}

function getCSVLine(arr) {
    var output = "";
    for(var i = 0; i < arr.length; i++) {
        output += '"' + arr[i] + '",';
    }
    output = output.substring(0, output.length - 1);
    output += "\n";
    return output;
}

export {getCSV, getEntriesFromCSV}