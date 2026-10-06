const clock = document.querySelector('#clock');
const currdate = document.querySelector('#date');
const timezoneSelector = document.getElementById('timezone');

function updateTime() {
  let date = new Date();
  let selectedTimezone = timezoneSelector.value;

  let time = date.toLocaleTimeString('en-US', {
    timeZone: selectedTimezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  currdate.innerHTML = `Today's Date: ${date.toLocaleDateString('en-US', { timeZone: selectedTimezone })}`
  clock.innerHTML = time;
}

updateTime();
setInterval(updateTime, 1000);

timezoneSelector.addEventListener('change', updateTime);
