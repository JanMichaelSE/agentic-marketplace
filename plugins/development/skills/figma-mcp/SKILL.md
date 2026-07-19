---
name: figma-mcp
description: Implement or compare UI against Figma designs using an available Figma MCP integration. Use for Figma-backed implementation, design-token extraction, or visual-parity gap analysis; Figma MCP access is optional and must already be configured by the user.
---

# Figma MCP

Use an available Figma MCP integration to turn a specific design selection into
production-quality UI, extract reusable design tokens, or compare an existing
implementation with its design reference.

## Optional Prerequisite

This skill requires Figma MCP access only when the request needs live Figma
data. Confirm that the current client exposes the needed Figma MCP tools and
that the user can access the referenced design. Do not assume a particular MCP
client, configuration format, desktop application, account tier, or tool name.
If access is unavailable, ask for exported design context, screenshots, or a
different authorized path; do not attempt to configure or connect to Figma.

## Implement From a Design

1. Obtain the exact design node or a user-approved visual reference.
2. Fetch structured design context and a screenshot. If the response is too
   large, inspect the node hierarchy and retrieve only the required children.
3. Retrieve design variables when token-level detail is needed.
4. Reuse existing project components, tokens, routes, state handling, and asset
   conventions. Treat generated markup as design intent, not final code.
5. Use design-provided assets directly when available. Do not substitute a
   placeholder or add an icon package solely to recreate an available asset.
6. Validate layout, typography, colors, states, responsiveness, assets, and
   accessibility against the reference before declaring visual parity.

## Design-to-Code Gap Analysis

Compare each relevant component against the same Figma node. Record gaps by
category—layout, dimensions, typography, color, missing element, or
interaction state—and classify them as critical, major, or minor. For every
gap, state the design reference, current behavior, expected outcome, and a
specific proposed fix. Prioritize structure and broken states before cosmetic
differences.

## Token Extraction

When Figma variables are available, map them to the project’s established token
format rather than copying raw values throughout components. Preserve the
project naming scheme and discuss any intentional mismatch between design and
product tokens.

## Boundaries

- Do not create or edit Figma content unless the user explicitly requests it
  and the available tools support that action.
- Do not expose credentials, access tokens, private design data, or local MCP
  configuration in prompts, source code, or handoffs.
- Document justified deviations from the design, such as accessibility or
  platform constraints, near the relevant implementation or handoff.