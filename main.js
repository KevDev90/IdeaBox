var ideaLog = [];
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('.card-section');
var userForm = document.querySelector('.user-input');
var deleteButton = document.querySelector('.delete-inactive');
var searchInput = document.querySelector('.search-input');

onload = saveButton.classList.add("disabled-save-btn");
onload = saveButton.disabled = true;

searchInput.addEventListener('keyup', searchCards);
userForm.addEventListener('keyup', validateUserInput);
saveButton.addEventListener('click', addPastIdea);
cardSection.addEventListener('click', buttonConditionals);

window.onload = checkLocalStorage();

  function checkLocalStorage() {
  if(localStorage) {
    for(var i=0; i < localStorage.length; i++) {
      var id = localStorage.key(i);
      var item = JSON.parse(localStorage.getItem(id));
      item = new Idea(item.title, item.body, item.id, item.star);
      // starCheck(item);
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
  // debugger;

  cardSection.insertAdjacentHTML('afterbegin', `<div id="${newIdea.id}" class="card">
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

function starButton(event) {
  var cardId = event.target.closest('.card').id;
  var instance = ideaLog.find(function(idea1){
  return Number(idea1.id) === Number(cardId);
  })
  instance.toggleStar();
  if (!instance.star) {
    event.target.classList.remove('star-true');
  } else {
    event.target.classList.add('star-true');
  }
    instance.saveToLocal();
}

function deleteCard(event) {
  // add hover to change delete active img
  var cardId = event.target.closest('.card').id;
  var instance = ideaLog.find(function(idea){
    return Number(idea.id) === Number(cardId);
  })
  instance.removeFromLocal()
  removeCardObj(cardId);
  event.target.closest('.card').remove();
}

function removeCardObj(id) {
  for (var i = 0; i < ideaLog.length; i++)
  if (ideaLog[i].id === Number(id)) {
    ideaLog.splice(i, 1);
  }
}

function buttonConditionals(event) {
  if(event.target.classList.contains('star-true')) {
     starButton(event)
  } else if(event.target.classList.contains('star-false')) {
     starButton(event)
  }
  if(event.target.classList.contains('delete-inactive')) {
     deleteCard(event)
  }
}

function searchCards() {
  var search = searchInput.value;
  var filter = ideaLog.filter(function(idea){
  var titleSearch = idea.title;
  var bodySearch = idea.body;
    return titleSearch.includes(search) || bodySearch.includes(search);
  });
  cardSection.innerHTML = '';
  filter.forEach(function(filterInstance){
    makeCard(filterInstance);
  });
}
