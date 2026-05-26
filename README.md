# 愛豆模擬器 Custom Character Edition

This version lets the player customise their own idol before playing.

## Custom character options

- Idol stage name
- Fan name
- Age
- Representative colour
- Concept/style
- Idol position
- Personality
- Avatar emoji

## Included phone apps

- Weverse
- KakaoTalk
- Instagram
- Bubble / 泡泡
- Fan letters
- Schedule
- Profile page

## Game stats

- Fans / fan name
- Black fans
- Popularity
- Energy
- Singing/dancing skill
- Love / relationship score

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload:
   - `index.html`
   - `style.css`
   - `game.js`
   - `README.md`
3. Go to **Settings → Pages**.
4. Source: **Deploy from a branch**
5. Branch: **main**
6. Folder: **/root**
7. Save and wait for the live link.

## Edit the game

Open `game.js`.

Character defaults are in:

```js
const state = { ... }
```

Colour themes are in:

```js
const colorThemes = { ... }
```

Story events are in:

```js
const events = { ... }
const apps = { ... }
const appEffects = { ... }
```
