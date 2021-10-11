// addEventListener(DOMContentLoaded, getPresentTime);

const getPresentTime = setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  console.log(hour, minute, second);
}, 1000);
