import type { APIContext } from "astro";
import { createRss } from "@utils/rss-utils";
export const GET = (context: APIContext) => createRss(context, "zh");
