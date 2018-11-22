# Movie Node

### Example movie database project using Node/Express, MongoDB and Mongoose

#### Installation
Clone it, then get your dependencies with `npm install` like usual.

Then create an `.env` file and populate it with your MongoDB connection string

#### Using a local Mongo database

```
DB_HOST="localhost:27017/myDatabase";
```

#### Using mLab.com

```
DB_HOST="mongodb://<dbuser>:<dbpassword>@ds119650.mlab.com:19650/movie-node"
````

(Substitute your database username and password)

The package `dotenv` has already been installed and will allow you to access that `.env` file.

#### Run the project
Then start the server with `npm start`