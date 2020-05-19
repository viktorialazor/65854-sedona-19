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

function popUpInit() {
  var form = document.querySelector(".js-form");
  var formButton = document.querySelector(".js-form-button");
  var popUpSuccess = document.querySelector(".js-pop-up-success");
  var popUpError = document.querySelector(".js-pop-up-error");
  var popUpShow = "pop-up--show";
  var error = "error";
  var closeSuccess = document.querySelector(".js-close-success");
  var closeError = document.querySelector(".js-close-error");
  var telField = form.querySelector("[name=tel]");
  var emailField = form.querySelector("[name=mail]");

  formButton.addEventListener("click", function (evt) {
    if (!telField.value || !emailField.value) {
      !telField.value
        ? telField.classList.add(error)
        : telField.classList.remove(error);
      !emailField.value
        ? emailField.classList.add(error)
        : emailField.classList.remove(error);

      popUpError.classList.add(popUpShow);
    }
    else {
      evt.preventDefault();
      telField.classList.remove(error);
      emailField.classList.remove(error);
      popUpSuccess.classList.add(popUpShow);
    }
  });

  closeSuccess.addEventListener("click", function (evt) {
    evt.preventDefault();
    popUpSuccess.classList.remove(popUpShow);
  });

  closeError.addEventListener("click", function (evt) {
    evt.preventDefault();
    popUpError.classList.remove(popUpShow);
  });

};

popUpInit();
