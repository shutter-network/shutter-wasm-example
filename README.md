# Shutter WASM Example

This repository contains a minimum example demonstrating how to use the Shutter WASM library.

Run a webserver with `python -m http.server` and open `http://localhost:8000/index.html` in your
browser. You should see a blank page. Check the console output. It should read:

```
message: 0xaabbcc
encrypted: 0x18de9fc3e631c9fea457c4f8a0aff39f7bbd106ee4fa68947613da49ac5f3aa92c89d89721dc3aa3c5b8750dec1bb915c2ac05cad96e4717c299cc8d1bff8173165e0459de91c6eef987f2127b0888cd836baa04fe8287ec5ed8c8b84af56cb22f1f4e072d358ed6e0a30f70b45e9e049455c1d887a2364d826afe2a5e59a0f6c71631440249c7e412d1baef714b7300dee0bbb84cf2518145de9d89c1989615157daaee245eb54ba75f767a1cda6df780d3911a07c6aba2eb7b11131b3921b6
decrypted: 0xaabbcc
```

This demostrates successful encryption and decryption. The interesting stuff happens in
[index.js](index.js).
