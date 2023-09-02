import CryptoJS from "crypto-js";

function decrypt(txt, skey) {
    return CryptoJS.AES.decrypt(txt, skey).toString(CryptoJS.enc.Utf8);
}

function encrypt(txt, skey) {
    return CryptoJS.AES.encrypt(txt, skey).toString();
}

// Encryption for the password test
const SALT = "WyuZFx5zOy65AsZRGLJcn8OFuGq5LvMI";

function decryptEqualOutput(txt, skey) {
  var salt = encryptWSaltOutput(SALT, skey, SALT);
  skey = (skey + salt).substring(0, 32);
  var key = CryptoJS.enc.Utf8.parse(skey);
  var iv = CryptoJS.enc.Utf8.parse(skey.substring(0, 16));
  return CryptoJS.AES.decrypt(txt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
}

function encryptEqualOutput(txt, skey) {
  var salt = encryptWSaltOutput(SALT, skey, SALT);
  skey = (skey + salt).substring(0, 32);
  var key = CryptoJS.enc.Utf8.parse(skey);
  var iv = CryptoJS.enc.Utf8.parse(skey.substring(0, 16));
  return CryptoJS.AES.encrypt(txt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  }).toString();
}

function encryptWSaltOutput(txt, skey, salt) {
  skey = (skey + salt).substring(0, 32);
  var key = CryptoJS.enc.Utf8.parse(skey);
  var iv = CryptoJS.enc.Utf8.parse(skey.substring(0, 16));
  return CryptoJS.AES.encrypt(txt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  }).toString();
}


export {encrypt, decrypt, encryptEqualOutput, decryptEqualOutput}
  