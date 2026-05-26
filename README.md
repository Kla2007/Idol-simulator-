# 愛豆模擬器 Social Edition

This is a mobile-style idol simulator inspired by the “screen dreaming / idol simulator” layout.

## Included features

- Weverse-style fan community
- KakaoTalk-style private chat
- Instagram-style feed/story choice
- Bubble-style fan message app
- Fan letters
- Schedule app
- Idol stats system
- Random events
- Save/load system
- Works on iPad through Safari after GitHub Pages publishing

## Files

Upload these files to GitHub:

- `index.html`
- `style.css`
- `game.js`
- `README.md`

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all project files.
3. Go to **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: **main**.
6. Folder: **/root**.
7. Save.
8. Wait for the GitHub Pages link.

## Where to edit story content

Open `game.js`.

Main app choices are here:

```js
const apps = { ... }
const appEffects = { ... }
```

Normal action events are here:

```js
const events = { ... }
```

You can add more story lines by copying the same format:

```js
["你的劇情文字", { fans: 100, popularity: 3, energy: -5 }]
```
