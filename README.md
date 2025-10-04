# Chatter

Chatter is a secure, real-time chat web application designed for private communication between two users. Messages are encrypted and can only be read by users with the correct key, ensuring that conversations remain confidential. Without the key, chats remain encrypted and inaccessible.

---

## Features

* **Encrypted Messaging**: Conversations are secured with encryption; only users with the correct key can decrypt and read messages.
* **Authentication**: JWT-based authentication using `jsonwebtoken` and `cookie-parser` to manage user sessions and tokens.
* **Robust Backend**: Built on **Node.js** and **Express.js**, with data persistence handled by **MongoDB** via **Mongoose**.
* **Middleware**:

  * `morgan` for HTTP request logging.
  * `cookie-parser` for managing tokens.
  * `dotenv` for environment variable configuration.
* **Frontend**: Built with **EJS** as the view engine, styled using **Tailwind CSS** and **Flowbite UI** for a clean and responsive user interface.
* **Scalable Architecture**: Designed with modular components to ensure scalability and maintainability.

---

## Tech Stack

**Frontend**

* EJS (templating engine)
* Tailwind CSS
* Flowbite UI

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose

**Middleware / Utilities**

* Morgan (HTTP request logger)
* Cookie-parser (token handling)
* Dotenv (environment configuration)
* JSON Web Token (JWT)

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/chatter.git
   cd chatter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root and define the following:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**

   ```bash
   npm start
   ```

5. **Access the app**
   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

---

## Usage

1. Register and log in as a user.
2. Generate or share a key with another user.
3. Start a chat session. Messages remain encrypted until the correct key is applied.

---

## Future Enhancements

* Real-time messaging using WebSockets (e.g., Socket.IO).
* Multi-user group chats.
* Enhanced key management with end-to-end encryption protocols.
* Dark mode and additional UI customizations.

---

## License

This project is licensed under the [MIT License](LICENSE).
