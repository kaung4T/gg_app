import CryptoJS from 'crypto-js';

export const getMD5 = source => {
  let mdString = null;
  if (source != null) {
    try {
      mdString = CryptoJS.MD5(source).toString().toUpperCase();
    } catch (error) {
      console.error(error);
    }
  }
  return mdString;
};
