import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { type Locale } from "@i18n/locale";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "./url-utils";
import { validatePostTranslations } from "./post-localization";

// ===== 读取可见文章并验证语言配对，生产环境不公开草稿 =====
export async function getAllPosts() {
	const posts = await getCollection(
		"posts",
		({ data }) => !import.meta.env.PROD || !data.draft,
	);
	validatePostTranslations(posts);
	return posts;
}

// ===== 每种语言独立排序和连接上一篇、下一篇 =====
export async function getSortedPosts(locale: Locale = "en") {
	const posts = (await getAllPosts())
		.filter((post) => post.data.lang === locale)
		.sort(
			(a, b) =>
				b.data.published.getTime() - a.data.published.getTime() ||
				a.slug.localeCompare(b.slug),
		);
	return posts.map((post, index) => ({
		...post,
		data: {
			...post.data,
			nextSlug: posts[index - 1]?.slug || "",
			nextTitle: posts[index - 1]?.data.title || "",
			prevSlug: posts[index + 1]?.slug || "",
			prevTitle: posts[index + 1]?.data.title || "",
		},
	}));
}

export type PostForList = {
	slug: string;
	data: CollectionEntry<"posts">["data"];
};
export async function getSortedPostsList(
	locale: Locale = "en",
): Promise<PostForList[]> {
	return (await getSortedPosts(locale)).map(({ slug, data }) => ({
		slug,
		data,
	}));
}

export type Tag = { name: string; count: number };
export async function getTagList(locale: Locale = "en"): Promise<Tag[]> {
	const counts = new Map<string, number>();
	for (const post of await getSortedPosts(locale)) {
		for (const tag of post.data.tags)
			counts.set(tag, (counts.get(tag) || 0) + 1);
	}
	return [...counts]
		.sort(([a], [b]) => a.localeCompare(b, locale))
		.map(([name, count]) => ({ name, count }));
}

export type Category = Tag & { url: string };
export async function getCategoryList(
	locale: Locale = "en",
): Promise<Category[]> {
	const counts = new Map<string, number>();
	for (const post of await getSortedPosts(locale)) {
		const name =
			post.data.category?.trim() || i18n(I18nKey.uncategorized, locale);
		counts.set(name, (counts.get(name) || 0) + 1);
	}
	return [...counts]
		.sort(([a], [b]) => a.localeCompare(b, locale))
		.map(([name, count]) => ({
			name,
			count,
			url: getCategoryUrl(name, locale),
		}));
}
