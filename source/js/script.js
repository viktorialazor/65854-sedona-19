var button = document.querySelector(".js-menu-button");
var navigation = document.querySelector(".js-navigation");

button.addEventListener("click", function(evt){
  evt.preventDefault();

  if(navigation.classList.contains("navigation--show")) {
    navigation.classList.remove("navigation--show");
    navigation.classList.add("navigation--hide");
    button.classList.remove("header__button--active");
  } else {
    navigation.classList.remove("navigation--hide");
    navigation.classList.add("navigation--show");
    button.classList.add("header__button--active");
  }
});
