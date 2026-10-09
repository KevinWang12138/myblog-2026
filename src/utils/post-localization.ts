import type { Locale, PageAlternates } from "@i18n/locale";
import { getPostUrlBySlug, getPublicSlug } from "./url-utils";

export type LocalizedPost = {
	slug: string;
	data: { lang: Locale; translationKey?: string };
};

// ===== 两份文章通过共同标识配对，旧文章默认使用原来的路径标识 =====
export function getTranslationKey(post: LocalizedPost): string {
	return post.data.translationKey || getPublicSlug(post.slug);
}

// ===== 提前阻止重复语言版本或网址覆盖，避免切换到错误文章 =====
export function validatePostTranslations(posts: LocalizedPost[]): void {
	const translations = new Set<string>();
	const paths = new Set<string>();
	for (const post of posts) {
		const key = `${post.data.lang}:${getTranslationKey(post)}`;
		const path = getPostUrlBySlug(post.slug, post.data.lang);
		if (translations.has(key)) throw new Error(`文章语言版本重复：${key}`);
		if (paths.has(path)) throw new Error(`文章网址重复：${path}`);
		translations.add(key);
		paths.add(path);
	}
}

// ===== 只链接已发布的对应文章，缺失译文不会指向其他文章 =====
export function getPostAlternates(
	post: LocalizedPost,
	posts: LocalizedPost[],
): PageAlternates {
	const key = getTranslationKey(post);
	const alternates: PageAlternates = {};
	for (const candidate of posts) {
		if (getTranslationKey(candidate) === key) {
			alternates[candidate.data.lang] = getPostUrlBySlug(
				candidate.slug,
				candidate.data.lang,
			);
		}
	}
	return alternates;
}
