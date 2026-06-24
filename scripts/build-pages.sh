#!/usr/bin/env bash
set -euo pipefail

project_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
pages_root="$project_root/pages-dist"

rm -rf "$pages_root"
mkdir -p "$pages_root"
cp "$project_root/worker/index.js" "$pages_root/_worker.js"

echo "Built Cloudflare Pages output at $pages_root"
