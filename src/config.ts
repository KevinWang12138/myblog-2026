import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import type { Locale } from "./i18n/locale";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Kevin Wang",
	subtitle: "Notes from leading a dev team and building my own apps.",
	lang: "en", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/assets/images/avatar.png", // Path of the favicon, relative to the /public directory
			theme: "light", // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			sizes: "32x32", // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Kevin Wang",
	bio: "Tech company eng lead by day ☀️\nFounder by night 🌃\nBuilding my own apps 📱",
	links: [
		{
			name: "X",
			icon: "fa6-brands:x-twitter", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://x.com/kevinwang_me",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

// ===== 两套站点文案独立维护，视觉配置继续共用 =====
export const localizedSiteConfig = {
	en: {
		title: siteConfig.title,
		subtitle: siteConfig.subtitle,
		name: profileConfig.name,
		bio: profileConfig.bio,
		bannerCredit: siteConfig.banner.credit.text,
	},
	zh: {
		title: "Kevin Wang",
		subtitle: "记录技术团队管理与独立应用开发。",
		name: "Kevin Wang",
		bio: "白天，带领科技公司的工程团队 ☀️\n夜晚，作为创始人做产品 🌃\n打造自己的应用 📱",
		bannerCredit: "",
	},
} satisfies Record<
	Locale,
	{
		title: string;
		subtitle: string;
		name: string;
		bio?: string;
		bannerCredit: string;
	}
>;
