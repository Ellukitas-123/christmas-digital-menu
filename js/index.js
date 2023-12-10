const foodContainer = $("#food-container");
const foodTemplate = `<div class="food">
<img
  class="display"
  src="#IMAGE#"
/>
<div class="info">
  <h4>#NAME#</h4>
  <div class="progress">
    <span class="icon-clock"></span>
    <div class="progress-bar">
      <div class="bar"></div>
    </div>
  </div>
</div>
</div>`;

displayMenu();

async function displayMenu() {
  const menu = await (await fetch("./menu.json")).json();

  menu.forEach((food) => {
    const foodElement = foodTemplate
      .replace("#IMAGE#", food.image)
      .replace("#NAME#", food.name);
    foodContainer.append(foodElement);
  });
}
