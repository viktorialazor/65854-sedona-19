var button = document.querySelector(".js-menu-button");
var navigation = document.querySelector(".js-navigation");

button.addEventListener("click", function(evt){
  evt.preventDefault();

  navigation.classList.toggle("navigation--show");
  button.classList.toggle("header__button--active");
});
