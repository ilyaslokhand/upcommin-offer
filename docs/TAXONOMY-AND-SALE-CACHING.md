# Taxonomy and Sale Cache System

## Purpose

Stores, categories and sales change rarely.

Next.js saves this information so the public website does not contact WordPress for every visitor.

WordPress immediately informs Next.js whenever one of these items is added, edited or deleted.

---

## Cached information

### Stores

Used for:

- Store menus
- Store index
- Store count
- Individual store information
- Store logos and SEO content

Cache labels:

```text
stores
store:{slug}
```
