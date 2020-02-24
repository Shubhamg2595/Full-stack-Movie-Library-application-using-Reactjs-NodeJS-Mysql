# Full-stack-Movie-Library-application-using-Reactjs-NodeJS-Mysql
--------------------------------------------------------------------------

Server-Side:

--------------------------------------------------------------------------
Backend code is written in NodeJS.

1.a) Major packages used in this project are 
ExpressJS : to add 'n' number of miidleWares to my node application,
Sequelize : Used as an ORM library to work with my MysqlDB,
body-parser: to parse request and response objects.

Used MVC frameWork to structure the App.

2.a) Before Describing the api's, let's understand the DB structure i have used.

Here are the table details along with their columns_name(type*,role)

2.a.i) movies : 
movieId(integer,primaryKey)  | title(varchar) |  genres(varchar) | createdAt(dateTime)  |updatedAt(dateTime)  | watched(integer)

2.a.ii) ratings:

userId(integer) | movieId(integer,Foreign Key[Refrences movies.movieId]) | ratings(Integer) | timeStamp(timeStamp) | 


3) Routes i have used handling all various operations:

3.a) movies/routes

  Methods	   Urls	            Actions
a.) GET	  /allMovies/:page	get allMovies with pagination Rules (9 movies at a time)
b.) GET	  /watchList/     	get all Movies added to watchlist by User
c.) PUT	  /watchList/ 	    update a movie's watched status based on user action 
d.) GET   /:movieId/        get a movie with given 

Definitions for each Route defined for Movie Model can be found in controller/movies.js.

3.b) ratings/routes

  Methods	   Urls	            Actions
a.) GET   /:movieId/        get AverageRating for a movie with given movieId


Definitions for each Route defined for Movie Model can be found in controller/movies.js.


4) Explaining the Controllers

4.a) controller/movies.js

4.a.i) getMovies : this controller is used to fetch movies from movies Table , where number of records fetched has been limited using
pagination.
At a time, only 9 movie records are fetched from the DB.
if user Clicks on Next button, then only next 9 records are fetche and previous 9 are fetched only if user clicks on previous.

Cases like user should not be able to click on previous button, if user is on page-1 has been handled on FrontEnd. 

4.a.ii) getMovieByMovieId : this controller is used to fetch unique movie record from movies table based on MovieId.

4.a.iii) getWatchlist: this controller is used to fetch those movieRecords from movies db which have been added to wishlist by the user

4.a.iv) updateWatchlist: PUT operation , requires two fields : {movieId,task}
updates watched(column) in movies_db based on user action i.e whether user has added movie to wishList or removed from wishlist.

{watched:1} = added to wishlist
{watched:2} = not added in wishlist

4.a.v) getMoviesWithComedyAndRating: this controller is used to getAllMovies gfrom moviesDB with avgRating for respective movies from ratings db using user mentioned rating and genre.
Required joins of Two tables i.e ratings and movies.

4.b) controller/ratings

4.b.i) getAverageRatingByMovieId: this controller is used to get AverageRatings for a movie consolidated after taking average of all ratings for a movie given by 'n' number of users.



************************************************************************************************************************************

Client-Side :

************************************************************************************************************************************
This application is created using various front-end technologies like-
a. React-JS : creating reusable UI interfaces.
b. Redux: store-management
c. Redux-saga: Middleware to handle asynchronous operations
d. Material-ui : for Designing the app.
e. react-router-dom : to handled routing in our app and keeping UI screens in sync with the URL
f. Reselect: selector library (for Redux) which uses memoization concept.
g. immer: To Create the next immutable state tree by simply modifying the current tree

Containers: Components that are composed of major functional logic for our frontEnd .
a) Home : as name suggests, main page of the application, handle the rendering and handling of major functional Components
b) MovieCard: renders the card with movieDetails.
c) WatchList: contains watchlist for the user.
d) App: Acting as a switching component, rendering separate components in sync with URL.

Components:
a)Header: Header UI
b)Footer: Added for pagination
c)CardComponent: renders the UI for MovieCard Container.
d)FullScreenDialogBox: renders the watchList for User.

# Major Features of movieXpress

1. Displays movie library to users
2. Pagination Provided to surf the movieLibrary for next/previous set of movies.
3. User can add Movie to WatchList if interested , after clicking on movieCard, as a new Modal open allowing users to add Movie to watchList.
4. User can see there watchlist in a separate tab, where they can remove a watched movie from their playlist.
5. Users can check average rating for a movie, fetched after aggregation ratings responses from various users for a movie.
6. Application is Mobile-Responsie;


----------------------------------------------------------------------
Bonus Points Details
----------------------------------------------------------------------

a) optimize the loading time: 
=> Introduced pagination to ensure application does not load numerous records at once from the DB, reducing the proceesing time for handling lists.

b) you make it mobile responsive.
=> By using material-ui, i have ensured that application is mobile-responsive to a good extent.

c) create search functionality in the app.
=> Not added in the app, though backend service is provided at server side.


d) create a personal wishlist/watch later feature
=> Done. User is allowed to add movies to their wishlist/watchlist.
=> User is allowed to see their wishlist/watchlist.
=> User can remove movies from their wishlist/watchlist.










