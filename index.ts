// Copyright 2025 Ducky

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NsApi } from "nsapi";
var nsapi = require("nsapi");
console.log("Loading NSAPI...");


function nation_api(api: NsApi, nation: string, shards: string[], shardParams?: {[paramName: string]: string;}): Promise<string[]> {
    return api.nationRequest(nation, shards, shardParams).then((data) => {
        return shards.map((shard) => data[shard]);
    });
}

function region_api(api: NsApi, region: string, shards: string[], shardParams?: {[paramName: string]: string;}): Promise<string[]> {
    return api.regionRequest(region, shards, shardParams).then((data) => {
        return shards.map((shard) => data[shard]);
    });
}

function world_api(api: NsApi, shards: string[], shardParams?: {[paramName: string]: string;}): Promise<string[]> {
    return api.worldRequest(shards, shardParams).then((data) => {
        return shards.map((shard) => data[shard]);
    });
}


function api_request(api: NsApi, api_type: string, query: string, shards: string[], shardParams?: {[paramName: string]: string;}): Promise<string[]> {
    if (api_type === "nation") {
        return nation_api(api, query, shards, shardParams);
    } else if (api_type === "region") {
        return region_api(api, query, shards, shardParams);
    } else if (api_type === "world") {
        return world_api(api, shards, shardParams);
    } else {
        return Promise.resolve(["Invalid API type specified."]);
    }
}

const shard_link = document.querySelector('#shard_link') as HTMLAnchorElement;
shard_link.onclick = (e: MouseEvent) => {
    e.preventDefault();
    const url = `https://www.nationstates.net/pages/api.html#nationapi`;
    window.open(url, '_blank');
}

async function output(e: Event) {

    const useragent = (document.querySelector('#useragent') as HTMLTextAreaElement).value
    if (!useragent) {
        alert("Please provide a useragent.");
        return;
    }
    
    var api = new nsapi.NsApi(useragent);

    const output = document.querySelector('#output')!;
    output.innerHTML = '';

    const api_type = (document.querySelector('#api') as HTMLSelectElement).value;
    const query = (document.querySelector('#query') as HTMLTextAreaElement).value;
    const shard_input = (document.querySelector('#shards') as HTMLTextAreaElement).value.split('\n');
    const shard_params = new Object() as {[paramName: string]: string;};

    (document.querySelector('#shard-params') as HTMLTextAreaElement).value.split(',').forEach((param: string) => {
        const [key, value] = param.split('=');
        if (key && value) {
            shard_params[key] = value;
        }
    });

    console.log(api, api_type, query, shard_input.length, shard_params);

    try {
        if (shard_input[0] === "") {
            output.innerHTML += `<h3>Please provide at least one shard.</h3>`;
            return;
        }
        
        const results: string[] = await api_request(api, api_type, query, shard_input, shard_params);
        console.log(results);

        results.forEach((result: string) => {
            output.innerHTML += `<h3>${result}</h3><br>`;
        });

    } catch (error) {
        console.error("Error fetching API data:", error);
        output.innerHTML = `<h3>Error fetching API data</h3>`;
    }
}

document.querySelector('#submit')!.addEventListener('click', output);