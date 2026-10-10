export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export type PageAlternates = Partial<Record<Locale, string>>;

// ===== 从网址读取当前语言，旧根路径仍按英文处理 =====
export function getLocale(url: URL): Locale {
	return /^\/zh(?:\/|$)/.test(url.pathname) ? "zh" : "en";
}

// ===== 生成带语言前缀的站内路径，避免重复添加前缀 =====
export function localizePath(path: string, locale: Locale): string {
	const normalized = `/${path.replace(/^\/+/, "")}`;
	const unlocalized = normalized.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";
	return `/${locale}${unlocalized}`;
}

// ===== 为固定页面生成语言对应关系，分页切换回目标语言首页 =====
export function getPageAlternates(pathname: string): PageAlternates {
	const path = pathname.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";
	if (/^\/\d+\/?$/.test(path))
		return { [pathname.startsWith("/zh/") ? "zh" : "en"]: pathname };
	return { en: localizePath(path, "en"), zh: localizePath(path, "zh") };
}
