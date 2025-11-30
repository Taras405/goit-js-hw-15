const refs = {
  bookmarkApp: document.querySelector("#bookmarkApp"),
  bookmarkInput: document.querySelector("#bookmarkInput"),
  addBookmarkBtn: document.querySelector("#addBookmarkBtn"),
  bookmarkList: document.querySelector("#bookmarkList"),
};

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
  refs.bookmarkList.innerHTML = "";
  bookmarks.forEach((url, index) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = url;
    link.textContent = url;
    link.target = "_blank";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", () => {
      const newUrl = prompt("Введіть новий URL:", url);
      if (newUrl) {
        bookmarks[index] = newUrl;
        saveBookmarks();
        renderBookmarks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => {
      bookmarks.splice(index, 1);
      saveBookmarks();
      renderBookmarks();
    });

    li.appendChild(link);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    refs.bookmarkList.appendChild(li);
  });
}

function saveBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

refs.addBookmarkBtn.addEventListener("click", () => {
  const url = refs.bookmarkInput.value.trim();
  if (url) {
    bookmarks.push(url);
    saveBookmarks();
    renderBookmarks();
    refs.bookmarkInput.value = "";
  }
});

renderBookmarks();
//
//
//
const refs2 = {
  username: document.querySelector("#username"),
  password: document.querySelector("#password"),
  saveBtn: document.querySelector("#saveBtn"),
};

function loadFormData() {
  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");

  if (savedUsername) {
    refs2.username.value = savedUsername;
  }
  if (savedPassword) {
    refs2.password.value = savedPassword;
  }
}

function saveFormData() {
  localStorage.setItem("username", refs2.username.value);
  localStorage.setItem("password", refs2.password.value);
  alert("Дані збережено");
}

refs2.saveBtn.addEventListener("click", saveFormData);

loadFormData();
//
//
//
import makeProductsMarkup from "../templates/template.hbs";
import { products } from "../js/data.js";

const container = document.querySelector(".product__placeholder");
const searchInput = document.querySelector("#searchInput");

function renderProducts(list) {
  const productMarkup = makeProductsMarkup(list);
  container.innerHTML = productMarkup;
}

renderProducts(products);

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});
