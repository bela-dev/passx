import { openInfo } from "./infoDisplay";

function genUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
}

function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

function getCurrentDateAndTimeAsString() {
  var currentdate = new Date(); 
  return currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/" 
  + currentdate.getFullYear() + "/"  
  + currentdate.getHours() + "/"  
  + currentdate.getMinutes() + "/" 
  + currentdate.getSeconds();
}

function getCurrentDateAsString() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function copyToClipboard(txt, password) {
  navigator.clipboard.writeText(txt);
  if(password) {
    var newText = "";
    for(var i = 0; i < txt.length; i++) {
      newText += '•';
    }
    txt = newText;
  }
  openInfo("Copied", 'Copied "' + txt + '"');
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function hasLetter(str) {
  return /[a-zA-Z]/.test(str);
}

export {genUUID, isNumberKey, downloadFile, getCurrentDateAsString, getCurrentDateAndTimeAsString, copyToClipboard, hasNumber, hasLetter}