import { defineConfig } from "@playwright/test";
import fs from "node:fs";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const resolvedPath = process.env.CHROME_BIN || (process.platform === 'win32' && fs.existsSync(chromePath) ? chromePath : (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined));

export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  webServer: {command:"npm run dev -- --port 5173 --strictPort",url:"http://127.0.0.1:5173",reuseExistingServer:true,timeout:30000},
  use: {
    baseURL: "http://127.0.0.1:5173",
    launchOptions: {
      ...(resolvedPath ? { executablePath: resolvedPath } : {}),
      args: ["--no-sandbox"],
    },
  },
  timeout: 60000,
});
