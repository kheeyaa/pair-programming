// DOM Nodes
const $calendar = document.querySelector('.calendar');
const $month = document.querySelector('.month');
const $year = document.querySelector('.year');
const $dates = document.querySelector('.calendar-dates');
const $prevBtn = document.querySelector('.calendar-btn.prev');
const $nextBtn = document.querySelector('.calendar-btn.next');
const $datePicker = document.querySelector('.date-picker');
const $calendarDates = document.querySelector('.calendar-dates');

// states
let selectedDateObj = new Date();
let selectedYear = +selectedDateObj.getFullYear();
let selectedMonth = +selectedDateObj.getMonth();
let selectedDate = selectedDateObj.getDate();

// functions
const getMonthName = dateObj =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj);

const setSelectedDateInfo = (year, month, date = selectedDate) => {
  selectedDateObj = new Date(year, month, date);
  [selectedYear, selectedMonth, selectedDate] = [year, month, date];
};

const setPrevMonthYear = () => {
  const prevMonth = selectedMonth > 0 ? selectedMonth - 1 : 11;
  const prevYear = prevMonth === 11 ? selectedYear - 1 : selectedYear;
  setSelectedDateInfo(prevYear, prevMonth);
};

const setNextMonthYear = () => {
  const nextMonth = selectedMonth < 11 ? selectedMonth + 1 : 0;
  const nextYear = nextMonth === 0 ? selectedYear + 1 : selectedYear;
  setSelectedDateInfo(nextYear, nextMonth);
};

const getLastDateOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const getLastDayOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDay();

const createDatesOfPrevMonth = (firstDayOfSelectedMonth, lastDateOfPrevMonth) =>
  Array(firstDayOfSelectedMonth)
    .fill()
    .map((_, idx) => ({
      year: selectedMonth === 0 ? selectedYear - 1 : selectedYear,
      month: selectedMonth === 0 ? 11 : selectedMonth - 1,
      date: lastDateOfPrevMonth - firstDayOfSelectedMonth + idx + 1,
      isSelectedMonth: false
    }));

const createDatesOfSelectedMonth = lastDateOfSelectedMonth =>
  Array(lastDateOfSelectedMonth)
    .fill()
    .map((_, idx) => ({
      year: selectedYear,
      month: selectedMonth,
      date: idx + 1,
      isSelectedMonth: true
    }));

const createDatesOfNextMonth = lastDayOfSelectedMonth =>
  lastDayOfSelectedMonth === 6
    ? []
    : Array(6 - lastDayOfSelectedMonth)
        .fill()
        .map((_, idx) => ({
          year: selectedMonth === 11 ? selectedYear + 1 : selectedYear,
          month: selectedMonth === 11 ? 0 : selectedMonth + 1,
          date: idx + 1,
          isSelectedMonth: false
        }));

const createCal = (
  firstDayOfSelectedMonth,
  lastDateOfPrevMonth,
  lastDateOfSelectedMonth,
  lastDayOfSelectedMonth
) =>
  [
    ...createDatesOfPrevMonth(firstDayOfSelectedMonth, lastDateOfPrevMonth),
    ...createDatesOfSelectedMonth(lastDateOfSelectedMonth),
    ...createDatesOfNextMonth(lastDayOfSelectedMonth)
  ]
    .map(
      ({ year, month, date, isSelectedMonth }, idx) => `
    <div class="date ${!(idx % 7) && isSelectedMonth ? 'sunday' : ''} ${
        isSelectedMonth ? '' : 'beforeMonth'
      } ${
        date === selectedDate && isSelectedMonth ? 'picked' : ''
      }" data-year="${year}" data-month="${month}" data-date="${date}">${date}</div>
    `
    )
    .join('');

const renderNav = () => {
  $month.innerHTML = getMonthName(selectedDateObj);
  $year.innerHTML = selectedYear;
};

const renderDates = () => {
  const firstDayOfSelectedMonth = getFirstDayOfMonth(
    selectedYear,
    selectedMonth
  );
  const lastDateOfPrevMonth = getLastDateOfMonth(
    selectedMonth === 0 ? selectedYear - 1 : selectedYear,
    selectedMonth === 0 ? 11 : selectedMonth - 1
  );
  const lastDateOfSelectedMonth = getLastDateOfMonth(
    selectedYear,
    selectedMonth
  );
  const lastDayOfSelectedMonth = getLastDayOfMonth(selectedYear, selectedMonth);

  $calendarDates.innerHTML = createCal(
    firstDayOfSelectedMonth,
    lastDateOfPrevMonth,
    lastDateOfSelectedMonth,
    lastDayOfSelectedMonth
  );
};

const renderCal = () => {
  renderNav();
  renderDates();
};

// event bindings
window.addEventListener('DOMContentLoaded', renderCal);

$datePicker.onfocus = () => {
  $calendar.classList.remove('hidden');
};

$prevBtn.onclick = () => {
  setPrevMonthYear();
  renderCal();
};

$nextBtn.onclick = () => {
  setNextMonthYear();
  renderCal();
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
