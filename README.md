<div align="center">
  <h1>Task Management Backend</h1>
</div>

## <a name="introduction">🤖 Introduction</a>

A secure and scalable backend for a Task Management System.  
This project demonstrates backend architecture, secure authentication, database design, rate limiting, activity logs, and API documentation.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Node.js](https://nodejs.org/en/)** – JavaScript runtime for server-side applications.  
- **[Express.js](https://expressjs.com/)** – Fast and minimalist web framework for building APIs.  
- **[Neon Postgres](https://neon.com/)** – Serverless PostgreSQL platform for reliable, scalable applications.  
- **[Prisma ORM](https://www.prisma.io/)** – Type-safe database ORM with schema migrations.  
- **[JWT Authentication](https://www.jwt.io/)** – JSON Web Tokens for secure, stateless authentication.  
- **[Rate Limiting](https://www.npmjs.com/package/express-rate-limit)** – Protect APIs from abuse and excessive requests.  
- **[Postman](https://www.postman.com/)** – API testing and documentation.

## <a name="features">🔋 Features</a>

- **Secure Authentication** – Email-based OTP flow + JWT tokens.  
- **Task CRUD** – Create, read, update, and delete tasks.  
- **Authorization** – Users can only access their own tasks.  
- **Rate Limiting** – Prevent excessive requests and OTP abuse.  
- **Activity Logging** – Logs key actions like OTP requests, logins, and task operations.  
- **API Documentation** – Postman collection to explore all endpoints.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally.

### Prerequisites

- [Git](https://git-scm.com/)  
- [Node.js](https://nodejs.org/en/)  
- [npm](https://www.npmjs.com/)
- **Neon Postgres Account:**  
  1. Create a free account at [Neon](https://neon.com/)  
  2. Create a new database cluster  
  3. Get your **connection string** (for `DATABASE_URL` in `.env`)  
  4. Make sure SSL is enabled (Neon requires `?sslmode=require` in the URL)

### Cloning the Repository

```bash
git clone https://github.com/J-khatriii/Regrip-Task-Backend.git
cd regrip-task-backend

```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
PORT=4000  
DATABASE_URL="postgresql://user:password@host.neon.tech/db-name?sslmode=require" 
JWT_SECRET=YOUR_SECRET
```

Replace the placeholder value with your actual **[Neon Postgres URL](https://neon.com/)** and credentials.

**Run Database Migrations**

```bash
npx prisma migrate dev --name init
```

**Start the Server**

```bash
npm run server
```

Server will run at: [http://localhost:4000](http://localhost:4000)

Render Deployment Link: [https://regrip-task-backend-1.onrender.com](https://regrip-task-backend-1.onrender.com) 

API Documentation: [Postman Collections](https://documenter.getpostman.com/view/41006212/2sBXcBmgpv)
