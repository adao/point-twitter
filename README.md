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
