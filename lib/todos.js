export const createTodoListItem = (titleValue, bodyValue) => {
  $l('#todo-list').append(
    `<li>
    <h2>${titleValue}</h2>
    <p>${bodyValue}</p>
    </li>`
  );
};
