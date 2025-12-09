# Commit Strategy

**Goal:** Frequent, small, logical commits for easy change management and rollback.

---

## 🎯 Commit Frequency

### When to Commit

**Commit immediately when:**
- ✅ A single feature/functionality is complete and working
- ✅ A bug is fixed
- ✅ Tests are added and passing
- ✅ A refactor is complete
- ✅ Documentation is updated
- ✅ A logical unit of work is done (even if small)

**Commit frequency:**
- **Aim for:** 5-15 commits per day during active development
- **Minimum:** Commit at least once per work session
- **Maximum:** No limit - smaller commits are better than large ones

### What Makes a Good Commit

**✅ Good Commit:**
- Single, focused change
- Complete and working (tests pass)
- Clear, descriptive commit message
- Related files grouped together

**❌ Bad Commit:**
- Multiple unrelated changes
- Broken code
- "WIP" or "fix" without context
- Hundreds of files changed at once

---

## 📝 Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
Type: Brief description (50 chars max)

Longer explanation if needed (wrap at 72 chars)
- Bullet point if needed
- Another bullet point
```

### Commit Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

### Examples

```bash
# Small feature
feat: Add portfolio card component

- Create PortfolioCard component
- Add basic styling
- Include portfolio name and value display

# Bug fix
fix: Resolve chart rendering on mobile devices

- Update responsive breakpoints
- Fix viewport calculation

# Documentation
docs: Update API integration guide

# Refactoring
refactor: Extract portfolio calculations to separate file

# Test
test: Add unit tests for portfolio calculations
```

---

## 🔄 Daily Commit Workflow

### Morning Routine
1. `git pull origin main` - Get latest changes
2. `git status` - Check current state
3. Start working on feature/bug

### During Development
1. **Make small, logical changes**
2. **Test your changes** (run tests, check in browser)
3. **Commit when logical unit is complete:**
   ```bash
   git add <files>
   git commit -m "Type: Description"
   ```
4. **Repeat** - Continue working, commit frequently

### End of Session
1. **Commit any remaining work:**
   ```bash
   git add .
   git status  # Review what you're committing
   git commit -m "Type: Description"
   ```
2. **Push to remote:**
   ```bash
   git push origin <branch-name>
   ```

---

## 📋 Commit Checklist

Before every commit, ask:

- [ ] Does this commit represent a single, logical change?
- [ ] Are all tests passing?
- [ ] Is the code working (no console errors)?
- [ ] Is the commit message clear and descriptive?
- [ ] Are related files grouped together?
- [ ] Are unrelated changes in separate commits?

---

## 🚫 What NOT to Commit

- ❌ Broken code
- ❌ Console.log statements (unless temporary debugging)
- ❌ Commented-out code
- ❌ Environment variables (`.env` files)
- ❌ Build artifacts (`dist/`, `node_modules/`)
- ❌ Personal notes or TODOs

---

## 💡 Best Practices

### 1. Commit Early, Commit Often
- Don't wait until the end of the day
- Commit after each small feature or fix
- Easier to rollback if something breaks

### 2. Keep Commits Focused
- One feature per commit
- One bug fix per commit
- One refactor per commit

### 3. Write Clear Messages
- Future you will thank present you
- Makes code review easier
- Helps with debugging

### 4. Test Before Committing
- Run tests: `npm test`
- Check in browser
- Verify no errors

### 5. Review Before Committing
```bash
git status        # See what will be committed
git diff          # Review changes
git diff --staged # Review staged changes
```

---

## 🔧 Quick Commands

```bash
# Check status
git status

# Stage specific files
git add src/components/Button/Button.tsx

# Stage all changes
git add .

# Commit with message
git commit -m "feat: Add button component"

# Commit with detailed message
git commit

# Push to remote
git push origin main

# View recent commits
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what changed
git diff
git diff --staged
```

---

## 📊 Commit Examples by Scenario

### Scenario 1: Adding a New Component
```bash
# Step 1: Create component file
# ... write code ...

# Step 2: Commit component
git add src/components/Button/Button.tsx
git commit -m "feat: Add Button component with variants"

# Step 3: Add styles
# ... write CSS ...

# Step 4: Commit styles
git add src/components/Button/Button.css
git commit -m "style: Add Button component styles"

# Step 5: Add tests
# ... write tests ...

# Step 6: Commit tests
git add src/components/Button/Button.test.tsx
git commit -m "test: Add Button component unit tests"
```

### Scenario 2: Fixing a Bug
```bash
# Step 1: Fix the bug
# ... fix code ...

# Step 2: Test the fix
npm test

# Step 3: Commit fix
git add src/components/Chart/Chart.tsx
git commit -m "fix: Resolve chart rendering issue on mobile"
```

### Scenario 3: Refactoring
```bash
# Step 1: Extract function
# ... refactor code ...

# Step 2: Commit refactor
git add src/utils/calculations.ts
git commit -m "refactor: Extract portfolio calculations to separate file"
```

---

## 🎯 Commit Frequency Goals

| Activity | Target Commits |
|----------|---------------|
| **New Feature** | 3-5 commits (component, styles, tests, integration) |
| **Bug Fix** | 1-2 commits (fix, test) |
| **Refactoring** | 2-4 commits (by logical unit) |
| **Documentation** | 1 commit per document/section |
| **Daily Work** | 5-15 commits |

---

**Remember:** Small, frequent commits make it easier to:
- Track changes
- Rollback if needed
- Review code
- Understand project history
- Collaborate with others

---

*Last Updated: December 2024*

