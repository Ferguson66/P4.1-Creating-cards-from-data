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

// Get the main element, clear it and show one card for each hero
function renderCards(jsondata) {
  const main = document.querySelector("main");
  main.innerHTML = ""; // cleans off the accordion of example

  const container = createEl("div", ["container", "py-4"]);
  const row = createEl("div", ["row", "g-4"]);

  for (let char of jsondata.data.results) {
    row.appendChild(createCard(char));
  }

  container.appendChild(row);
  main.appendChild(container);
}

// Create an element with classes and text
function createEl(tag, classes = [], text = "") {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = text;
  return element;
}

// Create a Bootstrap badge with a color and a text
function createBadge(color, text) {
  return createEl("span", ["badge", `text-bg-${color}`, "me-1"], text);
}

// Create one card for one hero
function createCard(char) {
  const col = createEl("div", ["col-12", "col-sm-6", "col-lg-4", "col-xl-3"]);
  const card = createEl("div", ["card", "h-100", "shadow-sm"]);

  const img = createEl("img", ["card-img-top"]); // Image of the hero
  img.setAttribute(
    "src",
    `${char.thumbnail.path}.${char.thumbnail.extension}`.replace(
      "http://",
      "https://",
    ),
  );
  img.setAttribute("alt", char.name);

  // Same height for all images
  img.style.height = "250px";
  img.style.objectFit = "cover";

  const body = createEl("div", ["card-body"]); // Card body: name, description and badges
  const title = createEl("h5", ["card-title"], char.name);
  const description = createEl(
    "p",
    ["card-text"],
    char.description.trim() || "No description available.",
  );

  body.append(
    title,
    description,
    createBadge("danger", `Comics: ${char.comics.available}`),
    createBadge("primary", `Series: ${char.series.available}`),
    createBadge("secondary", `Stories: ${char.stories.available}`),
  );

  const accordion = createEl("div", ["accordion", "accordion-flush"]); // Accordion with comics and series
  accordion.id = `accordion-${char.id}`;
  accordion.append(
    createAccordionItem(char.id, "comics", "Comics", char.comics.items),
    createAccordionItem(char.id, "series", "Series", char.series.items),
  );
  card.append(img, body, accordion); // Put everything inside the card
  col.appendChild(card);
  return col;
}

// Create one accordion item (comics or series) with unique ids
function createAccordionItem(id, type, title, items) {
  const item = createEl("div", ["accordion-item"]);

  const header = createEl("h2", ["accordion-header"]);
  header.id = `heading-${type}-${id}`;

  const button = createEl("button", ["accordion-button", "collapsed"], title); // Button that opens and closes the item
  button.setAttribute("type", "button");
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#collapse-${type}-${id}`);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `collapse-${type}-${id}`);
  header.appendChild(button);

  const collapse = createEl("div", ["accordion-collapse", "collapse"]); // Hidden content of the item
  collapse.id = `collapse-${type}-${id}`;
  collapse.setAttribute("aria-labelledby", header.id);
  collapse.setAttribute("data-bs-parent", `#accordion-${id}`);

  const list = createEl("ul", ["list-group", "list-group-flush"]); // List of names, or a message if there is no data
  if (items.length) {
    for (let i of items) {
      list.appendChild(createEl("li", ["list-group-item"], i.name));
    }
  } else {
    list.appendChild(createEl("li", ["list-group-item"], "No data available"));
  }
  collapse.appendChild(list);

  item.append(header, collapse);
  return item;
}
