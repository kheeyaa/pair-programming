// DOM ------------------------------
const $calendar = document.querySelector('.calendar');
const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $dates = document.querySelector('.calendar-dates');
const $prevBtn = document.querySelector('.calendar-btn.prev');
const $nextBtn = document.querySelector('.calendar-btn.next');
const $datePicker = document.querySelector('.date-picker');
const $calendarDates = document.querySelector('.calendar-dates');

// value ------------------------------
let selectedDateObj = new Date();
let selectedYear = +selectedDateObj.getFullYear();
let selectedMonth = +selectedDateObj.getMonth();
// const selectedDay = selectedDateObj.getDay();
let selectedDate = selectedDateObj.getDate();

// function ------------------------------
const getMonthName = dateObj =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj);

const setSelectedDateInfo = (year, month, date = selectedDate) => {
  selectedDateObj = new Date(year, month, date);
  selectedYear = year;
  selectedMonth = month;
  selectedDate = date;
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

// const isEqualDate = (date1, date2) => +date1 === +date2;

const createSelectedDatesHTML = (firstDay, lastDate) => {
  const firstSunday = 8 - firstDay;
  const dates = Array.from({ length: +lastDate }, (_, idx) => idx + 1);
  return dates
    .map(
      date => `
  <div class="date ${date % 7 === firstSunday % 7 ? 'sunday' : ''} ${
        date === selectedDate ? 'picked' : ''
      }" data-year="${selectedYear}" data-month="${selectedMonth}" data-date="${date}">${date}</div>
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
    <div class="date beforeMonth" data-year="${
      selectedMonth === 0 ? selectedYear - 1 : selectedYear
    }" data-month="${
        selectedMonth === 0 ? 11 : selectedMonth - 1
      }" data-date="${date}">${date}</div>
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
      <div class="date afterMonth" data-year="${
        selectedMonth === 11 ? selectedYear + 1 : selectedYear
      }" data-month="${
        selectedMonth === 11 ? 0 : selectedMonth + 1
      }" data-date="${date}">${date}</div>
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
  renderNav(selectedDateObj);
  renderDates(selectedDateObj);
};

// event ------------------------------

window.addEventListener('DOMContentLoaded', renderCal);

$datePicker.onfocus = () => {
  $calendar.classList.remove('hidden');
};

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

window.onclick = e => {
  if (
    !e.target.closest('.calendar') &&
    !e.target.classList.contains('date-picker')
  )
    $calendar.classList.add('hidden');
};

$dates.onclick = e => {
  if (!e.target.classList.contains('date')) return;
  const selected = e.target.dataset;
  const { year, month, date } = selected;

  setSelectedDateInfo(+year, +month, +date);
  renderCal();

  $datePicker.value = `${year}-${month > 8 ? +month + 1 : '0' + (+month + 1)}-${
    date > 9 ? date : '0' + date
  }`;
  $calendar.classList.add('hidden');
};
