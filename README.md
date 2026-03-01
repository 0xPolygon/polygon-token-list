# Tokenlists

This repo contains lists of tokens mapped to the Polygon chains that may be used in certain interfaces.

## Different Token Lists in JSON

The JSON schema for the tokens includes: chainId, name, address, decimals, symbol, logoURI (optional), tags (optional), and custom extensions metadata.

1. [Mapped Tokens](https://api-polygon-tokens.polygon.technology/tokenlists/mapped.tokenlist.json) Contains tokens that are mapped to Polygon bridges. Anyone can propose updates to this list.

2. [Popular Tokens](https://api-polygon-tokens.polygon.technology/tokenlists/popular.tokenlist.json) Contains the top 100 most used tokens on the mainnet chains.

3. [Mapped Tokens Testnet](https://api-polygon-tokens.polygon.technology/tokenlists/mappedTestnet.tokenlist.json) ontains tokens that are mapped to Polygon bridges on testnet chains. Anyone can propose updates to this list.

4. [Popular Tokens Testnet](https://api-polygon-tokens.polygon.technology/tokenlists/popularTestnet.tokenlist.json) Contains the most used tokens on the testnet chains.

## Updating a token

1. Fork the repository

2. Update the token in the token array of `src/tokens/mapped.json` for mainnet or `src/tokens/mappedTestnet.json` for testnet

    Please make sure that the updated token do not disturb the schema.

    ### Tags

    1. `lxly`: Tokens that are bridged using the LxLy bridge (Agg Layer v1)

    2. `pos`: Tokens that are bridged using the PoS bridge

    3. `plasma`: Tokens that are bridged using the PLASMA bridge

    4. `fx`: Tokens that are bridged using the FX

    5. `customBridge`: Token mapped through custom bridges

    6. `zkevmMessageBridge`: Token mapped through zkevmMessageBridge bridge

    7. `customFx`: Token mapped through customFx bridge

    8. `erc20`: Token of ERC20 token type

    9. `governanceToken`: Governance token of the chain

    10. `nativeToken`: Native token of the chain

    11. `customWithdrawEventSig`: The token has its custom withdraw event signature and does not depend on the transfer event signature while verifing withdrawals

    12. `noDeposit`: Token not eligible for deposits

    13. `noWithdraw`: Token not eligible for withdrawals on PoS bridges

3. Run linter and fix the issues if any

    ```bash
    npm run lint
    ```

    ```bash
    npm run lint:fix
    ```

4. Make sure that the tests are passing and the tokenlist builds

    ```bash
    npm run test
    ```

    ```bash
    npm run build
    ```

5. Commit the changes and raise a Pull request to our repo

### Disclaimer

After raising a PR, please allow us some time to verify the PR.
We do not follow any particular order in reviewing token additions and updations.


{
    "chainId": 137, // Chain Id of the L2 chain
    "name": "token_name",
    "symbol": "token_symbol",
    "decimals": "<token_decimals>",
    "address": "token_address on Polygon",
    "logoURI": "token_icon_uri",
    "tags": ["<bridge>", "<token_type>", "<optional_tag>", "<optional_tag>", ...], // For all acceptable tags, check the below list
    "extensions": {
        "originTokenAddress": "token_address on the origin chain", // If not deployed on ethereum, add noDeposit and noWithdraw tags
        "originTokenNetwork": "id of the token's origin chain", // Use 0 for Ethereum, 1 for zkEVM, -1 for PoS
        "wrappedTokenNetwork": "id of the wrapper token's chain", // Only for tokens bridged via LxLy bridge (zkEVM)
        "project": {
            "name": "Project_Name",
            "summary": "Short_Project_Description",
            "contact": "Project_Support",
            "website": "Project_Website"
        },
        "originChainBridgeAdapter": "Bridge adapter contract address on origin chain", // Only required for tokens bridged using zkEVM messaging layer
        "wrapperChainBridgeAdapter": "Bridge adapter contract address on wrapper chain" // Only required for tokens bridged using zkEVM messaging layer
    }
}
