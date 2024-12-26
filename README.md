# LOGIN-SECURITY APPLICATION

## Description
The **LOGIN-SECURITY APPLICATION** is a web-based application that provides secure user authentication. The application uses a login form where users input their **username**, **password**,
and a **random key** (user's private key). The password is encrypted using the **Diffie-Hellman Key Exchange Algorithm**, ensuring a secure and private connection. The encrypted password is
then compared with the stored value in the database for authentication.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Installation
To install and set up the **LOGIN-SECURITY APPLICATION** locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/username/login-security.git
2. ```bash
    cd login-security
3. ```bash
    npm install
4. ```bash
    npm start

# Usage
Once the project is set up, you can use the following steps to test the login functionality:

1. Open your browser and visit http://localhost:3000 to view the login form.
2. Enter a username, password, and a random key (user's private key).
3. The password will be encrypted using Diffie-Hellman Key Exchange.
4. The encrypted password will be sent to the server and compared with the database for authentication.
5. If the credentials match, the user is successfully logged in.

# Features
> Diffie-Hellman Key Exchange Algorithm for secure password encryption.
> Secure User Authentication with encrypted passwords by using CryptoJS library and AES encryption method.
> Random Key Input for additional security.
> Database Matching to verify the encrypted password.
> For handling large numbers as key , big-integer library is used.

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# Acknowledgements

This README provides the necessary sections for a clear and complete description of your project. Feel free to replace the placeholders like `username/login-security.git` 
and `Person/Library` with actual details relevant to your project.

