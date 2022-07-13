# Books-Shop
A app made to practice NodeJS, Mongoose. 

routes: 

1. POST /api/v1/signup -> requires name, email, password and phoneno. The password is first hashed and then store in the database. That's why used 'abcdefg' as the default password in generating dummy data.

2. POST /api/v1/login -> requires email and password. If the email and password are correct, then a token is returned. From that token you can access the rest of the API endpoints. Otherwise not. 

3. POST /api/v1/logout -> requires token. If the token is correct, then the token is deleted and the user gets logged out.

3. PATCH  /api/v1/update-credentials -> requires field you want to update. You need to send it in the req.body.

4. We have two models -> Author and Book 
-  Author: name, email, password, phoneNo, likedBooks(ref), books(by the respective author)(ref).
-  Book: name, title,  author(ref).

5. GET /api/v1/authors -> returns all the authors along with the number of books published by them. 

6. GET /api/v1/authors/:id -> returns the author with the id along with list of books published by him.

7. GET /api/v1/authors/me -> return the details of the author. 

8. GET /api/v1/books/all -> returns all the books along with its author. You can sort it by sortbyorder = asc or desc. and also it is paginated. To skip a page, you can use page = x.

9. GET /api/v1/books/ -> same as above route but implemented using Author's model. 

10. PUT /api/v1/books/like/:id -> like the book with the id provided by the author who is currently logged in. The reference of the likedBook will be stored in the author's likedBooks array. The book's likes will be incremented.

11. PUT /api/v1/books/unlike/:id -> unlike the book with the id provided by the author who is currently logged in. The reference of the likedBook will be removed from the author's likedBooks array. The book's likes will be decremented.

Below is the .env file for the same 

PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/books
JWT_SECRET=PetPerfect



