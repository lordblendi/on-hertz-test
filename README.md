# on-hertz-test

Small test application for a surround panner.

The backend just returns randomly generated numbers. The frontend has a panner with the surrounding speakers. The red dot is draggable within the circle. Upon a new position, the decibel numbers will be refreshed.


## To serve locally

First start the backend, within the `backend` folder, use the following command:

```
yarn start
```

Then in another terminal, within the `frontend` folder, use the following command:

```
yarn start
```

## To serve via Docker compose

```
docker compose up
```

The backend should be available on `http://localhost:5000/` and the frontend on `http://localhost:8080/`. Live reload is currently not enabled.