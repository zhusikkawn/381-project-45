const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


const User = require('./models/userModel'); 
const Recipe = require('./models/recipeModel'); 


const app = express();


const mongoUrl = 'mongodb+srv://dbUser:db_password@cluster0.tllmk.mongodb.net/recipe-book?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'yourSecretKey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl })
    })
);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/', (req, res) => {
    res.redirect('/login'); 
});
// login
app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.redirect('/home');
    } else {
        res.render('login', { error: 'Invalid username or password.' });
    }
});

// register
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('error', { message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.render('error', { message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.redirect('/login');
});

// logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
});

// home
app.get('/home', isAuthenticated, async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.render('home', {
            recipes,
            user: req.session.user, 
            username: req.session.user.username 
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.render('home', {
            recipes: [],
            error: 'An error occurred.',
            username: req.session.user.username 
        });
    }
});


// myRecipe
app.get('/myRecipe', isAuthenticated, async (req, res) => {
    try {
        const myRecipes = await Recipe.find({ userId: req.session.user._id });
        const savedRecipes = await Recipe.find({ userId: req.session.user._id, isSaved: true });
        const message = req.session.message || null;
        req.session.message = null;
        res.render('myRecipe', {
            recipes: myRecipes,
            savedRecipes,
            user: req.session.user,
            message,
            username: req.session.user.username
        });
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        res.render('myRecipe', {
            recipes: [],
            savedRecipes: [],
            error: 'An error occurred.',
            username: req.session.user.username 
        });
    }
});


// recipe detail
app.get('/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.render('recipe-detail', { 
            recipe, 
            user: req.session.user, 
            username: req.session.user ? req.session.user.username : null });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).send('Server error');
    }
});

// search
app.get('/search', isAuthenticated, async (req, res) => {
    const { query } = req.query; 
    try {
        
        const recipes = await Recipe.find({
            title: { $regex: query, $options: 'i' } 
        });

        res.render('searchResults', {
            recipes,
            query,
            username: req.session.user.username 
        });
    } catch (error) {
        console.error('Error during search:', error);
        res.render('searchResults', {
            recipes: [],
            query,
            error: 'An error occurred while searching.',
            username: req.session.user.username
        });
    }
});


// add recipe
app.post('/recipes', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const recipe = new Recipe({
            title,
            ingredients,
            instructions,
            userId: req.session.user._id,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });
        await recipe.save();

        
        req.session.message = 'Recipe uploaded successfully!';
        res.redirect('/myRecipe');
    } catch (error) {
        console.error('Error creating recipe:', error);
        req.session.message = 'Failed to upload recipe. Please try again.';
        res.redirect('/myRecipe');
    }
});

// update recipe
app.post('/recipes/update/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        };

        if (req.file) {
            updateData.image = '/uploads/' + req.file.filename;
        }

        await Recipe.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/myRecipe');
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).send('Server error');
    }
});

// delete recipe
app.get('/recipes/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/home');
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).send('Server error');
    }
});

app.listen(8099, () => console.log('Server running on http://localhost:8099'));
