
# UpcomingOffer Cache System

## Purpose

The public Next.js website saves WordPress deal data temporarily so pages load quickly without contacting WordPress for every visitor.

## Cache flow

Publish, update, trash, or restore a deal in WordPress  
→ WordPress calls `/api/revalidate`  
→ Next.js clears the relevant cached data  
→ Visitors receive updated deal information

## Cache labels

### `deals`

Used by all deal listings, including:

- Homepage deal sections
- Deals page
- Category and subcategory deal lists
- Store deal lists
- Sale deal lists
- Deal count

Example:

```js
{
  revalidate: 300,
  tags: ["deals"],
}
```

### `deal:${slug}`

Used by one individual deal page.

Example:

```js
{
  revalidate: 300,
  // Gives each deal its own cache label using its WordPress slug.
  tags: [`deal:${slug}`],
}
```

Example label:

```text
deal:amazon-basics-steel-bowl
```

## Refresh behaviour

### Deal feeds

```js
revalidateTag("deals", "max");
```

The current feed can load immediately while Next.js refreshes it quietly in the background.

### Individual deal

```js
revalidateTag(`deal:${slug}`, {
  expire: 0,
});
```

The next request waits for fresh information. This helps prevent visitors from seeing an old price or expired deal.

## Backup refresh time

Deal requests use:

```js
revalidate: 300
```

This means Next.js can refresh the saved data after five minutes even if the WordPress webhook fails.

Never change this to `0`. A value of `0` disables the saved cache, so cache labels and webhook refreshes would no longer work.

## Important files

```text
src/lib/graphql/client.js
```

Passes `revalidate` and `tags` to Next.js fetch.

```text
src/lib/graphql/queries/deals.js
```

Contains the cached deal queries.

```text
src/app/api/revalidate/route.js
```

Receives the protected WordPress request and clears the cache.

```text
WordPress → Code Snippets
```

Sends the request whenever a published deal changes.


## Duplicate-request protection

The WordPress snippet uses a five-second transient.

This prevents one WordPress update from sending the same webhook more than once.

Expected result:

```text
One WordPress action
→ One POST /api/revalidate
→ Two cache invalidations
```

The two internal invalidations are expected:

1. All deal feeds
2. The individual deal


Keep these separate from deal caching so changes can be refreshed precisely.


curl.exe -s https://upcomingoffer.com/deals/sitovi-transparent-glass-jar-and-container-air-tight-black-lid-for-kitchen-400-ml-mataki-glass-jar-with-airtight-metal-lid-pack-of-6 | findstr "canonical"