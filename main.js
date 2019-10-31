// global variables
var bodyInput = document.querySelector(".body-input");
var cardSection = document.querySelector(".card-section");
var deleteButton = document.querySelector(".delete-inactive");
var saveButton = document.querySelector(".save-button");
var searchInput = document.querySelector(".search-input");
var titleInput = document.querySelector(".title-input");
var userForm = document.querySelector(".user-input");
var ideaLog = [];

// when the window loads
window.onload = checkLocalStorage();
window.onload = saveButton.classList.add("disabled-save-btn");
window.onload = saveButton.disabled = true;

// event listeners
cardSection.addEventListener("click", buttonConditionals);
saveButton.addEventListener("click", addPastIdea);
searchInput.addEventListener("keyup", searchCards);
userForm.addEventListener("keyup", validateUserInput);

// functions
function checkLocalStorage() {
  if (localStorage) {
    for (var i = 0; i < localStorage.length; i++) {
      var id = localStorage.key(i);
      var item = JSON.parse(localStorage.getItem(id));
      item = new Idea(item.title, item.body, item.id, item.star);
      makeCard(item);
      ideaLog.push(item);
    }
  }
}

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
}

function addPastIdea() {
  var newIdea = createInstance();
  makeCard(newIdea);
  clearForm();
  validateUserInput();
  newIdea.saveToLocal();
}

function makeCard(newIdea) {
  cardSection.insertAdjacentHTML("afterbegin", `<div id="${newIdea.id}" class="card">
      <header>
        <button class="card-button inactive star-${newIdea.star}" type="button">
        </button>
        <button class="card-button inactive delete-inactive" type="button">
        </button>
      </header>
      <section class="card-content">
        <h2>${newIdea.title}</h2>
        <p>${newIdea.body}</p>
      </section>
      <footer>
        <button class=" comment-button" type="button">
          <img class="card-icon comment-button" src="images/comment.svg" alt="Comment icon"/>
        </button>
        <button class="comment-button" type="button">Comment</button>
      </footer>
    </div>`)
}

function clearForm() {
  bodyInput.value = "";
  titleInput.value = "";
}

function findInstance(event) {
  var cardId = event.target.closest(".card").id;
  return ideaLog.find(function(idea){
    return Number(idea.id) === Number(cardId);
  })
}

function starButton(event) {
  var instance = findInstance(event);
  instance.toggleStar();
  if (!instance.star) {
    event.target.classList.remove("star-true");
  } else {
    event.target.classList.add("star-true");
  }
    instance.saveToLocal();
}

function deleteCard(event) {
  var instance = findInstance(event);
  instance.removeFromLocal()
  removeCardObj(instance.id);
  event.target.closest(".card").remove();
}

function removeCardObj(id) {
  for (var i = 0; i < ideaLog.length; i++)
  if (ideaLog[i].id === Number(id)) {
    ideaLog.splice(i, 1);
  }
}

function buttonConditionals(event) {
  if(event.target.classList.contains("star-true")) {
     starButton(event);
  } else if(event.target.classList.contains("star-false")) {
     starButton(event);
  }
  if(event.target.classList.contains("delete-inactive")) {
     deleteCard(event);
  }
}

function searchCards() {
  var search = searchInput.value.toUpperCase();
  var filter = ideaLog.filter(function(idea){
  var titleSearch = idea.title;
  var bodySearch = idea.body;
    return titleSearch.toUpperCase().includes(search) || bodySearch.toUpperCase().includes(search);
  });
  cardSection.innerHTML = "";
  filter.forEach(function(filterInstance){
    makeCard(filterInstance);
  });
}
