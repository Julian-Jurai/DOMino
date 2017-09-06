export const handleStyle = (value) => {

  function clearClassName() {
    $l("#todo-input-title").removeAllClasses();
    $l("#todo-textarea-body").removeAllClasses();
    $l("#submit-todo").removeAllClasses();
    $l("#form-container").removeAllClasses();
    $l("#main-container").removeAllClasses();
    $l("#todo-list").removeAllClasses();
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
  }
  if (value === "5" ){
    clearClassName();
    // $l("#todo-input").addClass("text-input-style-1");
  }
};
