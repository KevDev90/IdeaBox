var ideaLog = [];
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('.card-section');
var userForm = document.querySelector('.user-input');

onload = saveButton.classList.add("disabled-save-btn");
onload = saveButton.disabled = true;
userForm.addEventListener('keyup', validateUserInput);
saveButton.addEventListener('click', addPastIdea);

function validateUserInput() {
  if (bodyInput.value && titleInput.value != "") {
    saveButton.classList.remove("disabled-save-btn");
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
    saveButton.classList.add("disabled-save-btn");
  }
}

function createInstance() {
  var pastIdea = new Idea(titleInput.value, bodyInput.value);
  ideaLog.push(pastIdea);
  return pastIdea;
};

function addPastIdea() {
  var newIdea = createInstance();
  makeCard(newIdea);
  clearForm();
}

function makeCard(newIdea) {
  cardSection.insertAdjacentHTML('beforeend', `<div id="${newIdea.id}" class="card">
      <header>
        <button class="card-button" type="button">
          <img class="card-icon" src="images/star-active.svg" alt="Star icon"/>
        </button>
        <button class="card-button" type="button">
          <img class="card-icon" src="images/delete.svg" alt="Delete icon"/>
        </button>
      </header>
      <section class="card-content">
        <h2>${newIdea.title}</h2>
        <p>${newIdea.body}</p>
      </section>
      <footer>
        <button class=" comment-btn" type="button">
          <img class="card-icon comment-icon" src="images/comment.svg" alt="Comment icon"/>
        </button>
        <button class="comment-button comment-btn" type="button">Comment</button>
      </footer>
    </div>`)
};

function clearForm() {
  bodyInput.value = "";
  titleInput.value = "";
}
