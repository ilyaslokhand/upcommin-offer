# UpcomingOffer Blog Cache System

## Purpose

Next.js temporarily saves blog data so the public website does not contact WordPress for every visitor.

## Cache flow

Publish, update, trash, or restore a WordPress post  
→ WordPress calls `/api/revalidate`  
→ Next.js clears the relevant blog cache  
→ Visitors receive the updated content

## Blog-list cache

The following use the `blogs` cache label:

- Main blog page
- Homepage blog sections
- Blog-category pages
- Blog pagination

```js
{
  revalidate: 86400,
  tags: ["blogs"],
}
```

The blog-list cache is refreshed with:

```js
revalidateTag("blogs", "max");
```

This allows the current list to load immediately while Next.js refreshes it quietly in the background.

## Individual blog cache

Every article receives its own cache label using its WordPress slug:

```js
{
  revalidate: 86400,
  tags: [`blog:${slug}`],
}
```

Example:

```text
blog:bingo-potato-chips-cashback-offer
```

The individual article is refreshed with:

```js
revalidateTag(`blog:${slug}`, {
  expire: 0,
});
```

This ensures the next request receives fresh article content.

## One-day backup

```js
revalidate: 86400;
```

This does not automatically request every blog once per day.

It means:

1. Next.js can reuse the saved result for one day.
2. Nothing happens automatically when the day ends.
3. The next visitor after that period can trigger a fresh request.
4. WordPress normally refreshes the cache immediately through the webhook.

The one-day value is only a backup in case the webhook fails.

## Revalidation request

The WordPress blog hook sends:

```json
{
  "type": "blog",
  "slug": "example-blog-slug"
}
```

The endpoint uses `type: "blog"` to distinguish blog updates from deal updates.

## Important files

```text
src/lib/graphql/queries/posts.js
```

Contains the blog GraphQL queries and cache labels.

```text
src/app/api/revalidate/route.js
```

Receives protected requests from WordPress and clears the relevant cache.

```text
WordPress → Code Snippets → Refresh Next.js blog cache
```

Sends the webhook when a published WordPress post changes.

## Duplicate-request protection

The WordPress snippet uses a five-second transient.

Expected result:

```text
One WordPress action
→ One POST /api/revalidate
→ Two cache invalidations
```

The two cache invalidations are:

1. All blog lists using `blogs`
2. The individual article using `blog:${slug}`

## Security

The endpoint checks the private revalidation secret before clearing anything.

