# P4.1 - Manipulating the DOM

The page reads `data/heroes.json` and shows each hero in a Bootstrap card, created with JavaScript. Only `jspractica.js` was changed; `index.html` is the original one.

## Functions added

- `renderCards(jsondata)`: clears the `<main>` and adds one card for each hero.
- `createEl(tag, classes, text)`: creates an element with its classes and text.
- `createBadge(color, text)`: creates a Bootstrap badge.
- `createCard(char)`: builds the card of one hero.
- `createAccordionItem(id, type, title, items)`: builds one accordion item with a list of names.

## DOM methods used

- `document.querySelector()`: finds the `<main>`.
- `document.createElement()`: creates all the elements.
- `classList.add()`: adds the Bootstrap classes.
- `textContent`: sets the texts.
- `setAttribute()`: sets `src`, `alt` and the `data-bs-*` attributes of the accordion.
- `style`: gives the same height to all the images.
- `append()` / `appendChild()`: puts the elements inside the page.
- `innerHTML = ""`: removes the example accordion from the `<main>`.
