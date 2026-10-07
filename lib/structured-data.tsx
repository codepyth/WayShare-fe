import type {
  Graph,
  Organization,
  Product,
  Service,
  Thing,
  WithContext,
} from "schema-dts";
import { absoluteUrl, siteConfig } from "./site-config";

/**
 * JSON-LD helpers. Render `<JsonLd data={...} />` from a server component
 * (page.tsx or layout.tsx). Validate output with
 * https://search.google.com/test/rich-results
 */

type SchemaFields<T extends Thing> = Omit<
  Exclude<T, string>,
  "@type" | "@context"
>;

/** Stable @id so other schemas can reference the organization. */
export const organizationId = `${absoluteUrl("/")}#organization`;

// <, >, & and the U+2028/U+2029 line separators.
const UNSAFE_CHARS = new RegExp(
  `[<>&${String.fromCharCode(0x2028, 0x2029)}]`,
  "g",
);

/**
 * Escapes characters that could break out of the <script> element
 * or be misparsed as HTML.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    UNSAFE_CHARS,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}

export function JsonLd({ data }: { data: WithContext<Thing> | Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/** Organization schema for the homepage. Add logo, sameAs, contactPoint, etc. via `fields`. */
export function organizationSchema(
  fields: Partial<SchemaFields<Organization>> = {},
): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    ...fields,
  };
}

/** Service schema (e.g. a ride/trip offering). `provider` defaults to the organization. */
export function serviceSchema(
  fields: SchemaFields<Service> & { name: string },
): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@id": organizationId },
    ...fields,
  };
}

/** Product schema (e.g. an individual listing with offers). `brand` defaults to the organization. */
export function productSchema(
  fields: SchemaFields<Product> & { name: string },
): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    brand: { "@id": organizationId },
    ...fields,
  };
}
