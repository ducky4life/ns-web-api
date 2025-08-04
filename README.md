# ns-web-api

ns-web-api is a NationStates API web interface written in typescript.

## Development usage

make sure you have node.js and npm installed

1. clone the repository
    ```
    git clone https://github.com/ducky4life/ns-web-api.git
    ```
2. go into directory
    ```
    cd ns-web-api
    ```
3. install dependencies (you should install browserify globally too to use the cli)
    ```
    npm install
    ```
    ```
    npm install -g browserify
    ```
    if you do not have typescript:
    ```
    npm install -g typescript
    ```
4. create bundle.js
    ```
    browserify -r nsapi >> build/bundle.js
    ```
5. compile typescript
    ```
    tsc
    ```
    or use `tsc --watch` in a development environment
6. navigate to `build/index.html` and enjoy

