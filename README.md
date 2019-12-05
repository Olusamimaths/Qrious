# Curious-Me
Anonymous Messenger: Allows users recieve anonymous messages.

## How it works
* Users can:
  - Create accounts
  - Sign in
  - Generate a shareable link
  - Recieve anonymous messages when they share the link

## Technologies
* Backend:
  - Node.js
  - Git
  - Postgres
  - Babel
  - Express
  - Npm
  - JWT
* Frontend:
  - HTML/CSS
  - Javascript fetch api
  - Local Storage


## Endpoints

| Request       | End Points                    | Functionality |
| ------------- | -------------                 |-------------
| POST          | /api/v1/signup                | Creates an account for a user. |
| POST          | /api/v1/signin                | Logs a user in. |
| POST          | /api/v1/ask                   | Creates a message/question for a user |
| POST          | /api/v1/reply/:id             | Allows a user to reply to a question/message. |
| GET           | /api/v1/questions             | Gets all the questions or message created for a user |

## Documentation
The documentation is coming soon!

## Api url
`https://qrious-me.herokuapp.com/api/v1/`;

## Check out the web app here
`https://olusamimaths.github.io/Qrious/`
