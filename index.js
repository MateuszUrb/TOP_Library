const main = document.querySelector(".main");
const form = document.querySelector(".modal_form");
// get current year for footer
function getCurrentYear() {
  const footer_year = document.querySelector(".footer__year");
  let d = new Date();
  const newYer = (footer_year.innerText = d.getFullYear());
  return newYer;
}
getCurrentYear();

let libArr = [];

// open modal window form
const openModal = document.querySelector("[data-modal]");
openModal.addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.querySelector(".modal");
  const modal_container = document.querySelector(".modal-container");
  modal_container.classList.add("active");
  modal.classList.add("open");
  const exits = document.querySelectorAll(".modal-exit");
  exits.forEach((exit) => {
    exit.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.remove("open");
      modal_container.classList.remove("active");
    });
  });
});

// Loop through the libArr array until finding book to remove on screen and within the array.
libArr.map((value, index) => {
  let authorElement = bookContainerDiv.childNodes[1].innerHTML.slice(3);
  if (libArr[index].author === authorElement) {
    libArr.splice(index, 1);
  }
});

function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let book = {
    id: Date.now(),
    title: document.querySelector("#book_title").value,
    author: document.querySelector("#book_author").value,
    pages: document.querySelector("#book_pages").value,
    read: document.querySelector("#book_read").checked,
  };
  newBook = new Book(book.id, book.title, book.author, book.pages, book.read);
  libArr.push(newBook);
  displayBooks(newBook);
  form.reset();
  // main.innerHTML = "";
  // add book to local storage
  window.localStorage.clear();
  window.localStorage.setItem("TOP_Library", JSON.stringify(libArr));

  const modal = document.querySelector(".modal");
  const modal_container = document.querySelector(".modal-container");
  modal.classList.remove("open");
  modal_container.classList.remove("active");
});

function displayBooks(book) {
  let cta__removeBtn = document.createElement("button");
  let cta__readBtn = document.createElement("button");
  let cardContainer = document.createElement("article");

  cta__removeBtn.innerText = "remove";
  cta__removeBtn.setAttribute("type", "button");
  cta__removeBtn.classList.add("cta__remove");

  cta__readBtn.classList.add("cta__read");
  cta__readBtn.setAttribute("type", "button");
  cta__readBtn.style = `background-color: var(${
    book.isRead ? "--read" : "--notRead"
  })`;
  cta__readBtn.innerText = `${book.isRead ? "read" : "not read"}`;

  cta__readBtn.setAttribute("type", "button");

  cardContainer.classList.add("book__card");
  cardContainer.setAttribute("data-id", book.id);

  main.appendChild(cardContainer);

  let pTag = document.createElement("p");
  let bookCta = document.createElement("div");
  let bookDetails = document.createElement("div");
  let spanPages = document.createElement("span");
  let bookTitle = document.createElement("h2");
  let bookAuthor = document.createElement("h3");

  bookTitle.classList.add("book__title");
  bookTitle.innerText = book.title;

  bookAuthor.classList.add("book__author");
  bookAuthor.innerText = book.author;

  bookDetails.classList.add("book__info");
  bookCta.classList.add("book__cta");

  pTag.classList.add("book__pages");
  pTag.innerText = " pages";

  spanPages.classList.add("book__pages--number");
  spanPages.innerText = book.pages;

  bookDetails.appendChild(bookTitle);
  bookDetails.appendChild(bookAuthor);

  pTag.appendChild(spanPages);
  bookDetails.appendChild(pTag);
  cardContainer.appendChild(bookDetails);
  cardContainer.appendChild(bookCta);
  bookCta.appendChild(cta__readBtn);
  bookCta.appendChild(cta__removeBtn);

  let browserStorage = JSON.parse(localStorage.getItem("Top_library"));

  cta__removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let bookId = e.target.parentNode.parentNode.getAttribute("data-id");
    let bookIndex = libArr.findIndex((book) => book.id === bookId);
    libArr.splice(bookIndex, 1);
    e.target.parentNode.parentNode.remove();
    window.localStorage.clear();
    window.localStorage.setItem("Top_library", JSON.stringify(libArr));
  });

  cta__readBtn.addEventListener("click", (event) => {
    const backgroundColor = event.target.style.backgroundColor;

    if (backgroundColor === "var(--read)") {
      event.target.style.backgroundColor = "var(--notRead)";
      event.target.innerText = "not read";
    } else {
      event.target.style.backgroundColor = "var(--read)";
      event.target.innerText = "read";
    }


  });

  cta__removeBtn.addEventListener("click", () => {});
}
