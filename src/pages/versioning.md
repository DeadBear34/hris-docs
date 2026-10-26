---
title: Versioning Policy
description: What HRIS version numbers mean.
---

# Versioning Policy

Every HRIS release has a version number in the form **`MAJOR.MINOR.PATCH`**, following [Semantic Versioning](https://semver.org/spec/v2.0.0.html). For example, `0.7.1`.

```
   0   .   7   .   1
   │       │       └─ PATCH : fixes and security improvements
   │       └───────── MINOR : new features
   └───────────────── MAJOR : changes to how existing features work
```

When a number goes up, every number to its right goes back to zero: `0.7.1` → new feature → `0.8.0`.

## What each type of release means for you

| Release | Example | What to expect |
| --- | --- | --- |
| **Patch** (`0.7.0` → `0.7.1`) | Security update, bug fix | Nothing changes in how you use HRIS |
| **Minor** (`0.7.1` → `0.8.0`) | A new feature or page | New things to use; existing ones keep working |
| **Major** (`1.x` → `2.0.0`) | A redesigned workflow | Something you use works differently; the release notes explain what to do |

### Before 1.0

HRIS is still in its initial development phase. Until version `1.0.0`, a minor release may also change how an existing feature works. For example, 0.7.0 replaced manually assigned managers with managers that follow from the organization structure. Such changes are always explained in the [release notes](pathname:///release-notes).

Version `1.0.0` will mark HRIS as stable. From then on, any change to how an existing feature works will increase the major number.

## Documentation versions

This documentation keeps one version per minor release. Use the version menu at the top of the page to switch.

| Version | Status |
| --- | --- |
| 0.7.x | Current version; receives updates |
| 0.6.x | Previous version; kept for reference |
| Next | Preview of the upcoming release |

Patch releases don't get a separate documentation version because they don't change how HRIS is used; they are listed in the release notes.
