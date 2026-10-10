import { readdir, writeFile } from "node:fs/promises";

// ===== 为旧英文地址生成 Cloudflare Pages 的永久跳转 =====
async function writeLocaleRedirects() {
	const output = new URL("../dist/", import.meta.url);
	const redirects = ["# 旧英文链接固定跳转到 /en/，不按浏览器语言分流", "/ /en/ 301"];

	// ===== 1.兼容原来的固定页面与 RSS 订阅地址 =====
	for (const page of ["about", "archive"]) {
		redirects.push(`/${page} /en/${page}/ 301`, `/${page}/ /en/${page}/ 301`);
	}
	redirects.push("/rss.xml /en/rss.xml 301");

	// ===== 2.根据本次构建的实际分页保留旧分页链接 =====
	const entries = await readdir(new URL("en/", output), { withFileTypes: true });
	const pages = entries
		.filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
		.map((entry) => entry.name)
		.sort((left, right) => Number(left) - Number(right));
	for (const page of pages) {
		redirects.push(`/${page} /en/${page}/ 301`, `/${page}/ /en/${page}/ 301`);
	}

	// ===== 3.文章通配规则放在固定规则后，保留嵌套 slug =====
	redirects.push("/posts/* /en/posts/:splat 301");
	await writeFile(new URL("_redirects", output), `${redirects.join("\n")}\n`);
	console.log(`已生成 ${redirects.length - 1} 条旧英文地址跳转规则。`);
}

await writeLocaleRedirects();
