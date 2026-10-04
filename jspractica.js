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
  body.appendChild(createEl("h5", ["card-title"], char.name));

  card.append(img, body);
  col.appendChild(card);
  return col;
}
