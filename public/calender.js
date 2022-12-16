// calendar //

const date = new Date();

const renderCal = () => {
    
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const lastDayInd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthDays = document.querySelector('.days');
  const firstDay = date.getDay();
  const nextDays = 7 - lastDayInd - 1;
  
  document.querySelector('.date h1').innerHTML = month[date.getMonth()];
  document.querySelector('.date p').innerHTML = new Date().toDateString();
  
  let days = "";
  
  for(let x = firstDay; x > 0; x--){
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
  }
  
  for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
      days += `<div class="today">${i}</div>`
    } else{
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++){
    days += `<div class="next-date">${j}</div>`
  }
  monthDays.innerHTML = days;
}

document.querySelector(".prev").addEventListener("click",() =>{
  lastmonth = date.getMonth() - 1;
  date.setMonth(lastmonth);
  renderCal();
})

document.querySelector(".next").addEventListener("click",() =>{
  nextmonth = date.getMonth() + 1;
  date.setMonth(nextmonth);
  renderCal();
})

renderCal();