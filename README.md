# Virtual Medical Appointment System 🏥

A full-stack web application for managing virtual medical appointments built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🌟 Features

### User Features
- **Patient Registration & Authentication** - Secure signup and login system
- **Appointment Booking** - Easy-to-use interface for booking medical appointments
- **Real-time Status** - Live updates on appointment system status (Open/Closed)
- **Daily Token System** - Automatic token numbering that resets daily
- **Medical Profile** - Store patient medical information (height, weight, allergies)
- **Responsive Dashboard** - Mobile-friendly user interface

### Admin Features
- **Admin Dashboard** - Comprehensive admin interface
- **System Control** - Open/Close appointment system in real-time
- **User Management** - Monitor and manage patient accounts
- **Real-time Updates** - Instant status propagation to all users

### Security Features
- **Rate Limiting** - Protection against brute force attacks
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Separate permissions for users and admins
- **Input Validation** - Comprehensive form validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 📦 Installation

### 1. Clone the repository:

```bash
git clone https://github.com/Krishan-Chandrasinghe/Virtual-Medical-Appointment-System.git
cd Virtual-Medical-Appointment-System
```

### 2. Backend Setup

```bash
cd .\Backend\
npm install
```

#### i. Environment Configuration
- Create a .env file using .env.example in the Client directory:

```bash
cp .env.example .env
```
- **Note :-** You need to update environment variables' data according to your details.


### 3. Frontend Setup

```bash
cd ..\Frontend\
npm install
```
#### i. Environment Configuration
- Create a .env file using .env.example in the Client directory:

```bash
cp .env.example .env
```
- **Note :-** You need to update environment variables' data according to your details.

### 4. Start the application
- Open two terminals inside your application root folder (One for the Server and one for the Client)

#### i. Start Server(Backend) Server

```bash
cd .\Frontend\
npm run dev
```

#### ii. Start Client(Frontend) Development Server

```bash
cd .\Backend\
npm run dev
```