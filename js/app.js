const lightBtn = document.querySelector(".light-btn");
const main = document.querySelector("main");
const titleElem = document.querySelector(".title");
const generateBtn = document.querySelector(".generate__btn");
const listBtn = document.querySelector(".list__numbers");
const ulElem = document.querySelector(".generate__numbers ul");
const addPhone = document.querySelector(".add_phone");

const TEL_KEY = "tel_numbers";
let TEL = getFromLocalStorage(TEL_KEY) || [
  "+998 91 999 77 81",
  "+998 99 190 84 50",
  "+998 90 007 70 77",
  "+998 94 115 11 58",
  "+998 93 163 16 21",
  "+998 95 009 13 50",
  "+998 94 441 41 88",
  "+998 93 880 05 71",
  "+998 99 418 50 35",
  "+998 88 727 31 11",
];

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

addPhone.addEventListener("click", () => {
  ulElem.style.display = "none";
  let input = prompt("Enter phone number (+998 93 163 16 21)");
  if (!input.startsWith("+998 ") || input.length !== 17) {
    alert("Phone number entered in invalid format!");
  } else {
    TEL.push(input);
    alert("Number successfully saved");
    saveToLocalStorage(TEL_KEY, TEL);
  }
});

lightBtn.addEventListener("click", () => {
  main.classList.toggle("light");
  const icon = lightBtn.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

listBtn.addEventListener("click", () => {
  if (TEL.length === 0) {
    alert("No phone numbers found");
  }

  ulElem.style.display = ulElem.style.display === "block" ? "none" : "block";
  listBtn.textContent =
    ulElem.style.display === "block" ? "Close" : "List of numbers";

  ulElem.innerHTML = "";
  TEL.forEach((number, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${number}`;
    li.style.cssText =
      "color: white; font-size: 18px; padding: 10px; border-bottom: 1px solid white;";
    ulElem.appendChild(li);
  });
});

function randomTel() {
  if (TEL.length === 0) {
    alert("No more numbers available!");
    return;
  }

  generateBtn.setAttribute("disabled", true);

  const intervalId = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * TEL.length);
    titleElem.textContent = TEL[randomNumber];
  }, 100);

  setTimeout(() => {
    clearInterval(intervalId);
    generateBtn.removeAttribute("disabled");

    const selectedIndex = TEL.indexOf(titleElem.textContent);
    if (selectedIndex !== -1) {
      TEL.splice(selectedIndex, 1);
      saveToLocalStorage(TEL_KEY, TEL);
    }
  }, 2500);
}

generateBtn.addEventListener("click", randomTel);
