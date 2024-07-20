# PixelTranslate Integration

This repository contains a list of all possible PixelTranslate Integrations and their links. The app serves an internal API that can be used to display and edit all the possible integration.

## Adding new Integrations

To register a new integration, please create a new file inside `~/integrations`. The file name should be a unique key that matches the integration. Afterwards, add the Integration Icon into the `~/public/integrations` folder. The Icon can either be a PNG or SVG.

Afterwards, please open a new pull request for us to review the integration. The Integration code, must be open source, closed source integrations will not be added for security purposes.

```yml
name: FULL_INTEGRATION_NAME
description: SHORT_DESCRIPTION
type: IDE | language | framework | pipeline | other
repo: org/repo
icon: INTEGRATION_KEY.svg
links:
    website: WEBSITE_LINK
    docs: DOCS_LINK
authors:
  - name: FULL_NAME
    github: GITHUB_USERNAME
    twitter: TWITTER_LINK
    website: WEBSITE_LINK
  - name: FULL_NAME
    github: GITHUB_USERNAME
    twitter: TWITTER_LINK
    website: WEBSITE_LINK
    avatar: LINK_TO_AVATAR
```

> You can find some examples of other integrations [here](./integrations/).

## Development

To install dependencies:

```bash
bun install
```

To run in dev mode:

```bash
bun dev
```

To build project into single-file executeable:

```bash
bun run build
```
