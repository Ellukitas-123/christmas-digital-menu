const override = $("#override");
const foodContainer = $("#food-container");
const foodTemplate = `<div class="food" id="#NAME#">
<img
  class="display"
  src="#IMAGE#"
/>
<div class="info">
  <h4>#NAME#</h4>
  <div class="progress">
    <span class="icon-clock"></span>
    <div class="progress-bar">
      <div class="bar" style="width: 0%;"></div>
    </div>
  </div>
</div>
</div>`;
let menu = {};

displayMenu();

async function displayMenu() {
  menu = await (await fetch("./menu.json")).json();

  menu.forEach((food) => {
    const foodHTML = foodTemplate
      .replace("#IMAGE#", food.image)
      .replace(/#NAME#/g, food.name);
    const foodElement = $(foodHTML);

    foodContainer.append(foodElement);
  });
}

setInterval(() => {
  const foods = $(".food");
  console.log(foods);
  foods.each((index, food) => {
    const foodElement = $(food);
    const foodProgress = foodElement.find(".bar");

    const start = new Date(menu[index].start).getTime();
    const eat = new Date(menu[index].eat).getTime();
    const end = new Date(menu[index].end).getTime();
    const currentTime = new Date().getTime();
    let percentage = 100;
    let color = "#c6b173";

    if (currentTime >= end) {
      // Ended
      console.log("Ended");
      percentage = 100;
      color = "#891515";
    } else if (currentTime >= eat) {
      // Eating
      percentage = 100 - ((end - currentTime) / (end - eat)) * 100;
      color = "#294221";
    } else if (currentTime >= start) {
      // Preparing
      percentage = 100 - ((eat - currentTime) / (eat - start)) * 100;
      color = "#385025";
    }

    foodProgress.css({ width: `${percentage}%`, backgroundColor: color });
  });
}, 1000);
