const override = $("#override");
const foodContainer = $("#food-container");
const foodTemplate = `<div class="food">
<img
  class="display"
  src="#IMAGE#"
  id="#NAME#"
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
    const foodHTML = foodTemplate
      .replace("#IMAGE#", food.image)
      .replace(/#NAME#/g, food.name);
    const foodElement = $(foodHTML);

    foodElement.on("click", () => {
      const element = $(foodHTML);

      element.css({
        position: "fixed",
        top: foodElement.offset().top,
        left: foodElement.offset().left,
        zIndex: 5,
        width: foodElement.innerWidth(),
        height: foodElement.innerHeight(),
      });
      override.append(element);
      element.animate(
        {
          top: "1rem",
          left: "1rem",
          width: window.innerWidth - 32,
          height: window.innerHeight - 32,
        },
        () => {
          element.css({ flexDirection: "column" });
        }
      );
      element.find(".display").animate({
        width: "100%",
        height: "25%",
      });
    });

    foodContainer.append(foodElement);
  });
}
