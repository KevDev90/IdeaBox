var ideaLog = [];
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveButton = document.querySelector('.save-button');
var cardSection = document.querySelector('.card-section');
var userForm = document.querySelector('.user-input');
var deleteButton = document.querySelector('.delete-inactive');

onload = saveButton.classList.add("disabled-save-btn");
onload = saveButton.disabled = true;
userForm.addEventListener('keyup', validateUserInput);
saveButton.addEventListener('click', addPastIdea);

window.onload = checkLocalStorage();

  function checkLocalStorage() {
  if(localStorage) {
    for(var i=0; i < localStorage.length; i++) {
      var id = localStorage.key(i);
      var item = JSON.parse(localStorage.getItem(id));
      console.log(item, 'anything-else');
      item = new Idea(item.title, item.body, id, item.star);
      console.log(item, 'anything');
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
};

function addPastIdea() {
  var newIdea = createInstance();
  makeCard(newIdea);
  clearForm();
  validateUserInput();
  newIdea.saveToLocal();
}

function makeCard(newIdea) {
  cardSection.insertAdjacentHTML('beforeend', `<div id="${newIdea.id}" class="card">
      <header>
        <button class="card-button inactive" type="button" onclick="starButton(event)">
        </button>
        <button class="card-button inactive delete-inactive" type="button" onclick="deleteCard(event)">
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
  var instance = ideaLog.find(function(idea){
  return Number(idea.id) === Number(cardId);
  })

  console.log(instance, 'string1')
  instance.toggleStar();
  storeStar();
  console.log(instance, 'string2');
  if (!instance.star) {
    event.target.classList.remove('star-active');
  } else {
    event.target.classList.add('star-active');
  }
}

function storeStar() {
  if(localStorage) {
    for(var i=0; i < localStorage.length; i++) {
      var id = localStorage.key(i);
    var instance = ideaLog.find(function(idea){
      console.log(idea, 'string3')
    return Number(idea.id) })
    var item = JSON.parse(localStorage.getItem(id));
    console.log(idea, '4');
    localStorage.setItem(JSON.stringify(id), JSON.stringify(item))
  }
}


  // get item
  //update and reset item
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
    break;
  }
}
