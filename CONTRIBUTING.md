# Contributing to Anchor SDK

Thank you for your interest in contributing to Anchor SDK! This document provides clear, step-by-step guidelines for contributing.

## What Can Be Contributed?

### Welcome Contributions

- SDK improvements (bug fixes, new features)
- Documentation improvements
- Example code, integration examples
- Test coverage
- Performance optimizations

### Not in This Repo

- Server implementation
- Core algorithms
- Database schema
- Admin tools

## Prerequisites

- **Python SDK**: Python 3.9+ and pip
- **TypeScript SDK**: Node.js 18+ and npm
- Git installed and configured
- GitHub account (for forking and PRs)

## Step-by-Step Contribution Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/anchor-sdk.git
cd anchor-sdk
```

### 2. Set Up Remote

```bash
# Add upstream remote
git remote add upstream https://github.com/anchorco/anchor-sdk.git

# Verify remotes
git remote -v
```

### 3. Create a Branch

**Branch naming convention:**
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `test/description` - Test improvements

```bash
# Make sure you're on main/master
git checkout main
git pull upstream main

# Create your branch
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

- **Follow existing code style** (see Code Style section below)
- **Keep commits focused** - one logical change per commit
- **Update tests** if you're changing functionality
- **Update documentation** if you're adding features or changing APIs

### 5. Test Your Changes

**Before committing, always run tests:**

#### Python SDK Testing

```bash
cd python-sdk

# Install dependencies
pip install -e ".[dev]"

# Run linting
ruff check src/ tests/

# Run type checking
mypy src/ --ignore-missing-imports || true

# Run tests
pytest tests/ -v --cov=src/anchor --cov-report=term

# Verify package builds
pip install build twine
python -m build
twine check dist/*
```

#### TypeScript SDK Testing

```bash
cd typescript-sdk

# Install dependencies
npm ci

# Run linting
npm run lint || true

# Run type checking and build
npm run build

# Run tests
npm test

# Verify package builds
npm pack
```

**All tests must pass before submitting a PR.**

### 6. Commit Your Changes

**Commit message format:**
```
type(scope): Brief description

- Detailed explanation of what changed
- Why it was changed (if not obvious)
- Any breaking changes (if applicable)
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `test` - Test changes
- `refactor` - Code refactoring
- `chore` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(python-sdk): Add workspace_id parameter support

- Add optional workspace_id to Anchor.__init__()
- Automatically inject workspaceId in API requests
- Update tests to cover new functionality"

git commit -m "fix(typescript-sdk): Fix batch write payload format

- Change 'items' to 'entries' to match API expectations
- Update tests to verify correct payload structure"
```

### 7. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:
- **Clear title** describing the change
- **Description** explaining:
  - What changed and why
  - How to test the changes
  - Any breaking changes
  - Related issues (if applicable)
- **Screenshots** (if UI/docs changes)

## Development Setup

### Python SDK

```bash
cd python-sdk

# Install in development mode with all dev dependencies
pip install -e ".[dev]"

# This installs:
# - The anchorai package in editable mode
# - Development tools: pytest, black, mypy, ruff, etc.
```

**Project Structure:**
- `src/anchor/` - Main SDK source code
- `tests/` - Test suite
- `examples/` - Example code
- `pyproject.toml` - Package configuration

### TypeScript SDK

```bash
cd typescript-sdk

# Install dependencies
npm install

# This installs:
# - All dependencies from package.json
# - Development tools: jest, typescript, eslint, prettier, etc.
```

**Project Structure:**
- `src/` - Main SDK source code
- `src/__tests__/` - Test suite
- `package.json` - Package configuration

## Code Style

### Python

**Formatting:**
- Follow [PEP 8](https://pep8.org/) style guide
- Use `ruff` for linting (configured in `pyproject.toml`)
- Use `black` for code formatting (if needed)

**Type Hints:**
- Always use type hints for function parameters and return values
- Run `mypy src/` to check types (some errors may be ignored)

**Example:**
```python
def create_agent(
    self,
    name: str,
    metadata: Optional[Dict[str, Any]] = None,
) -> Agent:
    """Create a new agent."""
    # ...
```

**Before committing:**
```bash
cd python-sdk
ruff check src/ tests/          # Check linting
mypy src/ --ignore-missing-imports  # Check types
```

### TypeScript

**Formatting:**
- Follow ESLint rules (configured in `.eslintrc.js`)
- Use `prettier` for code formatting
- TypeScript strict mode is enabled

**Type Safety:**
- Always use TypeScript types (avoid `any` when possible)
- Use interfaces for object shapes
- Use enums for constants

**Example:**
```typescript
interface CreateAgentOptions {
  name: string;
  metadata?: Record<string, unknown>;
}

async createAgent(options: CreateAgentOptions): Promise<Agent> {
  // ...
}
```

**Before committing:**
```bash
cd typescript-sdk
npm run lint      # Check linting
npm run build     # Check types and build
```

## Pre-Commit Checklist

Before submitting a PR, ensure:

- [ ] All tests pass (`pytest` for Python, `npm test` for TypeScript)
- [ ] Code follows style guidelines (linting passes)
- [ ] Type checking passes (`mypy` for Python, `npm run build` for TypeScript)
- [ ] New features have tests
- [ ] Documentation is updated (README, CHANGELOG if needed)
- [ ] Commit messages follow the format above
- [ ] No console.log/debug statements left in code
- [ ] No commented-out code
- [ ] Package builds successfully

## Pull Request Review Process

1. **Automated Checks**: CI will run tests and linting
2. **Code Review**: Maintainers will review your changes
3. **Feedback**: Address any requested changes
4. **Merge**: Once approved, your PR will be merged

**Common Feedback:**
- "Please add tests" - Add test coverage for new functionality
- "Please update docs" - Update relevant documentation
- "Please fix linting" - Run linting tools and fix issues
- "Please rebase" - Rebase your branch on latest main

## Getting Help

- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check `README.md` files in each SDK directory

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
