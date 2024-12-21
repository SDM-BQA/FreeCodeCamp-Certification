const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");

let price = 19.5;
let cid = [
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// function to update html element with needed change
const updateChangeDueElement = (change) => {
  if (change.every((noteOrCoin) => noteOrCoin === 0)) {
    changeDueElement.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }
  for (let i = cid.length - 1; i >= 0; i--) {
    if (change[i] > 0) {
      changeDueElement.innerHTML += `<p>${cid[i][0]}: $${change[i]}</p>`;
    }
  }
};

const isChangePossible = (changeDue, change) => {
  const c1 = change.reduce((acc, el) => acc + el, 0);
  return c1 >= changeDue;
};

// function to calculate change due
const getChange = (changeDue) => {
  const notesAndCoins = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  const change = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    let available = Number((cid[i][1] / notesAndCoins[i]).toFixed(2)); 
    let needed = Math.floor(changeDue / notesAndCoins[i]); 

    if (changeDue >= notesAndCoins[i] && available > 0) {
      let toPush = Math.min(needed, available); 
      cid[i][1] -= notesAndCoins[i] * toPush; 
      changeDue = (changeDue - (notesAndCoins[i] * toPush)).toFixed(2); 
      change.unshift(Number((toPush * notesAndCoins[i]).toFixed(2)));
    } else {
      change.unshift(0);
    }
  }

  if (changeDue > 0) { 
    changeDueElement.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`; 
  } else {
    updateChangeDueElement(change);
  }
};


purchaseBtn.addEventListener("click", () => {
  // check if #cash input is empty
  if (!cashInput.value) { return; }

  // use 2 digit precision in variables
  const cash = Number(cashInput.value).toFixed(2);
  const changeDue = Number(cash - price).toFixed(2);
  const cashInDrawer = Number(cid.reduce(
      (acc, elem) => acc + elem[1], 0
    ).toFixed(2));

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash == price) {
    changeDueElement.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
  } else if (cashInDrawer < changeDue) {
    changeDueElement.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  } else if (cashInDrawer == changeDue) {
    changeDueElement.innerHTML = `<p>Status: CLOSED</p>`;
    getChange(changeDue);
  } else {
    changeDueElement.innerHTML = `<p>Status: OPEN</p>`;
    getChange(changeDue);
  }
});