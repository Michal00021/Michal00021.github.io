const quotes = [
 "Jesteś dla mnie najważniejsza",
 "Chciałbym z Tobą spędzić resztę dni 👉👈",
 "Po prostu Cię kocham najmocniej na świecie",
 "Myślę o Tobie codziennie",
 "Każdy dzień z Tobą jest wyjątkowy",
 "Jesteś moim promyczkiem 🖤",
 "Uwielbiam każdy moment spędzony z Tobą",
 "Jesteś piękna!",
 "Jesteś dla mnie najważniejsza!",
 "Jesteś słoda.",
 "Uwielbiam Twój uśmiech",
 "Dziękuje, że jesteś obecna w moim życiu",
 "Każda chwila z Tobą jest cenniejsza niż złoto.",
 "Razem możemy wszystko.",
 "Nie ma słów, które wyrażą, jak wiele dla mnie znaczysz.",
];

function loadQuote() {
 const today = new Date();
 const startOfDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
 );
 const baseDate = new Date("2024-01-01");
 const dayDifference = Math.floor(
  (startOfDay - baseDate) / (1000 * 60 * 60 * 24)
 );
 const randomQuoteIndex = dayDifference % quotes.length;
 document.getElementById("quote").textContent = quotes[randomQuoteIndex];
}

function countDays() {
 const startDate = new Date("2024-08-27");
 const today = new Date();
 const timeDiff = today - startDate;
 const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

 const monthsDiff = Math.floor(daysDiff / 30);

 document.getElementById(
  "counter"
 ).textContent = `Jesteśmy już razem od ${daysDiff} dni!`;

 let message = "To piękne!";

 if (monthsDiff > 0) {
  message += ` To już ${monthsDiff} ${
   monthsDiff === 1 ? "miesiąc" : "miesiące"
  } razem! 🎉`;
 }
 document.getElementById("message").textContent = message;
}

loadQuote();
countDays();
