---
name: construction-implementation
description: Guidelines for code implementation, building features, and development work
---


# Construction & Implementation Guidelines

Use these guidelines when writing code, implementing features, or making changes.

## Before Coding

1. **Confirm understanding**: Verify requirements are clear
2. **Review existing code**: Understand current patterns
3. **Plan the approach**: Outline the implementation steps
4. **Identify risks**: Note potential issues early

## Implementation Approach

### Start Small
- Begin with the core functionality
- Add complexity incrementally
- Validate each step before proceeding

### Follow Patterns
- Match existing code style and conventions
- Use established patterns from the codebase
- Introduce new patterns only when justified

### Keep Changes Focused
- One logical change per commit
- Avoid mixing refactoring with features
- Separate formatting changes from logic changes

## Code Generation Best Practices

### Structure
- Create files in appropriate locations
- Follow project naming conventions
- Organize code logically within files

### Dependencies
- Prefer existing dependencies over new ones
- Check for compatible versions
- Document why new dependencies are needed

### Configuration
- Use environment variables for environment-specific values
- Provide sensible defaults
- Document configuration options

## Build and Test

### Before Submitting
1. Run the build to catch compilation errors
2. Execute relevant tests
3. Verify the feature works as expected
4. Check for regressions in related areas

### Test Coverage
- Add tests for new functionality
- Update tests for changed behavior
- Maintain or improve coverage

### Common Issues
- Missing imports or dependencies
- Type mismatches
- Unhandled error cases
- Race conditions in async code

## Code Review Readiness

Ensure your changes:
- Have clear commit messages
- Include necessary tests
- Update relevant documentation
- Don't include debug code or comments

## Build Configuration Consistency

### Match Existing Patterns
- Match build configurations used by other services in the same codebase
- Don't add unique build configurations unless there's a specific need
- Remove build plugins that make a service inconsistent with others

### Configuration Changes
- Document why build configuration changes are needed
- Test build changes across all affected modules
