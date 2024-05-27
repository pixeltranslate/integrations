# PixelTranslate Integration

This repository contains a list of all possible PixelTranslate Integrations and their links. The app serves an internal API that can be used to display and edit all the possible integration.

## Adding new Integrations

To register a new integration, please create a new file inside `~/integrations`. The file should be named as a unique key that matches the integration. Afterwards, add the Integration Icon into the `~/icons`. The Icon can either be a PNG or SVG. 

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

| Key         | Description                                                             |
|-------------|-------------------------------------------------------------------------|
| name        | Full Integration Name                                                   |
| description | Short description of the integration (max 100 words)                    |
| type        | One of the following options: IDE, language, framework, pipeline, other |
| repo        | The Github Repo address (without https://github.com)                    |
| icon        | The name and suffix of the Icon (Add the icon into `~/icons`)           |

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
