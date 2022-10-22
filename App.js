const addUserBtn = document.getElementById("add-user");
const mainData = document.getElementById("main");
const doubleMoneyBtn = document.getElementById("double");
const showMillionBtn = document.getElementById("show-millionaires");
const calculateWealthBtn = document.getElementById("calculate-wealth");
const sortByRichBtn = document.getElementById("sort");
let data = [];

getData();
getData();
getData();

async function getData() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100),
  };
  addUser(newUser);
}
function DoubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function showMillionaires() {
  data = data.filter((user) => user.money > 50);
  updateDOM();
}
function calcWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  console.log(wealth);
  const wealthDiv = document.createElement("div");
  wealthDiv.innerHTML = `<h2>Total Wealth ${formatMoney(wealth)}</h2>`;
  main.appendChild(wealthDiv);
}
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function addUser(obj) {
  data.push(obj);
  updateDOM();
}
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  providedData.map((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<h2><strong> ${item.name}</strong> ${item.money}</h2>`;
    main.appendChild(element);
  });
}

addUserBtn.addEventListener("click", getData);
doubleMoneyBtn.addEventListener("click", DoubleMoney);
showMillionBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calcWealth);
sortByRichBtn.addEventListener("click", sortByRichest);
