# Recipe Book Application

## Project Information
The Recipe Book Application is a web-based platform that allows users to register, log in, and manage recipes. The app features dynamic forms for login and registration with validation to ensure a smooth user experience.

### This project demonstrates:
- **User Authentication**: Secure registration and login functionality with form validation.
- **Dynamic User Interface**: Responsive forms and pages built for seamless interaction.
- **CRUD Operations**: Create, Read, Update, and Delete recipes using RESTful APIs.

#Group Information

- **Group No:** 381project45
- **Students’ Names and SIDs:**
  - Zhu Sik Kwan (SID: 12945490)
  - Lau Chun Hang (SID: 13587077)
  - TAM Ho Tin (SID: 13846370)

## Project File Introduction

### `server.js`
- **Purpose**: Acts as the main server file, managing all backend logic and connecting to the database.
- **Functionalities**:
  - Handles routing for authentication and recipe management.
  - Provides API endpoints for CRUD operations.
  - Ensures data validation and error handling.

### `package.json`
- **Purpose**: Manages project dependencies and scripts.
- **Key Dependencies**:
  - `express`: For routing and server functionality.
  - `mongoose`: For database modeling and interaction.
  - `bcrypt`: For password hashing.
  - `jsonwebtoken`: For authentication tokens.
  - `ejs`: For rendering views.
- **Scripts**:
  - `npm start`: Starts the application server.


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


### `public` (Folder)
- **Purpose**: Contains static assets like CSS, JavaScript, and images to support the frontend.
- **Key Files**:
  - `reipe/css`: Defines the visual style of the application.
  - `myRecipe.js`: Client-side script to enhance interactivity.
 
   ```
   
  ├── css\login\style.css
  ├── js
  ├── picture
  └── recipe
  └── uploads
   
  ```


### `views` (Folder)
- **Purpose**: Contains EJS templates for the user interface.
- **Key Files**:
  - `home.ejs`: Displays the list of recipes.
  - `login.ejs`: Provides the login form.
  - `login.ejs`: Allows users to create an account.
  - `myRecipe.ejs`: Form for adding or editing recipes.
 
   ```
   
  ├── error.ejs
  ├── home.ejs
  ├── login.ejs
  └── myRecipe.ejs
  └── recipe-detail.ejs
  └── searchResults.ejs
   
  ```

### `models` (Folder)
- **Purpose**: Contains database schemas and models for the application.
- **Key Files**:
  - `userModel.js`: Defines the schema for user accounts.
  - `recipeModel.js`: Defines the schema for recipe data.

   ```
  ├── userModel.js
  ├── recipeModel.js

  ```
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
 
### Recipe Management
- **Create**:
  - Click the "Add Recipe" button, fill out the form, and submit.
- **Read**:
  - View all recipes on the homepage.
- **Update**:
  - Click the "Edit" button next to a recipe, modify the fields, and save.
- **Delete**:
  - Use the "Delete" button to remove a recipe.
  ### RESTful APIs
- **Endpoints**:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Log in an existing user.
  - `POST /api/recipes`: Add a new recipe.
  - `GET /api/recipes`: Fetch all recipes.
  - `PUT /api/recipes/:id`: Update a specific recipe.
  - `DELETE /api/recipes/:id`: Delete a specific recipe.
 
  - **Example cURL Commands**:
  - **Register**:
    ```bash
    
    curl -X POST http://localhost:8099/register \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=newuser&password=newpassword&confirmPassword=newpassword"
  
    ```
     **Response:**
    ```
    Found. Redirecting to /login

    That mean create an account, turn to the login page.

    ```

  - **Login**:
    ```bash
    curl -X POST http://localhost:8099/login \
    -H "Content-Type: application/json" \
    -d '{
    "username": "zz",
    "password": "zz"
    }'
    ```
    **Response:**
    ```
    Found. Redirecting to home page.

    ```
  - **Create Recipe**:
    ```bash
    curl -X POST http://localhost:8099/recipes \
    -H "Content-Type: multipart/form-data" \
    -F "title=Delicious Soup" \
    -F "ingredients=water, salt, pepper" \
    -F "instructions=Boil water, add salt and pepper" \
    -b cookies.txt
    ```
    **Response:**
    ```
    Found. Redirecting to /myRecipe

    That will show a newRecipe in the myRecipe page

    ```

    **Get Recipe**;
    ```bash
    
    curl -X GET http://localhost:8099/recipe/6745f9fb0284a8506b4ea9a6
    
    ```

    **Response:**
    ```
    <!DOCTYPE html>
    <html>
    <head>
        <title>Classic Pancakes ww</title>
        <link rel="stylesheet" href="/recipe/mainPage.css">
        <link rel="stylesheet" href="/recipe/recipeDetail.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    </head>
    <body>
        <nav class="navbar">
            <div class="nav-left">
                <h1><i class="fas fa-utensils"></i> Recipe Dashboard</h1>
            </div>
            <div class="nav-center">
                <div class="nav-links">
                    <a href="/home" class="nav-link"><i class="fas fa-list"></i> All Recipes</a>
                    <a href="/myRecipe" class="nav-link"><i class="fas fa-book"></i> My Recipes</a>

            </div>
        </div>
        <div class="nav-right">
            <div class="user-info">
                <i class="fas fa-user"></i> Welcome, Guest
            </div>

            <div class="nav-buttons">
                <a href="/logout" class="logout-btn"><i class="fas fa-s
