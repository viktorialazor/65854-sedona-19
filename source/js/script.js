function headerMenu() {
  var headerButton = document.querySelector(".js-menu-button");
  var headerNavigation = document.querySelector(".js-navigation");

  headerNavigation.classList.add("navigation--hide");
  headerButton.classList.remove("header__button--hide");
  headerButton.classList.add("header__button--closed");

  headerButton.addEventListener("click", function(evt){
    evt.preventDefault();

    headerNavigation.classList.toggle("navigation--hide");
    headerButton.classList.toggle("header__button--closed");
  });
};

headerMenu();
