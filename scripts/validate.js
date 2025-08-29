// scripts/validate.js
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Define your schema for mapped.json
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    symbol: { type: "string" },
    decimals: { type: "integer", minimum: 0, maximum: 18 },
    address: { type: "string", pattern: "^0x[a-fA-F0-9]{40}$" },
    chainId: { type: "integer" },
    logoURI: { type: "string", format: "uri" },
    tags: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["name", "symbol", "decimals", "address", "chainId", "logoURI"],
  additionalProperties: false
};

// Path to your mapped.json
const tokenPath = path.join(__dirname, "../assets/0xf930cf4150f7cb1108b30df6107818fd794398/mapped.json");

try {
  const data = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error("❌ Validation failed:");
    console.error(validate.errors);
    process.exit(1);
  } else {
    console.log("✅ mapped.json is valid.");
  }
} catch (err) {
  console.error("❌ Error reading or parsing mapped.json:", err.message);
  process.exit(1);
}
