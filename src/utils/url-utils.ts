import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { localizePath, type Locale } from "@i18n/locale";

export function pathsEqual(path1: string, path2: string) {
	return (
		path1.replace(/^\/|\/$/g, "").toLowerCase() ===
		path2.replace(/^\/|\/$/g, "").toLowerCase()
	);
}

// ===== 移除文章目录中的语言前缀，保留嵌套文章路径 =====
export function getPublicSlug(slug: string): string {
	return slug.replace(/^(en|zh)\//, "");
}

export function getPostUrlBySlug(slug: string, locale: Locale = "en"): string {
	return url(`/posts/${getPublicSlug(slug)}/`, locale);
}

export function getTagUrl(tag: string, locale: Locale = "en"): string {
	if (!tag) return url("/archive/", locale);
	return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`, locale);
}

export function getCategoryUrl(
	category: string | null,
	locale: Locale = "en",
): string {
	if (
		!category?.trim() ||
		category.trim().toLowerCase() ===
			i18n(I18nKey.uncategorized, locale).toLowerCase()
	) {
		return url("/archive/?uncategorized=true", locale);
	}
	return url(
		`/archive/?category=${encodeURIComponent(category.trim())}`,
		locale,
	);
}

export function getDir(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/");
	return lastSlashIndex < 0 ? "/" : path.substring(0, lastSlashIndex + 1);
}

// ===== 生成站内链接，静态资源不传语言参数 =====
export function url(path: string, locale?: Locale): string {
	return [
		"",
		import.meta.env.BASE_URL,
		locale ? localizePath(path, locale) : path,
	]
		.join("/")
		.replace(/\/+/g, "/");
}
