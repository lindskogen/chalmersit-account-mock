# chalmersit-account-mock

The purpose of this project is to mock the response of chalmersit-account-rails for easier local development.

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
