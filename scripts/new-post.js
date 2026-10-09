import fs from "node:fs";
import path from "node:path";

// ===== 按本地日期生成文章发布日期 =====
function getDate() {
	const today = new Date();
	return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

// ===== 一次创建配对草稿，避免覆盖已有文章 =====
function createPostPair(input) {
	// ===== 1.限制文件路径在文章目录内，两份文件共用同一个配对标识 =====
	const extension = /\.mdx$/i.test(input) ? ".mdx" : ".md";
	const slug = input.replace(/\.(md|mdx)$/i, "");
	if (
		!slug ||
		!/^[\p{L}\p{N}_-]+(?:\/[\p{L}\p{N}_-]+)*$/u.test(slug) ||
		/^(en|zh)\//.test(slug)
	) {
		throw new Error(
			"文章名只能包含文字、数字、下划线、连字符和目录分隔符，请勿加 en/ 或 zh/ 前缀。",
		);
	}
	const files = ["en", "zh"].map((lang) => ({
		lang,
		file: path.join("src/content/posts", lang, `${slug}${extension}`),
	}));
	for (const { file } of files) {
		if (fs.existsSync(file))
			throw new Error(`文章已存在：${file}，未创建任何文件。`);
	}
	// ===== 2.默认创建草稿，写完各自的正文和元数据后再发布 =====
	for (const { lang, file } of files) {
		fs.mkdirSync(path.dirname(file), { recursive: true });
		fs.writeFileSync(
			file,
			`---
title: ${JSON.stringify(slug.split("/").at(-1))}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: true
lang: ${lang}
translationKey: ${JSON.stringify(slug)}
---
`,
		);
		console.log(`已创建 ${file}`);
	}
}

try {
	if (process.argv.length !== 3)
		throw new Error(
			"用法：pnpm new-post <文章名>，例如 pnpm new-post ai-coding",
		);
	createPostPair(process.argv[2]);
} catch (error) {
	console.error(error instanceof Error ? error.message : "创建文章失败");
	process.exitCode = 1;
}
