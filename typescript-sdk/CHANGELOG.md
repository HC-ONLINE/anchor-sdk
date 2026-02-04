# Changelog

All notable changes to the Anchor SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-04

### Added
- Workspace simplification: `workspaceId` is now optional and automatically handled by the API
- Automatic `/v1` prefix for all API endpoints (transparent to users)
- Support for standardized response formats with `{data, has_more, total}` wrapper
- Backward compatibility: SDK handles both new and legacy response formats

### Changed
- `workspaceId` parameter in `Anchor` constructor is now optional (API uses default workspace from API key)
- All API endpoints now use `/v1` prefix automatically
- List methods (`agents.list()`, `data.list()`, `audit.query()`, etc.) now support both new and old response formats
- Batch write now uses `entries` instead of `items` (internal change, API signature unchanged)
- User-Agent updated to `anchorai-typescript/1.1.0`

### Fixed
- Batch write format now matches API expectations (`entries` array)
- Response parsing handles both new standardized format and legacy format for backward compatibility

### Migration Notes
- **No breaking changes**: All existing code continues to work
- `workspaceId` is now optional - you can remove it from initialization if you only use one workspace
- The API automatically uses the workspace associated with your API key

## 2025-01-08

### Added
- `workspaceId` parameter support in `Anchor` constructor and `Config` interface
- Automatic `workspaceId` injection in all API requests (POST/PUT/PATCH in body, GET/DELETE in query params)
- `workspaceId` parameter in `agents.create()` method (optional override)
- `getWorkspaceId()` helper method to fetch default workspace ID from API
- Warning when `workspaceId` is not provided (to prevent data mixing issues)

### Changed
- All API calls now automatically include `workspaceId` if set during client initialization
- `HttpClient.request()` now accepts optional `workspaceId` parameter for per-request overrides
- User-Agent updated to `anchorai-typescript/1.0.1`

### Fixed
- Resolves `ValidationError: workspaceId is required` when creating agents and other operations
- Prevents data mixing issues by requiring explicit workspaceId

## [1.0.0] - 2025-12-30

### Added

- Initial public release of Anchor TypeScript SDK
- `Anchor` client with five namespaces:
  - `anchor.agents` - Create, get, list, update, delete, suspend, activate agents
  - `anchor.config` - Get, update, list versions, rollback configuration
  - `anchor.data` - Write, read, search, delete key-value data with policy enforcement
  - `anchor.checkpoints` - Create, list, get, restore, delete state snapshots
  - `anchor.audit` - Query events, verify chain integrity, export for compliance
- Policy enforcement on write (block PII, secrets, custom patterns)
- Hash-chained audit logging
- Custom exceptions:
  - `AnchorError` - Base exception
  - `AuthenticationError` - Invalid API key
  - `NotFoundError` - Resource not found
  - `ValidationError` - Invalid input
  - `PolicyViolationError` - Blocked by policy
  - `RateLimitError` - Rate limit exceeded
- Automatic retry with exponential backoff
- Full TypeScript type definitions
- Framework integrations:
  - LangChain: `AnchorMemory`, `AnchorChatHistory`
  - CrewAI: `AnchorCrewAgent`, `AnchorCrewMemory`
  - Mem0: `AnchorMem0`

[1.1.0]: https://github.com/anchorco/anchor-sdk/releases/tag/v1.1.0
[1.0.0]: https://github.com/anchorco/anchor-sdk/releases/tag/v1.0.0
