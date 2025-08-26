const fs = require("fs");
const buildList = require("./build");
const listRegistry = require("./listRegistry.json");

const tokenlists = buildList();

// Agglayer Popular List
fs.writeFile(
    "build/tokenlists/agglayer.tokenlist.json",
    JSON.stringify(tokenlists.agglayerTokenList, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("agglayer.tokenlist.json successfully built");
    }
);

// Mainnet Popular List
fs.writeFile(
    "build/tokenlists/popular.tokenlist.json",
    JSON.stringify(tokenlists.popularTokenList, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("popular.tokenlist.json successfully built");
    }
);

// Mainnet Mapped List
fs.writeFile(
    "build/tokenlists/mapped.tokenlist.json",
    JSON.stringify(tokenlists.mappedTokenList, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("mapped.tokenlist.json successfully built");
    }
);

// Testnet Popular List
fs.writeFile(
    "build/tokenlists/popularTestnet.tokenlist.json",
    JSON.stringify(tokenlists.popularTestnetTokenList, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("popularTestnet.tokenlist.json successfully built");
    }
);

// Testnet Mapped List
fs.writeFile(
    "build/tokenlists/mappedTestnet.tokenlist.json",
    JSON.stringify(tokenlists.mappedTestnetTokenList, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("mappedTestnet.tokenlist.json successfully built");
    }
);

// Mainnet Staging Popular List
fs.writeFile(
    "build/tokenlists/staging.tokenlist.json",
    JSON.stringify(tokenlists.popularTokenListStaging, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("staging.tokenlist.json successfully built");
    }
);

// Mainnet Staging Mapped List
fs.writeFile(
    "build/tokenlists/mappedStaging.tokenlist.json",
    JSON.stringify(tokenlists.mappedTokenListStaging, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("mappedStaging.tokenlist.json successfully built");
    }
);

// List Registery
fs.writeFile(
    "build/listRegistry.json",
    JSON.stringify(listRegistry, null, 2),
    (err) => {
        if (err) {
            throw err;
        }
        console.log("listRegistry.json successfully built");
    }
);
