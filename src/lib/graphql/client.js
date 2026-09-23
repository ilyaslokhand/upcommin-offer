const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchGraphQL(query, variables = {}, options = {}) {
  /*
   * Cache instructions for Next.js.
   *
   * revalidate:
   * Backup time before refreshing the saved data.
   *
   * tags:
   * Labels that allow our webhook to clear saved data.
   *
   * Example:
   * {
   *   revalidate: 300,
   *   tags: ["deals"]
   * }
   */
  const cacheOptions = {
    revalidate: options.revalidate ?? 0,
    tags: options.tags ?? [],
  };

  /*
   * Send the GraphQL request to WordPress.
   */

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: cacheOptions,
  });

  if (!res.ok) {
    throw new Error(`GraphQL fetch failed: ${res.status}`);
  }

  /*
   * Convert the response into JavaScript data.
   */

  const json = await res.json();

  /*
   * Stop if GraphQL returned an error.
   */

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }
  /*
   * Return the WordPress data.
   */

  return json.data;
}
