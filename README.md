# chalmersit-account-mock

The purpose of this project is to mock the response of chalmersit-account-rails for easier local development.

## Setup

Make sure that the service being tested can reach this container on the same hostname and port as the browser. This means for rails projects that `account_ip` should be set according to the following:

### Mac OS X

Set `account_ip` to `"docker.for.mac.localhost"`.

Also add the following line to `/etc/hosts`:

```
127.0.0.1     docker.for.mac.localhost
```

### Linux

Probably works out of the box - if this service is hosted on the same machine as the service being tested, `localhost` should be sufficient.

### Windows

...are you serious?

## Usage with Docker

```bash
# build docker container
docker build -t cthit/account-mock .

# run with admin mock
docker run -it -e MOCK=admin -p 6789:3000 cthit/account-mock
# or fkit mock
docker run -it -e MOCK=fkit -p 6789:3000 cthit/account-mock

# Now accessible at http://localhost:6789
```

## Behavior

### `/me.json`

Returns the mock set by the `MOCK` environment variable (look in the `mocks/` folder for exact responses).

### `/oauth/authorize`

Reads `redirect_uri` and `state` from query params and redirects back to `<redirect_uri>?state=<state>`.

### `/oauth/token`

Returns a hard coded dummy token. `{ "access_token": "i am access token" }`.

### `/logout`

Reads `return_to` from query params and redirects back to `<return_to>`.

### `/users/<id>.json`

If no id is provided, it returns an array of all mocks.
If id is provided it will return the specified mock, with `defaultmock` as fallback.

### `/<anything-else>`

Returns the default mock (`mocks/defaultmock.json`).

## Running locally

Run with yarn:

```bash
yarn start
```

Can specify `PORT` environment variable.

```bash
PORT=5000 yarn start
```

Use `MOCK` environment variable to select a mock:

The values `admin` or `fkit` will use the corresponding mocks, anything else will use the default mock.

```bash
MOCK=admin yarn start
# or
MOCK=fkit yarn start
```
