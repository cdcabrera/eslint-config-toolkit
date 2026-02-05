# Agent Guidelines

## Overview

Agent-specific guidelines for the ESLint Config Toolkit project, optimized for machine processing.

## File Naming Convention

- `agent_*`: Guidance for autonomous agents

## Guidelines Index

### Agent Guidelines

- [Agent Behaviors](./agent_behaviors.md) - Comprehensive guide to agent behaviors, workflows, and standards
- [Agent Testing](./agent_testing.md) - Testing procedures
- [Agent Rule Management](./agent_rule_management.md) - ESLint rule management
- [Agent Comments](./agent_comments.md) - Comment templates and standards
- [Problematic Rules Manifest](./agent_manifest.md) - Registry for rules and APIs requiring complex configuration or conflict resolution

## User Guide

### Available Trigger Phrases

- **`review the repo guidelines`** - Scan markdown files and guidelines directory
- **`Verify what happens when we add this rule`** - Research and analyze rule behavior
- **`Add rule [rule-name] to enforce [behavior]`** - Implement rule with testing
- **`Research rule conflicts between X and Y`** - Identify and resolve conflicts
- **`Test rule [rule-name]`** - Create test cases
- **`Update documentation for rule Z`** - Update rule documentation
- **`Implement modern JavaScript recommendation [X]`** - Implement JS recommendations

## Guidelines Processing Order

1. **Guidelines Directory** (all files in the `guidelines/` directory)
2. **Local Guidelines** (`.agent/` directory)

## Maintaining This Directory

### File Maintenance Principles
- Reference and index guidelines, don't duplicate content
- Update references when adding new files
- Keep descriptions concise and focused

### Adding New Guidelines
1. Add entry to "Guidelines Index" section
2. Include essential metadata
3. Provide brief description
4. Update processing order if needed

Last updated: August 22, 2025
