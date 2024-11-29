var siteNameInpt = document.getElementById("siteName");
var urlInpt = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var tbody = document.querySelector("tbody");
var tr = document.querySelectorAll("tbody tr");

var bookMark = [];
if (localStorage.getItem("Data")) {
  displayData(JSON.parse(localStorage.getItem("Data")));
}
siteNameInpt.addEventListener("input", function () {
  if (siteNameInpt.value.length < 3||siteNameInpt.value.includes(" ")) {
    siteNameInpt.classList.add("is-invalid");
  } else {
    siteNameInpt.classList.remove("is-invalid");
    siteNameInpt.classList.add("is-valid");
  }
});

urlInpt.addEventListener("input", function () {
  var valid = isValidUrl(urlInpt.value);
  console.log(valid);
  if (valid === false) {
    urlInpt.classList.add("is-invalid");
  } else {
    urlInpt.classList.remove("is-invalid");
    urlInpt.classList.add("is-valid");
  }
});
function isValidUrl(value) {
  var pattern = /(https?:\/\/www\.)?\w+(\.com?)/;
  return pattern.test(value);
}
document.forms[0].addEventListener("submit", function (e) {
  e.preventDefault();
});

submit.addEventListener("click", function () {
  sameName(siteNameInpt.value);
  if (
    urlInpt.value === "" ||
    siteNameInpt.value === "" ||
    isValidUrl(urlInpt.value) === false ||
    siteNameInpt.classList.contains("is-invalid")
  ) {
    displayModelError();
  } else if (sameName(siteNameInpt.value) === true) {
    modelSameNameErorr();
  } else {
    addToArray();
    displayData(bookMark);
  }
  clear();
});
function clear() {
  urlInpt.value = "";
  siteNameInpt.value = "";
}
function addToArray() {
  var info = {
    name: siteNameInpt.value,
    url: urlInpt.value,
  };
  bookMark.push(info);
  localStorage.setItem("Data", JSON.stringify(bookMark));
}
function displayData(bookMark) {
  tbody.innerHTML = "";
  for (var i = 0; i < bookMark.length; i++) {
    tbody.innerHTML += ` <tr id="${i}">
      <td>${i + 1}</td>
      <td>${bookMark[i].name}</td>
      <td>
        <a href="${
          bookMark[i].url.includes("https://www.")
            ? bookMark[i].url
            : "https://www." + bookMark[i].url
        }" target=_blank class="btn btn-outline-success">
          <i class="fa-solid fa-eye pe-2"></i>Visit</a
        >
      </td>
      <td>
        <button href="#" class="btn btn-outline-danger delete" id="${i}">
          <i class="fa-solid fa-trash-can pe-2"></i>Delete</button
        >
      </td>
  </tr>`;
  }
}
tbody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    deleteData(e.target.id);
  }
});
function deleteData(index) {
  bookMark.splice(index, 1);
  displayData(bookMark);
  localStorage.setItem("Data", JSON.stringify(bookMark));
}
function displayModelError() {
  swal({
    title: "Site Name or URL is not valid Please follow the rules below:",
    text: `Site name must contain at least 3 characters
        Site URL must be a valid one
    `,
    icon: "error",
  });
}
function sameName(value) {
  for (var i = 0; i < bookMark.length; i++) {
    if (bookMark[i].name === value) {
      return true;
    } else {
      return false;
    }
  }
}
function modelSameNameErorr() {
  swal({
    title: "Site Name is really exist",
    text: `Site name must not be repeated
    `,
    icon: "error",
  });
}
