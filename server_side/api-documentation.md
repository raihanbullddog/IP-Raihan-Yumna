# Anime API

## Get Animes

Retrieve a list of anime objects.

- **HTTP Method:** `GET`
- **Endpoint:** `/animes`

### Query Parameters:

- `page` (optional): Page number for pagination. Default is 1.
- `status` (optional): Filter by anime status (e.g., "Airing", "Finished").
- `order_by` (optional): Sort results by a specific field (e.g., "title", "status").
- `sort` (optional): Sort order (e.g., "asc", "desc").

### Response:

Returns a list of anime objects with details such as title, image URL, episodes, and status.

## Get Anime

Retrieve details of a specific anime.

- **HTTP Method:** `GET`
- **Endpoint:** `/animes/:id`

### Path Parameters:

- `id`: Anime ID.

### Response:

Returns an anime object with details such as title, image URL, episodes, and status.

# User API

## Register User

Register a new user.

- **HTTP Method:** `POST`
- **Endpoint:** `/register`

### Request Body:

- `username` (required): Username.
- `email` (required): Email.
- `password` (required): Password.

### Response:

Returns a JSON Web Token (JWT) for authentication.

## Login

Authenticate and log in a user.

- **HTTP Method:** `POST`
- **Endpoint:** `/login`

### Request Body:

- `inputCreds` (required): Username or email.
- `password` (required): Password.

### Response:

Returns a JSON Web Token (JWT) for authentication.

## Login with Google

Authenticate and log in a user using Google.

- **HTTP Method:** `POST`
- **Endpoint:** `/login/google`

### Headers:

- `google-token` (required): Google access token.

### Response:

Returns a JSON Web Token (JWT) for authentication.

## Find User

Retrieve user details by ID.

- **HTTP Method:** `GET`
- **Endpoint:** `/user/findUser`

### Query Parameters:

- `id` (required): User ID.

### Response:

Returns user object with details such as username, email, and status.

## Edit User

Update user information.

- **HTTP Method:** `PUT`
- **Endpoint:** `/user/editUser`

### Request Body:

- `username` (optional): New username.
- `email` (optional): New email.
- `password` (optional): New password.

### Query Parameters:

- `id` (required): User ID.

### Response:

Returns updated user object with details such as username, email, and status.

# MyAnime API

## Get My Anime

Retrieve a list of anime objects favorited by the user.

- **HTTP Method:** `GET`
- **Endpoint:** `/myAnime`

### Query Parameters:

- `page` (optional): Page number for pagination. Default is 1.
- `status` (optional): Filter by anime status (e.g., "Airing", "Finished").
- `order_by` (optional): Sort results by a specific field (e.g., "title", "status").
- `sort` (optional): Sort order (e.g., "asc", "desc").

### Response:

Returns a list of anime objects that the user has favorited.

## Add Fav Anime

Add an anime to the user's favorites.

- **HTTP Method:** `POST`
- **Endpoint:** `/myAnime/addFav/:id`

### Path Parameters:

- `id`: Anime ID.

### Response:

Returns the favorited anime object with details such as title, image URL, episodes, and status.

## Delete My Anime

Remove an anime from the user's favorites.

- **HTTP Method:** `DELETE`
- **Endpoint:** `/myAnime/delete/:id`

### Path Parameters:

- `id`: Anime ID.

### Response:

Returns a message indicating that the anime has been deleted from the user's favorites.

# Transaction API

## Process Transaction

Initiate a transaction for a product.

- **HTTP Method:** `POST`
- **Endpoint:** `/pay/stripe`

### Query Parameters:

- `product_data_name` (required): Product name.
- `product_data_unit_amount` (required): Product price.
- `product_data_currency` (required): Product currency.
- `product_data_quantity` (required): Product quantity.

### Response:

Returns a URL to complete the transaction.

## Upgrade to Premium

Upgrade the user to Premium.

- **HTTP Method:** `PATCH`
- **Endpoint:** `/upgrade`

### Response:

Returns a message indicating that the user has been upgraded to Premium.