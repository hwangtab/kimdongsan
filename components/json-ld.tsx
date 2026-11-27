/**
 * Single place that emits a JSON-LD block, so every page escapes the payload
 * the same way (`<` inside a lyric would otherwise close the script tag).
 */
export function JsonLd({ graph }: { graph: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
