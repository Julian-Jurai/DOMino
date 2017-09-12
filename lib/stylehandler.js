export const handleStyle = (value) => {

  function clearClassName() {
    $l("#todo-input-title").removeAllClasses();
    $l("#todo-textarea-body").removeAllClasses();
    $l("#submit-todo").removeAllClasses();
    $l("#form-container").removeAllClasses();
    $l("#main-container").removeAllClasses();
    $l("#todo-list").removeAllClasses();
    $l("body").removeAllClasses("background");
    $l("#slider-container").removeAllClasses("slider");
    $l("#gif-container").removeAllClasses("gif-container")
  }

  if (value === "0" ){
    clearClassName();
  }
  if (value === "1" ){
    clearClassName();
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#todo-input-body").addClass("text-input-style-1");
  }
  if (value === "2" ){
    clearClassName();
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#submit-todo").addClass("submit-button");
  }
  if (value === "3" ){
    clearClassName();
    $l("#form-container ").addClass("form-container");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#submit-todo").addClass("submit-button");
  }
  if (value === "4" ){
    clearClassName();
    $l("#form-container ").addClass("form-container");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#submit-todo").addClass("submit-button");
    $l("#todo-list").addClass("list-style");
    $l("#main-container").addClass("main-container");
    $l("#gif-container").addClass("gif-container");
  }
  if (value === "5" ){
    clearClassName();
    $l("#form-container ").addClass("form-container");
    $l("#todo-textarea-body").addClass("textarea-style");
    $l("#todo-input-title").addClass("text-input-style-1");
    $l("#submit-todo").addClass("submit-button");
    $l("#todo-list").addClass("list-style");
    $l("#main-container").addClass("main-container");
    $l("body").addClass("background");
    $l("#slider-container").addClass("slider");
    $l("#gif-container").addClass("gif-container");
  }
};
