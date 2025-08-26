const popularTokens = require("./tokens/defaultTokens.json");
const mappedTokens = require("./tokens/mappedTokens.json");
const popularTokensTestnet = require("./tokens/defaultTokensTestnet.json");
const mappedTokensTestnet = require("./tokens/mappedTokensTestnet.json");
const popularTokensStaging = require("./tokens/defaultTokensStaging.json");
const mappedTokensStaging = require("./tokens/mappedTokensStaging.json");
const agglayer = require("./tokens/agglayer.json");

const popularTokenList = require("./metadata/defaultTokens.json");
const mappedTokenList = require("./metadata/mappedTokens.json");
const popularTestnetTokenList = require("./metadata/defaultTokensTestnet.json");
const mappedTestnetTokenList = require("./metadata/mappedTokensTestnet.json");
const popularTokenListStaging = require("./metadata/defaultTokensStaging.json");
const mappedTokenListStaging = require("./metadata/mappedTokensStaging.json");
const agglayerTokenList = require("./metadata/agglayer.json");

module.exports = function buildList() {
    const timestamp = new Date().toISOString();

    Object.assign(popularTokenList, {
        timestamp,
        tokens: popularTokens,
    }); // v2 Default List
    Object.assign(mappedTokenList, {
        timestamp,
        tokens: mappedTokens,
    }); //v2 Mapped List
    Object.assign(popularTestnetTokenList, {
        timestamp,
        tokens: popularTokensTestnet,
    }); // v2 Default Testnet List
    Object.assign(mappedTestnetTokenList, {
        timestamp,
        tokens: mappedTokensTestnet,
    }); //v2 Mapped Testnet List
    Object.assign(popularTokenListStaging, {
        timestamp,
        tokens: popularTokensStaging,
    }); // Staging Tokenlist
    Object.assign(mappedTokenListStaging, {
        timestamp,
        tokens: mappedTokensStaging,
    }); // Staging Tokenlist
    Object.assign(agglayerTokenList, {
        timestamp,
        tokens: agglayer,
    }); // Agglayer Tokenlist

    return {
        popularTokenListStaging,
        mappedTokenListStaging,
        popularTokenList,
        mappedTokenList,
        popularTestnetTokenList,
        mappedTestnetTokenList,
        agglayerTokenList,
    };
};
