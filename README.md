# WayShare — frontend

Next.js frontend for WayShare, UK intercity ride sharing on a cost-sharing basis. Uses the
Django + DRF backend ([API docs](https://wayshare-be.onrender.com/api/docs/)) over its
session-cookie API.

## Stack

- Next.js 16 (App Router) + React 19, TypeScript (`strict`)
- Tailwind CSS v4 — design tokens in `app/globals.css`
- Zod, React Hook Form, TanStack Query, axios (`lib/api.ts` validates every response)
- Vitest + React Testing Library

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Variable               | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_ENV` | `development` · `preview` · `staging` · `production`           |
| `NEXT_PUBLIC_SITE_URL` | Public base URL; required in production                        |
| `API_ORIGIN`           | Django origin, server-side only (defaults to the deployed API) |

## Auth and the API

- The browser only calls this app's origin: `next.config.ts` rewrites `/api/*` to
  `API_ORIGIN/api/*/`. The session cookie stays same-site, with no CORS and no tokens in JS.
- Call API paths without a trailing slash (`/accounts/login`); the rewrite adds it.
- `proxy.ts` redirects to `/login` when there is no session cookie, and away from
  login/register when there is one.
- Django's `CSRF_TRUSTED_ORIGINS` must include this app's origin, or logout is rejected.

## Scripts

| Script              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server                                        |
| `npm run build`     | Production build                                  |
| `npm run lint`      | ESLint (type-aware)                               |
| `npm run typecheck` | `tsc --noEmit`                                    |
| `npm run format`    | Prettier write                                    |
| `npm run test`      | Vitest                                            |
| `npm run api:types` | Regenerate `types/api.ts` from the OpenAPI schema |
| `npm run icons`     | Regenerate the favicons                           |

## Project layout

```
app/                     Routes, layouts, providers; (auth)/ holds /login and /register
components/ui/atoms/     Primitives: button, text-field, checkbox, labels…
components/ui/molecules/ Composed: form-field, password-input, notice, panel…
components/shell/        Top bar
features/<name>/
  api/                   API calls (and server actions)
  hooks/                 TanStack Query mutations and form hooks
  lib/                   Form schemas, mappers, paths
  types/                 Zod response schemas, generated request types
  ui/{atoms,molecules,organisms,templates}/
hooks/                   Shared hooks (useApiForm, useFieldBinder)
lib/                     API client, cookies, form-error mapping, SEO
types/api.ts             Generated from the backend's OpenAPI schema — do not edit
```

## Conventions

- Python owns every business rule. Client validation is feedback only; server errors are
  mapped onto the form (`lib/form-errors.ts`).
- Forms use `useApiForm` + `useFieldBinder`, so every field is labelled and accessible.
- WCAG 2.2 AA from the first component.
