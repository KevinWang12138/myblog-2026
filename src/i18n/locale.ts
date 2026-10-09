export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export type PageAlternates = Partial<Record<Locale, string>>;

// ===== 从网址读取当前语言，保留英文首页的既有路径 =====
export function getLocale(url: URL): Locale {
	return /^\/zh(?:\/|$)/.test(url.pathname) ? "zh" : "en";
}

// ===== 生成当前语言的站内路径，查询参数由调用者提供 =====
export function localizePath(path: string, locale: Locale): string {
	const normalized = `/${path.replace(/^\/+/, "")}`;
	return locale === "zh" ? `/zh${normalized}` : normalized;
}

// ===== 为固定页面生成语言对应关系，分页切换回目标语言首页 =====
export function getPageAlternates(pathname: string): PageAlternates {
	const path = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
	if (/^\/\d+\/?$/.test(path))
		return { [pathname.startsWith("/zh/") ? "zh" : "en"]: pathname };
	return { en: localizePath(path, "en"), zh: localizePath(path, "zh") };
}
