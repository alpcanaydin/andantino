/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */

const b64ToUint6 = (nChr) => {
  if (nChr > 64 && nChr < 91) {
    return nChr - 65;
  } else if (nChr > 96 && nChr < 123) {
    return nChr - 71;
  } else if (nChr > 47 && nChr < 58) {
    return nChr + 4;
  } else if (nChr === 43) {
    return 62;
  } else if (nChr === 47) {
    return 63;
  }

  return 0;
};

export default (b64Str) => {
  const sB64Enc = b64Str.replace(/[^A-Za-z0-9+/]/g, '');
  const nInLen = sB64Enc.length;
  const nOutLen = (nInLen * 3) + 1 >> 2;
  const taBytes = new Uint8Array(nOutLen);

  for (let nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
      }
      nUint24 = 0;
    }
  }
  return taBytes.buffer;
};
/* eslint-enable */
