# Detailed Project Memory

## Project identity

- Name: Buffer
- Type: Raycast extension
- Goal: manage Buffer content workflows directly from Raycast and via Raycast AI tools
- Main user capabilities:
  - inspect account and organizations
  - inspect connected channels
  - browse scheduled, sent, and draft posts
  - create posts
  - create ideas
  - delete posts by id

## Repository map

- `package.json`: extension manifest, command definitions, tool definitions, AI instructions, scripts, and preferences.
- `src/utils/types.ts`: domain model for account, organization, channel, post, idea, pagination, and mutation inputs.
- `src/utils/buffer-api.ts`: single API integration layer, GraphQL fragments, queries, mutations, validation helpers.
- `src/utils/helpers.ts`: formatting and labeling helpers for services, dates, text truncation, and channel/post labels.
- `src/tools/shared.ts`: shared tool context, first-organization lookup, active channel filtering, channel resolution.
- `src/*.tsx`: user-facing Raycast commands.
- `src/tools/*.ts`: AI-callable Raycast tools.

## Command inventory

- `scheduled-posts`: grouped view of upcoming posts, supports deletion flow.
- `sent-posts`: grouped view of published posts with basic stats badges.
- `create-post`: form-based composer for queue, scheduled, or draft posting.
- `channels`: connected/disconnected channel browser.
- `draft-posts`: grouped draft and needs-approval view with deletion flow.
- `create-idea`: idea capture form for the selected organization.
- `account-overview`: account summary with organizations and connected apps.
- `organizations`: organization listing and detail view.

## Tool inventory

- `get-account`: fetch authenticated account.
- `list-organizations`: fetch organizations from account.
- `list-channels`: fetch active channels in current organization context.
- `get-channel`: resolve a channel query and fetch full details.
- `list-posts`: generic filtered post listing.
- `list-scheduled-posts`: upcoming post listing with optional channel filter.
- `delete-post`: delete by exact post id.
- `create-post`: create queue, scheduled, or draft post.
- `create-idea`: create an idea in the current organization.

## Architectural patterns

### 1. Centralized API boundary

All remote operations go through `gql()` in `src/utils/buffer-api.ts`. This is the safest extension point for:

- auth headers
- error normalization
- GraphQL schema updates
- reusable query fragments

Preferred rule: if a new feature needs Buffer data, extend `buffer-api.ts` first and only then wire it into UI or tools.

### 2. Shared types as contract

`src/utils/types.ts` mirrors the expected Buffer GraphQL response shapes. When adding or changing fields:

- update the GraphQL field selection
- update the TypeScript type
- update any helper or UI consumer that depends on the shape

### 3. First-organization default

The current tooling model assumes `account.organizations[0]` is the active organization in many flows. This is convenient, but it is also an architectural constraint. Future multi-organization work should treat this as a known migration point.

### 4. Channel resolution strategy

`resolveChannel()` in `src/tools/shared.ts` is intentionally forgiving:

- exact match first
- partial match second
- searches across id, name, display name, service, and display/service combinations
- returns ambiguity data when multiple matches exist

This is an important behavior contract for AI tools.

### 5. UI patterns

The command UIs follow a small number of repeatable patterns:

- `usePromise()` for fetching account, channels, and posts
- detail screen for individual entity inspection
- list grouping by `channelId` for post collections
- toast + optimistic mutation flow for destructive actions
- markdown rendering for account/organization/channel detail summaries

### 6. Content safety rules

The manifest AI instructions encode product behavior that should be preserved:

- do not rewrite provided post text unless asked
- do not post to multiple channels unless asked
- prefer active channels
- use ideas for ideation workflows, not posting workflows

Keep these rules aligned between `package.json`, tools, and future docs.

## Important implementation details

### API/auth

- Auth comes from Raycast preference `accessToken`.
- The API endpoint constant is `https://api.buffer.com`.
- GraphQL errors and HTTP failures are surfaced as thrown `Error` objects.

### Post retrieval

- `getPosts()` supports channel filtering, status filtering, date filtering, cursor, and limit.
- Convenience wrappers exist for scheduled, sent, and draft states.
- The UI currently uses a bounded subset of results and does not expose full pagination UX.

### Post creation

- Post mode defaults to `customScheduled` when `scheduledAt` exists, otherwise `addToQueue`.
- Draft creation is controlled by `saveToDraft`.
- Only one asset mode is allowed at a time: image or video.
- Facebook receives special metadata through `buildPostMetadata()`.

### Idea creation

- Idea creation requires at least a title or text.
- Optional date is converted to ISO string.
- Optional service list is passed through if present.

### Destructive flows

- Scheduled and draft views can delete posts.
- AI deletion requires exact `postId`.
- UI deletion uses confirmation dialogs and toast feedback.

## Known debt and future opportunities

- Add contributor-facing README.
- Add tests for tool channel resolution and API helper validation.
- Unify repeated grouped-post UI logic across scheduled, sent, and draft views.
- Add explicit organization selection to more flows.
- Expose pagination or “load more” behaviors in list commands.
- Consider stronger validation for media URLs and scheduling rules.

## Session startup checklist

When starting a future task in this repo:

- read `CLAUDE.md` first
- read `.claude/project-memory.md` for architecture context
- read `.claude/decisions.md` for prior tradeoffs
- read `.claude/worklog.md` for recent activity
- inspect `package.json` if the task affects commands, tools, AI instructions, or preferences
- inspect `src/utils/buffer-api.ts` if the task touches data flow

## Session close checklist

- update `CLAUDE.md` only if stable repository truths changed
- append a short entry to `.claude/worklog.md`
- append to `.claude/decisions.md` if an enduring technical decision was made
- mention any new limitations or migration notes
