// DOM ------------------------------
const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $dates = document.querySelector('.calendar-dates');
const $prevBtn = document.querySelector('.calendar-btn.prev');
const $nextBtn = document.querySelector('.calendar-btn.next');

const $calendarDates = document.querySelector('.calendar-dates');

// value ------------------------------
const currentDateObj = new Date();
const currentYear = currentDateObj.getFullYear();
const currentMonth = currentDateObj.getMonth();
const currentDay = currentDateObj.getDay();
const currentDate = currentDateObj.getDate();

let selectedDateObj = new Date();
let selectedYear = +selectedDateObj.getFullYear();
let selectedMonth = +selectedDateObj.getMonth();
// const selectedDay = selectedDateObj.getDay();
// const selectedDate = selectedDateObj.getDate();

// function ------------------------------
const getMonthName = dateObj =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj);

const setSelectedDateInfo = (year, month) => {
  selectedYear = year;
  selectedMonth = month;
};

const getPrevMonth = () => {
  const prevMonth = selectedMonth > 0 ? selectedMonth - 1 : 11;
  const prevYear = prevMonth === 11 ? selectedYear - 1 : selectedYear;
  selectedDateObj = new Date(prevYear, prevMonth);
  setSelectedDateInfo(prevYear, prevMonth);
};

const getNextMonth = () => {
  const nextMonth = selectedMonth < 11 ? selectedMonth + 1 : 0;
  const nextYear = nextMonth === 0 ? selectedYear + 1 : selectedYear;
  selectedDateObj = new Date(nextYear, nextMonth);
  setSelectedDateInfo(nextYear, nextMonth);
};

const getLastDateOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const getLastDayOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDay();

const renderNav = dateObj => {
  $month.innerHTML = getMonthName(dateObj);
  $year.innerHTML = dateObj.getFullYear();
};

const createSelectedDatesHTML = (firstDay, lastDate) => {
  const firstSunday = 8 - firstDay;
  const dates = Array.from({ length: +lastDate }, (_, idx) => idx + 1);
  return dates
    .map(
      date => `
  <div class="date ${
    date % 7 === firstSunday % 7 ? 'sunday' : ''
  }">${date}</div>
  `
    )
    .join('');
};

// lastDate는 전달의 마지막 일수이다.
const createPrevDatesHTML = (firstDay, lastDate) => {
  const dates = Array.from(
    { length: +firstDay },
    (_, idx) => lastDate - +firstDay + idx + 1
  );
  return dates
    .map(
      date => `
    <div class="date beforeMonth">${date}</div>
    `
    )
    .join('');
};

const createNextDatesHTML = lastDay => {
  if (lastDay === 6) return '';
  const dates = Array.from({ length: 6 - lastDay }, (_, idx) => idx + 1);
  return dates
    .map(
      date => `
      <div class="date afterMonth">${date}</div>
      `
    )
    .join('');
};

const renderDates = () => {
  const lastDate = getLastDateOfMonth(selectedYear, selectedMonth);
  const lastDateOfPrevMonth = getLastDateOfMonth(
    selectedMonth === 0 ? selectedYear - 1 : selectedYear,
    selectedMonth === 0 ? 11 : selectedMonth - 1
  );
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
  const lastDay = getLastDayOfMonth(selectedYear, selectedMonth);

  $calendarDates.innerHTML =
    createPrevDatesHTML(firstDay, lastDateOfPrevMonth) +
    createSelectedDatesHTML(firstDay, lastDate) +
    createNextDatesHTML(lastDay);
};

const renderCal = () => {
  renderNav(currentDateObj);
  renderDates(currentDateObj);
};

// event ------------------------------
window.addEventListener('DOMContentLoaded', renderCal);
$prevBtn.onclick = () => {
  getPrevMonth();
  renderNav(selectedDateObj);
  renderDates(selectedDateObj);
};

$nextBtn.onclick = () => {
  getNextMonth();
  renderNav(selectedDateObj);
  renderDates(selectedDateObj);
};
