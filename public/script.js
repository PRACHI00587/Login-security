
// const hardcodedKey = 12345; 


const resultDiv = document.getElementById("result");

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userKey = parseInt(document.getElementById("key").value);

    // if (userKey !== hardcodedKey) {
    //     resultDiv.textContent = "Invalid Key!";
    //     return;
    // }

    console.log("Password: ", {password});
    const p = BigInt(23);
const g = BigInt(5);
    const clientPrivateKey = BigInt(userKey);
    const clientPublicKey = g ** clientPrivateKey % p;

    const response = await fetch("/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientPublicKey: clientPublicKey.toString() }),
    });

    console.log({clientPublicKey});

    const data = await response.json(); 
    const serverPublicKey = BigInt(data.serverPublicKey);
    const sharedKey = serverPublicKey ** clientPrivateKey % p;

    const sharedKeyString = sharedKey.toString();
        console.log({sharedKeyString});

        let encryptedPassword = '';

    if (password && sharedKey) {
        // const sharedKeyString = sharedKey.toString();
        encryptedPassword = CryptoJS.AES.encrypt(password, sharedKeyString).toString();
        console.log("Encrypted Password: ", encryptedPassword);
    } else {
        console.log("Password or Shared Key is undefined.");
    }
    if (encryptedPassword) {
        login(username, encryptedPassword, clientPublicKey.toString());
    }
    // const encryptedPassword = btoa(password + sharedKey);
});
async function login(username, encryptedPassword, clientPublicKey) {
    console.log("Login function called");
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password: encryptedPassword, clientPublicKey }),
        });

        const loginResult = await response.json();

        resultDiv.textContent = loginResult.message;
        if (loginResult.message === "Login successful!") {
            resultDiv.style.color = "green";
            setTimeout(() => {
                window.location.href = "/welcome";
            }, 2000);
        } else {
            resultDiv.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.textContent = "An error occurred. Please try again.";
        resultDiv.style.color = "red";
    }
}
