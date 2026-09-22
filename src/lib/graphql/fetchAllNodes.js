import { fetchGraphQL } from "./client";

// Fetch every batch of a WPGraphQL connection.
export async function fetchAllNodes(query, connectionName, batchSize) {
  const allNodes = [];
  let after = null;

  while (true) {
    const data = await fetchGraphQL(query, {
      first: batchSize,
      after,
    });

    const connection = data?.[connectionName];

    if (!connection?.pageInfo) {
      throw new Error(`Missing pagination data for ${connectionName}`);
    }

    allNodes.push(...(connection.nodes ?? []));

    if (!connection.pageInfo.hasNextPage) {
      return allNodes;
    }

    const nextCursor = connection.pageInfo.endCursor;

    if (!nextCursor || nextCursor === after) {
      throw new Error(`Invalid pagination cursor for ${connectionName}`);
    }

    after = nextCursor;
  }
}


// | Parameter        | Meaning                                       | Example for blog posts |
// | ---------------- | --------------------------------------------- | ---------------------- |
// | `query`          | What to ask WordPress for                     | `SITEMAP_POSTS_QUERY`  |
// | `connectionName` | Where the results are in WordPress’s response | `"posts"`              |
// | `batchSize`      | How many to request at a time                 | `100`                  |
