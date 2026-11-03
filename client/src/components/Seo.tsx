import { useEffect } from "react";

type SeoProps = {
  /** Page <title> */
  title: string;
  /** Meta description (~150–160 chars ideal) */
  description: string;
  /** Language of the page, e.g. "en" or "es" */
  lang: "en" | "es";
  /** Canonical path for THIS page, e.g. "/english" */
  path: string;
  /** Optional social share image (absolute or root-relative) */
  image?: string;
};

/**
 * Your live production domain. Used to build absolute canonical /
 * hreflang / Open Graph URLs (search engines want absolute URLs).
 */
const SITE_ORIGIN = "https://www.themodernprotocols.com";

/** The two language twins so we can emit correct hreflang alternates. */
const ALTERNATES: { hreflang: string; path: string }[] = [
  { hreflang: "en", path: "/english" },
  { hreflang: "es", path: "/espanol" },
  { hreflang: "x-default", path: "/english" },
];

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkRel(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, lang, path, image }: SeoProps) {
  useEffect(() => {
    const canonical = `${SITE_ORIGIN}${path}`;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${SITE_ORIGIN}${image}`
      : undefined;

    // Title + document language
    document.title = title;
    document.documentElement.setAttribute("lang", lang);

    // Standard meta
    setMetaByName("description", description);

    // Canonical
    setLinkRel("canonical", canonical);

    // hreflang alternates (tells Google the two language twins are related)
    ALTERNATES.forEach(({ hreflang, path: altPath }) => {
      setLinkRel("alternate", `${SITE_ORIGIN}${altPath}`, hreflang);
    });

    // Open Graph (Facebook / WhatsApp / LinkedIn share cards)
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:site_name", "The Modern Protocols");
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonical);
    setMetaByProperty("og:locale", lang === "es" ? "es_ES" : "en_US");
    if (imageUrl) setMetaByProperty("og:image", imageUrl);

    // Twitter card
    setMetaByName("twitter:card", imageUrl ? "summary_large_image" : "summary");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    if (imageUrl) setMetaByName("twitter:image", imageUrl);
  }, [title, description, lang, path, image]);

  return null;
}
