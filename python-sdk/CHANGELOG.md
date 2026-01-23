# Changelog

All notable changes to the Anchor SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-02-04

### Added
- `workspace_id` parameter support in `Anchor.__init__()` and `ClientConfig` (optional, automatically handled by API)
- Automatic `workspaceId` injection in all API requests (POST/PUT/PATCH in body, GET/DELETE in query params)
- `workspace_id` parameter in `agents.create()` method (optional override)
- `get_workspace_id()` helper method to fetch default workspace ID from API (deprecated - API now handles automatically)
- Automatic `/v1` prefix for all API endpoints (transparent to users)
- Support for standardized response formats with `{data, has_more, total}` wrapper
- Backward compatibility: SDK handles both new and legacy response formats

### Changed
- `workspace_id` parameter in `Anchor.__init__()` is now optional (API uses default workspace from API key)
- All API endpoints now use `/v1` prefix automatically
- All API calls now automatically include `workspaceId` if set during client initialization
- List methods (`agents.list()`, `data.list()`, `audit.query()`, etc.) now support both new and old response formats
- Batch write now uses `entries` instead of `items` (internal change, API signature unchanged)
- `HttpClient.request()` now accepts optional `workspace_id` parameter for per-request overrides
- User-Agent updated to `anchorai-python/1.1.0`

### Fixed
- Batch write format now matches API expectations (`entries` array)
- Response parsing handles both new standardized format and legacy format for backward compatibility
- Resolves `ValidationError: workspaceId is required` when creating agents and other operations
- Prevents data mixing issues by automatically using workspace associated with API key

### Migration Notes
- **No breaking changes**: All existing code continues to work
- `workspace_id` is now optional - you can remove it from initialization if you only use one workspace
- The API automatically uses the workspace associated with your API key
- If you were previously getting `workspaceId is required` errors, these are now resolved as the API handles workspace selection automatically

## [1.0.0] - 2025-12-30

### Added

- Initial public release of Anchor Python SDK
- `Anchor` client with five namespaces:
  - `anchor.agents` – Create, get, list, update, delete, suspend, activate agents
  - `anchor.config` – Get, update, list versions, rollback configuration
  - `anchor.data` – Write, read, search, delete key-value data with policy enforcement
  - `anchor.checkpoints` – Create, list, get, restore, delete state snapshots
  - `anchor.audit` – Query events, verify chain integrity, export for compliance
- Policy enforcement on write (block PII, secrets, custom patterns)
- Hash-chained audit logging
- Custom exceptions:
  - `AnchorError` – Base exception
  - `AuthenticationError` – Invalid API key
  - `NotFoundError` – Resource not found
  - `ValidationError` – Invalid input
  - `PolicyViolationError` – Blocked by policy
  - `RateLimitError` – Rate limit exceeded
- Automatic retry with exponential backoff
- Full type hints

[1.1.0]: https://github.com/anchorco/anchor-sdk/releases/tag/v1.1.0
[1.0.0]: https://github.com/anchorco/anchor-sdk/releases/tag/v1.0.0