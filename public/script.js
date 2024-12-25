const hardcodedKey = 12345; 

const resultDiv = document.getElementById("result");

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userKey = parseInt(document.getElementById("key").value);

    if (userKey !== hardcodedKey) {
        resultDiv.textContent = "Invalid Key!";
        return;
    }

    const p = 5;
    const g = 23;
    const clientPrivateKey = parseInt(hardcodedKey);
    const clientPublicKey = Math.pow(g, clientPrivateKey) % p;

    const response = await fetch("/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientPublicKey }),
    });
    console.log({clientPublicKey});

    const data = await response.json();
    const serverPublicKey = data.serverPublicKey;
    const sharedKey = Math.pow(serverPublicKey, clientPrivateKey) % p;

    const encryptedPassword = btoa(password + sharedKey);
    login(username, encryptedPassword);
});


async function login(username, encryptedPassword) {
  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password: encryptedPassword }),
  });
  const result = await response.json();
  resultDiv.textContent = result.message;
}