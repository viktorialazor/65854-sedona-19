var button = document.querySelector(".js-menu-button");
var navigation = document.querySelector(".js-navigation");

navigation.classList.add("navigation--hide");
button.classList.remove("header__button--hide");
button.classList.add("header__button--closed");

button.addEventListener("click", function(evt){
  evt.preventDefault();

  navigation.classList.toggle("navigation--hide");
  button.classList.toggle("header__button--closed");
});
