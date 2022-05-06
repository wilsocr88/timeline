# Timeline

A completely anonymous text feed with Markdown support. It's "social" without the "media."

## Prerequisites

-   NodeJS 12.x
-   MongoDB 5.x

## Getting Started

1. Ensure that [**MongoDB**](https://www.mongodb.com/) is installed and running.
2. See the `.env` file for backend configuration. Default port is 8080. Default MongoDB host is localhost.
3. Run `npm install` in the root directory
4. Run `npm install` in the `client` directory
5. Run `react-scripts build` in the `client` directory
6. Run `node ./bin/www` from the root directory

You should now be able to browse to `http://localhost:8080` and use Timeline.
