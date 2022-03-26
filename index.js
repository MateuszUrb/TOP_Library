// get current year for footer
function getCurrentYear() {
  const footer_year = document.querySelector(".footer__year");
  let d = new Date();
  const newYer = (footer_year.innerText = d.getFullYear());
  return newYer;
}
getCurrentYear();

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

let libArr = [];

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author) {
  libArr.push(new Book(title, author));
}
