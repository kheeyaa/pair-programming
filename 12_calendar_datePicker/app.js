// DOM ------------------------------
const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $dates = document.querySelector('.calendar-dates');

// value ------------------------------
const currentDateObj = new Date();
const currentYear = currentDateObj.getFullYear();
const currentMonth = currentDateObj.getMonth();
const currentDay = currentDateObj.getDay();
const currentDate = currentDateObj.getDate();

const selectedDateObj = new Date();
const selectedYear = selectedDateObj.getFullYear();
const selectedMonth = selectedDateObj.getMonth();
const selectedDay = selectedDateObj.getDay();
const selectedDate = selectedDateObj.getDate();

// function ------------------------------
const getMonthName = dateObj =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj);

const renderNav = dateObj => {
  $month.innerHTML = getMonthName(dateObj);
  $year.innerHTML = dateObj.getFullYear();
};

const renderDates = dateObj => {};

const renderCal = () => {
  renderNav(currentDateObj);
  renderDates(currentDateObj);
};

// event ------------------------------
window.addEventListener('DOMContentLoaded', renderCal);
