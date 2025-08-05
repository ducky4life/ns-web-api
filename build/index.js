"use strict";
// Copyright 2025 Ducky
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var nsapi = require("nsapi");
console.log("Loading NSAPI...");
function nation_api(api, nation, shards, shardParams, auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield api.nationRequest(nation, shards, shardParams, auth);
        return shards.map((shard) => `${shard}: ${data[shard]}`);
    });
}
function region_api(api, region, shards, shardParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield api.regionRequest(region, shards, shardParams);
        return shards.map((shard) => `${shard}: ${data[shard]}`);
    });
}
function world_api(api, shards, shardParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield api.worldRequest(shards, shardParams);
        return shards.map((shard) => `${shard}: ${data[shard]}`);
    });
}
function world_assembly_api(api, council, shards, shardParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield api.worldAssemblyRequest(council, shards, shardParams);
        return shards.map((shard) => `${shard}: ${data[shard]}`);
    });
}
function api_request(api, api_type, query, shards, shardParams, auth) {
    if (api_type === "nation") {
        return nation_api(api, query, shards, shardParams, auth);
    }
    else if (api_type === "region") {
        return region_api(api, query, shards, shardParams);
    }
    else if (api_type === "world") {
        return world_api(api, shards, shardParams);
    }
    else if (api_type === "world_assembly") {
        return world_assembly_api(api, parseInt(query), shards, shardParams);
    }
    else {
        return Promise.resolve(["Invalid API type specified."]);
    }
}
const shard_link = document.querySelector('#shard_link');
shard_link.onclick = (e) => {
    e.preventDefault();
    const url = `https://www.nationstates.net/pages/api.html`;
    window.open(url, '_blank');
};
function output(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const useragent = document.querySelector('#useragent').value;
        if (!useragent) {
            alert("Please provide a useragent.");
            return;
        }
        var api = new nsapi.NsApi(useragent);
        const output = document.querySelector('#output');
        output.innerHTML = '';
        const api_type = document.querySelector('#api').value;
        const query = document.querySelector('#query').value;
        const password = document.querySelector('#password').value;
        const shard_input = document.querySelector('#shards').value.split('\n');
        const shard_params = new Object();
        var auth = {
            password: password,
            updatePin: true
        };
        document.querySelector('#shard-params').value.split(',').forEach((param) => {
            const [key, value] = param.split('=');
            if (key && value) {
                shard_params[key] = value;
            }
        });
        try {
            if (shard_input[0] === "") {
                output.innerHTML += `<h3>Please provide at least one shard.</h3>`;
                return;
            }
            const results = yield api_request(api, api_type, query, shard_input, shard_params, auth);
            console.log(results);
            results.forEach((result) => {
                output.innerHTML += `<h3>${result}</h3><br>`;
            });
        }
        catch (error) {
            console.error("Error fetching API data:", error);
            output.innerHTML = `<h3>Error fetching API data</h3>`;
        }
    });
}
document.querySelector('#submit').addEventListener('click', output);
