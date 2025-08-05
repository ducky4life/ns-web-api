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

### todo

- [ ] private nation requests
- [ ] nation commands
- [ ] using PIN for authentication
- [ ] world assembly api
- [ ] trading cards api
- [ ] toggle api caching
- [ ] customise cache seconds
- [ ] identify each result with its shard
- [ ] sort results
- [ ] export results to file
- [ ] copy results to clipboard

## License

ns-web-api is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

ns-web-api uses [node-nsapi](https://github.com/auralia/node-nsapi) to access the NationStates API. Its NOTICE file will be provided below.

```
node-nsapi  
Copyright (C) 2016-2020 Auralia
```

