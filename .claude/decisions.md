# Decisions Log

## D-001 — Store long-term memory inside the repository

- Status: accepted
- Date: 2026-04-22

Context:

- The external file `/Users/carlosperez/Downloads/.claude/settings.local.json` currently contains tool permissions.
- That file is not a good source of durable project knowledge because it is environment-specific and not part of the repository.

Decision:

- Store durable project memory in repository files:
  - `CLAUDE.md` for compact stable context
  - `.claude/project-memory.md` for deeper architectural memory
  - `.claude/worklog.md` for evolving operational notes

Consequences:

- Project memory becomes versionable and shareable.
- Future Claude sessions can recover context without depending on one machine-specific config file.
- The permissions file remains useful for local environment access control, but not for architectural memory.

## D-002 — Keep Buffer integration centralized

- Status: accepted
- Date: 2026-04-22

Context:

- The repo already concentrates GraphQL operations in `src/utils/buffer-api.ts` and type contracts in `src/utils/types.ts`.

Decision:

- Preserve this layering as the default extension path for future features.

Consequences:

- API changes stay localized.
- UI and tools remain thinner and easier to maintain.
- Type drift is easier to detect when GraphQL fields change.

## D-003 — Current organization context defaults to the first organization

- Status: accepted-with-known-limitations
- Date: 2026-04-22

Context:

- Several views and tools derive the working organization from `account.organizations[0]`.

Decision:

- Keep this behavior for now because it is already the operational pattern in the codebase.

Consequences:

- Simpler implementation today.
- Multi-organization correctness remains a future enhancement area.
- Any work involving organization selection should treat this as a likely refactor point.
