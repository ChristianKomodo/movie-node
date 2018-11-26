# Movie Node

### Example movie database project using Node/Express, MongoDB and Mongoose

#### Installation
Clone it, then get your dependencies with `npm install` like usual.

Then create an `.env` file and populate it with your MongoDB connection string in one of two ways:

#### Using a local Mongo database

```
DB_HOST="localhost:27017/movie-node";
```

#### Using mLab.com

```
DB_HOST="mongodb://<dbuser>:<dbpassword>@ds119650.mlab.com:19650/movie-node"
````

(Substitute your database username and password)

The package `dotenv` has already been installed and will allow you to access that `.env` file.

#### Run the project
Then start the server with `npm start`

The main page will have a form to add your favorite movies, and also display all the added movies in the database so far.

```localhost:3000```

If this is your first time running the appliaction, you can add two entries into the database by hitting the following URL:

```localhost:3000/movies/make```
