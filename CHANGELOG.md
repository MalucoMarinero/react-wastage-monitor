# Change Log

All notable changes to this project will be documented in this file.

## Unreleased Changes

## [0.2.0] - 2017-05-02
### Added
- add exclude option that supports string match or regexs, to allow suppression
  of particular components
- add calling component name to reuseChecker so the actual guilty party for the
  rerender is named, not just the rerendering component

## [0.1.1] - 2017-04-29
### Added
- add support for React 15.x listeners which notifies the user about:
  - components that are impure and don't implement shouldComponentUpdate
  - components that update even when their properties are referentially equal
  - components that render the same HTML even though props/state change
