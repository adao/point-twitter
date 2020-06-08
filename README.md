# point-twitter

Backend application for creating tweets.

### Starting Server

Make sure you have Node.js installed. To install dependences, run:

```
npm i
```

To start the server, run:

```
node index.js
```

## API

### Authentication 

Login - `POST /log_in`
```json
 {
  "email": "",
  "password": ""
 }
```

Sign up - `POST /sign_up`
```json
 {
  "name": "",
  "email": "",
  "password": ""
 }
```

Log out - `POST /log_out`

### Tweeting

See `./apollo/schema.js` for available Graphql queries, mutations, and subscriptions

### Postman Collection

Check out the [Postman collection](https://www.getpostman.com/collections/7d0a362df80400358a6d)

## Testing

To test, use Postman to sign up and create tweets.

You can use the `/graphql` web interface to get tweets for a particular user and subscribe to new tweets.
