const express = require("express");
const cors = require("cors");
const nodeCmd = require("node-cmd");
require("dotenv").config();

const PORT = process.env.PORT ?? 1338;
const WEBHOOK_API_ROUTE =
  process.env.WEBHOOK_API_ROUTE ?? "/webhook-rebuild-handler";
const REBUILD_COMMAND =
  process.env.REBUILD_COMMAND ?? "cd ~/glbackend/ && npm run generate";

const app = express();

app.use(express.json());
app.use(cors());

app.post(WEBHOOK_API_ROUTE, (req, res) => {
  const rebuildOutput = nodeCmd.runSync(REBUILD_COMMAND);
  console.log(
    `Nuxt site rebuilt at ${new Date().toTimeString()} with data:\n${
      rebuildOutput.data
    }`
  );

  res.json({
    ok: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server works on port: ${PORT}`);
});
