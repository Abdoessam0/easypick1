const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const candidates = [
  path.join(root, "node_modules", ".pnpm"),
  path.join(root, "artifacts", "easypick", "node_modules", ".pnpm"),
];

function chmodExecutables(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const packageDir = path.join(dir, entry.name);
    const possibleBins = [
      path.join(packageDir, "node_modules", "esbuild", "bin", "esbuild"),
      path.join(packageDir, "node_modules", "@esbuild", "linux-x64", "bin", "esbuild"),
    ];

    for (const bin of possibleBins) {
      if (!fs.existsSync(bin)) continue;
      fs.chmodSync(bin, 0o755);
      console.log(`Fixed executable permission: ${path.relative(root, bin)}`);
    }
  }
}

for (const dir of candidates) {
  chmodExecutables(dir);
}
