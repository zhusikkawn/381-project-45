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
@@ -95,9 +105,181 @@
## Operation Guide
### Login/Logout Pages
- **Valid Login Information**:
  - Username: `testuser`
  - Password: `password123`
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
                <a href="/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="recipe-detail">
            <a href="javascript:history.back()" class="back-btn"><i class="fas fa-arrow-left"></i> Back</a>

            <h1>Classic Pancakes ww</h1>

            <div class="recipe-content-wrapper">

                    <div class="detail-image">
                        <img src="/uploads/1732639378685.jpg" alt="Classic Pancakes ww">
                    </div>


                <div class="detail-content">
                    <section>
                        <h2>Ingredients</h2>
                        <p>1 cup all-purpose flour
    2 tablespoons sugar
    1 teaspoon baking powder  www
    1/2 teaspoon baking soda
    1/4 teaspoon salt
    3/4 cup milk
    1 large egg
    2 tablespoons melted butter
    1 teaspoon vanilla extract</p>
                    </section>

                    <section>
                        <h2>Instructions</h2>
                        <p>In a bowl, whisk together flour, sugar, baking powder, baking soda, and salt.
    In another bowl, mix milk, egg, melted butter, and vanilla.
    Combine wet and dry ingredients until smooth.
    Heat a non-stick skillet over medium heat, grease lightly, and pour 1/4 cup batter for each pancake. ww
    Cook until bubbles form, flip, and cook the other side until golden brown.
    Serve with syrup, butter, or your favorite toppings.</p>
                        </section>
                    </div>

            </div>

        </div>

    </div>
    </body>

    ```
    **Delete**:
    ```bash
    curl -X GET http://localhost:8099/recipes/delete/6745f9fb0284a8506b4ea9a6 \
    -b cookies.txt
    ```
    **Response:**
    ```
    Found. Redirecting to /home Delete recipe and return to the hom.

    ```
    ## Notes
  - Replace `<token>` with the authentication token obtained from login.
  - Replace placeholders like `{id}` or `https://yourserver.com` with actual values during testing.
  - Ensure your server is running and accessible online for proper testing.
    ---
