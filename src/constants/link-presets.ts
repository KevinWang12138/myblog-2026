import type { Locale } from "@i18n/locale";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export function getLinkPresets(locale: Locale): Record<LinkPreset, NavBarLink> {
	return {
		[LinkPreset.Home]: {
			name: i18n(I18nKey.home, locale),
			url: "/",
		},
		[LinkPreset.About]: {
			name: i18n(I18nKey.about, locale),
			url: "/about/",
		},
		[LinkPreset.Archive]: {
			name: i18n(I18nKey.archive, locale),
			url: "/archive/",
		},
	};
}
