function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  let seconds = String(newDate.getSeconds()).padStart(2, "0");

  //   if (seconds.toString().length === 1) {
  //     seconds = "0" + seconds;
  //   }

  //time.innerText = hours + ":" + minutes + ":" + seconds;
  time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();

setInterval(getTime, 1000);

function dayToday() {
  const today = document.querySelector(".today");

  const todays = new Date();

  let year = todays.getFullYear();
  let month = todays.getMonth();
  let day = todays.getDate();

  today.innerText = `${month + 1}-${day}-${year}`;
}

dayToday();
// function getToday() {
//   const today = document.querySelector(".today");

//   const newDates = new Date();

//   let dayToday = newDates.getToday();
//   let monthToday = newDates.getMonth();
//   let yearToday = newDates.getFullYear();

//   today.innerText = `${monthToday}. ${dayToday}. ${yearToday}`;
// }

// getToday();

// function getQuotes() {
//   const quotesMsg = document.querySelector(".quotesMsg");
//   let savedQuotes = localStorage.getItem("quotes");

//   if (!savedQuotes) {
//     localStorage.setItem("quotes", `It Ain't Over Till It's Over"`);

//     savedQuotes = localStorage.getItem("quotes");
//   }

//   quotesMsg.innerText = savedQuotes;
// }

const QUOTES = "quotes";

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "열심히 살자",
        "열씸히 살자",
        "한강 가자~",
        "한강물 너무 차갑다",
      ])
    );

    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "inline-block";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) {
    return;
  }
  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span>${newQuotesInput.value}</span>`;

  newQuotes.style.display = "none";
  newQuotesInput.value = "";
}

// const a = {
//   question: "질문입니다",
// };

// const b = {
//   question: question,
// };

// const c = {
//   question,
// };

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");

  if (!searchInput.value) return;
  if (isLoading) return;

  isLoading = true;
  const question = searchInput.value;

  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요.";

  console.log("동작중");

  //frontend -> backend
  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  isLoading = false;
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }
}
