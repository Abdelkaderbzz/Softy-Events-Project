# SoftyEvents Backend

SoftyEvents Backend is the heart of the SoftyEvents project, providing robust backend functionality to support the association management application. This guide will lead you through the process of setting up and running the backend on your local machine.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Seeding the Database](#seeding-the-database)
- [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version X.X.X or higher)
- npm (version X.X.X or higher)
- MongoDB (version X.X.X or higher)

## Installation

1. **Clone the project**

    ```bash
    git clone https://github.com/your-username/softyevents-backend.git
    cd softyevents-backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

## Setup

1. **Add the `.env` file**

    Create a file named `.env` in the root directory of the project and add your environment variables. Here is an example of what your `.env` file might look like:

    ```env
    NODE_ENV=development
    PORT=3007
    BASE_API_ENDPOINT=/api/v1
    BASE_URL=http://localhost:3007/api/v1
    API_PREFIX=/api/v1
    CLIENT_BASE_URL=http://localhost:3007
    CORS_URL=*

    # Database
    DB_URI=mongodb+srv://example.mongodb/softyevents-backend
    DB_NAME=softyevents-db
    DB_NAME_TEST=softyevents-db-test
    DB_HOST=softyeventsdb
    DB_PORT=27017

    LOG_DIR='./logs'

    # Token Info
    ACCESS_TOKEN_VALIDITY_DAYS=30
    REFRESH_TOKEN_VALIDITY_DAYS=120
    TOKEN_ISSUER=softyevents.com
    TOKEN_AUDIENCE=softyevents.com

    # USERS
    ADMIN_NAME=admin
    ADMIN_EMAIL=admin@admin.com
    ADMIN_PASS=admin12345

    USER_NAME=user
    USER_EMAIL=user@user.com
    USER_PASS=user12345

    DEVELOPER_NAME=developer
    DEVELOPER_EMAIL=developer@developer.com
    DEVELOPER_PASS=developer12345

    # Email
    SMTP_SERVICE=smtp
    EMAIL_HOST=ssl0.ovh.net
    EMAIL_PORT=465
    EMAIL_USERNAME=
    EMAIL_PASSWORD=

    CONFIRMATION_CODE_EXPIRATION_TIME=120
    ```

    Ensure to replace the placeholder values with your actual configuration. Use the URI link of your database for `DB_URI`.

## Seeding the Database

To seed the database with initial data, run the seeder script:

```bash
npm run seed
```

## Running the Project

After setting up the project and seeding the database, you can start the backend by running:

```bash
npm run dev
```