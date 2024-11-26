# Recipe Book Application

## Project Information
The Recipe Book Application is a web-based platform that allows users to register, log in, and manage recipes. The app features dynamic forms for login and registration with validation to ensure a smooth user experience.

### This project demonstrates:
- **User Authentication**: Secure registration and login functionality with form validation.
- **Dynamic User Interface**: Responsive forms and pages built for seamless interaction.
- **CRUD Operations**: Create, Read, Update, and Delete recipes using RESTful APIs.
- **Database Integration**: Stores user and recipe data securely in a database.

#Group Information

- **Group No:** 381project45
- **Students’ Names and SIDs:**
  - Zhu Sik Kwan (SID: 12945490)
  - www             (SID: 13587077)
  - TAM Ho Tin (SID: 13846370)

## Project File Introduction

### `server.js`
- **Purpose**: Acts as the main server file, providing routing and middleware functionalities for the application.
- **Functionalities**:
  - Handles API endpoints for creating, reading, updating, and deleting recipes.
  - Integrates with a database for CRUD operations.
  - Implements authentication features (e.g., login/logout).

### `package.json`
- **Purpose**: Manages project dependencies and scripts.
- **Dependencies**:
  - [List of dependencies, e.g., `express`, `mongoose`, `bcrypt`, etc.]
- **Scripts**:
  - `npm start`: Starts the server.
  - `node server.js`: Starts the server.
    ```json
    {
    "name": "recipe-book",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
    "start": "node server.js"
    },
    "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-mongo": "^4.6.0",
    "dotenv": "^10.0.0",
    "ejs": "^3.1.10",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "mongoose": "^8.8.1",
    "multer": "^1.4.5-lts.1"
    }
    }

    ```

### `public` (Folder)
- **Purpose**: Contains static assets like CSS, JavaScript, and images.
- **Contents**:
  - `styles.css`: Application styling.
  - `app.js`: Client-side scripts for dynamic behavior.

```
.
├── css/login/styles.css
├── js/scipt.js
├── picture
└── recipe
└── uploads

```
### `views` (Folder)
- **Purpose**: Contains EJS templates for rendering the UI.
- **Contents**:
  - `home.ejs`: Homepage.
  - `login.ejs`: Login page.
  - `myRecipe.ejs`: CRUD page for recipes.
```
.
├── error.ejs
├── home.ejs
├── login.ejs
└── myRecipe.ejs
└── recipe-detail.ejs
└── searchResults.ejs

```
### `models` (Folder)
- **Purpose**: Contains database models.
- **Contents**:
  - `recipeModel.js`: Schema for recipes.
  - `userModel.js`: Schema for user authentication.
```
.
├── recipeModel.ejs
├── userModel.ejs

```
---
## Cloud-Based Server URL
**Testing URL**: []
---
## Operation Guide
### Login/Logout Pages
- **Valid Login Information**:
  - Username: `zz`
  - Password: `zz`
- **Steps**:
  1. Navigate to `/login`.
  2. Enter valid credentials and submit.
  3. Use the logout button to end the session.
 
### CRUD Web Pages
- **Create**: Use the "Create New Recipe" button on the homepage to add a new recipe.
- **Read**: View existing recipes and photos on the homepage.
- **Update**: Click the "Edit" button next to a recipe, modify the details, and save.
- **Delete**: Use the "Delete" button to remove a recipe.

### RESTful CRUD Services
- **API Endpoints**:
  - **Create**: `POST /api/recipes` - Adds a new recipe.
  - **Read**: `GET /api/recipes` - Retrieves all recipes.
  - **Update**: `PUT /api/recipes/:id` - Updates a recipe by ID.
  - **Delete**: `DELETE /api/recipes/:id` - Deletes a recipe by ID.
