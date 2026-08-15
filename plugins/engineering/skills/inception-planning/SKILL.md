---
name: inception-planning
description: Guidelines for planning, requirements analysis, and design phases of development work
---


# Inception & Planning Guidelines

Use these guidelines when starting new features, analyzing requirements, or designing solutions.

## Workspace Detection

When starting work on a new codebase or area:
1. Identify the project structure and organization
2. Locate relevant configuration files
3. Understand the build and test setup
4. Note any existing patterns or conventions

## Requirements Analysis

Before implementing, ensure you understand:
- **What**: The specific functionality needed
- **Why**: The business or user value
- **Who**: The users or systems affected
- **When**: Any timing or sequencing requirements
- **Constraints**: Technical, business, or regulatory limits

### Clarifying Questions
Ask about:
- Acceptance criteria and success metrics
- Edge cases and error scenarios
- Integration points with other systems
- Performance and scalability requirements
- Security and compliance needs

## User Stories Format

When documenting requirements:
```
As a [type of user]
I want [some goal]
So that [some reason]

Acceptance Criteria:
- Given [context], when [action], then [result]
```

## Application Design

For significant changes, consider:
1. **Component breakdown**: What pieces are needed?
2. **Data flow**: How does information move?
3. **Interfaces**: How do components communicate?
4. **Dependencies**: What existing code is affected?
5. **Testing strategy**: How will this be verified?

## Design Decisions

Document key decisions:
- What options were considered
- Why the chosen approach was selected
- What trade-offs were accepted
- What assumptions were made

## Risk Assessment

Identify and communicate:
- Technical risks and mitigation strategies
- Dependencies on external systems or teams
- Areas of uncertainty requiring validation
- Potential impact on existing functionality

