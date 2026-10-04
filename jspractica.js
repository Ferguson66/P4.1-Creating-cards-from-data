/**
 * This code is just to read the json file. Don't worry about it. We will see it in detail in next sectioins
 * Write your own code in the procesarJSON function
 */

/**
 * Este código es solo para leeer el archivo json. No os preocupéis por él, lo veremos y lo analizaremos en próximos capítulos
 * Escribir vuestro código en la función procesarJSON
 */

fetch("./data/heroes.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    console.log(jsondata);
    renderCards(jsondata);
  })
  .catch((e) => {
    console.log(e);
  });

function renderCards(jsondata) {
  for (let char of jsondata.data.results) {
  }
}

function renderCards(jsondata) {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const container = createEl("div", ["container", "py-4"]);
  const row = createEl("div", ["row", "g-4"]);

  for (let char of jsondata.data.results) {
    row.appendChild(createCard(char));
  }

  container.appendChild(row);
  main.appendChild(container);
}

function createEl(tag, classes = [], text = "") {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = text;
  return element;
}

function createBadge(color, text) {
  return createEl("span", ["badge", `text-bg-${color}`, "me-1"], text);
}

function createCard(char) {
  const col = createEl("div", ["col-12", "col-sm-6", "col-lg-4", "col-xl-3"]);
  const card = createEl("div", ["card", "h-100", "shadow-sm"]);

  const img = createEl("img", ["card-img-top"]);
  img.setAttribute(
    "src",
    `${char.thumbnail.path}.${char.thumbnail.extension}`.replace("http://", "https://")
  );
  img.setAttribute("alt", char.name);

  const body = createEl("div", ["card-body"]);
  const title = createEl("h5", ["card-title"], char.name);
  const description = createEl(
    "p",
    ["card-text"],
    char.description.trim() || "No description available."
  );

  body.append(
    title,
    description,
    createBadge("danger", `Comics: ${char.comics.available}`),
    createBadge("primary", `Series: ${char.series.available}`),
    createBadge("secondary", `Stories: ${char.stories.available}`)
  );

    const accordion = createEl("div", ["accordion", "accordion-flush"]);
  accordion.id = `accordion-${char.id}`;
  accordion.append(
    createAccordionItem(char.id, "comics", "Comics", char.comics.items),
    createAccordionItem(char.id, "series", "Series", char.series.items)
  );
  card.append(img, body, accordion);
  col.appendChild(card);
  return col;
}

function createAccordionItem(id, type, title, items) {
  const item = createEl("div", ["accordion-item"]);

  const header = createEl("h2", ["accordion-header"]);
  header.id = `heading-${type}-${id}`;

  const button = createEl("button", ["accordion-button", "collapsed"], title);
  button.setAttribute("type", "button");
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#collapse-${type}-${id}`);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `collapse-${type}-${id}`);
  header.appendChild(button);

  const collapse = createEl("div", ["accordion-collapse", "collapse"]);
  collapse.id = `collapse-${type}-${id}`;
  collapse.setAttribute("aria-labelledby", header.id);
  collapse.setAttribute("data-bs-parent", `#accordion-${id}`);

  const list = createEl("ul", ["list-group", "list-group-flush"]);
  for (let i of items) {
    list.appendChild(createEl("li", ["list-group-item"], i.name));
  }
  collapse.appendChild(list);

  item.append(header, collapse);
  return item;
}

