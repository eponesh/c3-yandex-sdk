# Construct 3 [PLUGIN]: Yandex SDK
Yandex SDK addon for Construct 3.

![Actions](https://sun9-53.userapi.com/c855532/v855532844/23ad55/Kzwxf42xxEg.jpg)

## Install

[Download Addon](https://www.construct.net/en/make-games/addons/398/yandex-sdk) from official Scirra's Website.

Or from [build](build/) dist.

## Docs

[Plugin ACE docs](docs.md)

## For Developers

### Local development

1. Install dependencies

```sh
npm i
```

2. [Enable developer mode](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/enabling-developer-mode).

3. Run dev server
```sh
npm run dev
```

Server started on
[`http://localhost:8080`](http://localhost:8080).

Use `addon.json` link [`http://localhost:8080/addon.json`](http://localhost:8080/addon.json) to load addon.

4. Read [how to use developer mode](https://www.construct.net/en/make-games/manuals/addon-sdk/guide/using-developer-mode).

### Production build

```sh
npm run build
# out >> build/yandex-sdk-X.X.X.c3addon
```
