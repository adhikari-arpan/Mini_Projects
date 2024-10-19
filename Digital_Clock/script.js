const clock = document.querySelector('#clock');
const currdate = document.querySelector('#date');
const timezoneSelector = document.getElementById('timezone');

setInterval(function(){
    let date = new Date();
    let selectedTimezone = timezoneSelector.value;

  let time = date.toLocaleTimeString('en-US', {
    timeZone: selectedTimezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  currdate.innerHTML = `Today's Date: ${date.toLocaleDateString()}`
  clock.innerHTML = time;

},1000)

timezoneSelector.addEventListener('change', updateTime);

