const fs = require("fs");
const path = require("path");

function generateWorkerCode() {
    const buildDir = path.join(__dirname, "../build");
    const tokenListsDir = path.join(buildDir, "tokenlists");
    
    // Get all JSON files in the tokenlists directory
    const tokenListFiles = fs.readdirSync(tokenListsDir)
        .filter(file => file.endsWith(".json"))
        .sort(); // Sort for consistent ordering
    
    // Generate import statements
    const imports = [
        "import listRegistry from \"../build/listRegistry.json\";"
    ];
    
    const variableNames = [];
    
    tokenListFiles.forEach((file, index) => {
        const baseName = file.replace(".json", "");
        const variableName = `tokenList${index}`;
        variableNames.push({ variableName, file, baseName });
        imports.push(`import ${variableName} from "../build/tokenlists/${file}";`);
    });
    
    // Generate file map
    const fileMapEntries = [
        "    \"/\": listRegistry,",
        "    \"/listRegistry.json\": listRegistry,"
    ];
    
    variableNames.forEach(({ variableName, file }) => {
        fileMapEntries.push(`    "/tokenlists/${file}": ${variableName},`);
    });
    
    // Generate the complete worker code
    const workerCode = `${imports.join("\n")}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "1728000",
};

// Auto-generated file mapping based on build directory contents
const fileMap = {
${fileMapEntries.join("\n")}
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Handle OPTIONS requests for ALL paths
        if (request.method === "OPTIONS") {
            return new Response(null, { 
                status: 204,
                headers: corsHeaders 
            });
        }

        // Look up the file in our auto-generated map
        const fileData = fileMap[url.pathname];
        if (fileData) {
            const json = JSON.stringify(fileData, null, 2);
            return new Response(json, {
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                    ...corsHeaders,
                },
            });
        }

        // File not found
        return new Response("Not Found", { status: 404 });
    },
};
`;

    // Write the generated worker code
    const outputPath = path.join(__dirname, "wrangler_main.js");
    fs.writeFileSync(outputPath, workerCode);
    
    console.log("✅ Generated wrangler_main.js with the following files:");
    console.log("   - / → listRegistry.json");
    console.log("   - /listRegistry.json → listRegistry.json");
    variableNames.forEach(({ file }) => {
        console.log(`   - /tokenlists/${file} → tokenlists/${file}`);
    });
}

// Run the generator
generateWorkerCode();
