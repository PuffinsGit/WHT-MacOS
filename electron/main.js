const { app, BrowserWindow, shell, session } = require("electron");
const fs = require("node:fs");
const path = require("node:path");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1380, height: 900, minWidth: 980, minHeight: 680,
    title: "WorkedHoursTracker", backgroundColor: "#090d16",
    icon: path.join(__dirname, "..", "resources", "icon.png"),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  window.removeMenu();
  window.loadFile(path.join(__dirname, "..", "wht", "index.html"));
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:|^mailto:/.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
};

app.whenReady().then(() => {
  const exportDirectory = path.join(app.getPath("documents"), "WHT", "Exports");
  fs.mkdirSync(exportDirectory, { recursive: true });
  session.defaultSession.on("will-download", (_event, item) => {
    const original = path.basename(item.getFilename()).replace(/[\\/:*?"<>|]/g, "-");
    const parsed = path.parse(original);
    let destination = path.join(exportDirectory, original);
    let suffix = 2;
    while (fs.existsSync(destination)) {
      destination = path.join(exportDirectory, `${parsed.name}-${suffix}${parsed.ext}`);
      suffix += 1;
    }
    item.setSavePath(destination);
  });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
