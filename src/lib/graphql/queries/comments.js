import { fetchGraphQL } from "../client";

const COMMENTS_QUERY = `
  query Comments($contentId: ID!, $first: Int = 10, $after: String) {
    comments(where: { contentId: $contentId, order: DESC }, first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        content
        date
        author { node { name } }
      }
    }
  }
`;

export async function getComments(
  contentId,
  { first = 10, after = null } = {},
) {
  const data = await fetchGraphQL(COMMENTS_QUERY, { contentId, first, after });
  return {
    comments: data?.comments?.nodes ?? [],
    pageInfo: data?.comments?.pageInfo ?? {
      hasNextPage: false,
      endCursor: null,
    },
  };
}

const CREATE_COMMENT_MUTATION = `
  mutation CreateComment($contentId: Int!, $content: String!, $author: String!, $authorEmail: String!) {
    createComment(input: {
      commentOn: $contentId,
      content: $content,
      author: $author,
      authorEmail: $authorEmail
    }) {
      success
    }
  }
`;

export async function postComment({ contentId, content, author, authorEmail }) {
  const data = await fetchGraphQL(CREATE_COMMENT_MUTATION, {
    contentId: parseInt(contentId),
    content,
    author,
    authorEmail,
  });
  return data?.createComment?.success ?? false;
}
