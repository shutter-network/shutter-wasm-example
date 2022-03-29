// Replace this URL with ./encrypt.wasm or ./decrypt.wasm to reduce the file size to be loaded. Of
// course, only encryption or decryption will work, respectively.
const WASM_URL = "./both.wasm";

let shcryptoWasm;
function init() {
  const go = new Go();
  if ("instantiateStreaming" in WebAssembly) {
    return WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then((obj) => {
      shcryptoWasm = obj.instance;
      go.run(shcryptoWasm);
    });
  } else {
    return fetch(WASM_URL)
      .then((resp) => resp.arrayBuffer())
      .then((bytes) =>
        WebAssembly.instantiate(bytes, go.importObject).then((obj) => {
          shcryptoWasm = obj.instance;
          go.run(shcryptoWasm);
        })
      );
  }
}

function main() {
  const message = ethers.utils.arrayify("0xaabbcc");
  const eonPublicKey = ethers.utils.arrayify(
    "0x0B94B81B1CC392CBD4604EB90E3F4355FA6925D56AC10BBD01E62A9430869B2316F749CAFB20E379BE3AF06701766836A1A0F6A891B090A5789B9BBCEABE3CE40DD32957CBF7EB6775F4BD513A3019EE33CC03568100042F02AC67943680A9DC29AD04AC0A4A4673521A8FC8FEED080977AF44CD23FF7EB4E62E1A11BCC634FC"
  );
  const proposalId = ethers.utils.arrayify("0x000000000000000A");
  // sigma is a salt value. It should be generated randomly and not be stored since it can be used
  // to decrypt the message.
  const sigma = ethers.utils.arrayify("0xF781882B813C3D036BF1FA87617C9BA4AFDDCD067C24E7BD6D16716B3206F0C5");

  const encryptedMessage = window.shcrypto_encrypt(
    message,
    eonPublicKey,
    proposalId,
    sigma
  );

  // This key has been generated for above eon key and proposal id.
  const decryptionKey = ethers.utils.arrayify(
    "0x219BA688C8505178E50E7E4FEAEFA21BDA69172E71B980A365F6F873DC9B3AAA20076B6D92CB58B24D14B70789A0B37418A0508624C83A7C8E35ED0A8DBB0E4B"
  )
  const decryptedMessage = window.shcrypto_decrypt(
    ethers.utils.arrayify(encryptedMessage),
    decryptionKey
  );

  console.log("message:", ethers.utils.hexlify(message));
  console.log("encrypted:", encryptedMessage);
  console.log("decrypted:", decryptedMessage);
}

init().then(main);
