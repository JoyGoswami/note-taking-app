//inputs
const noteInput = document.querySelector(".note-input");
const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector("#description");
const OverlayHiddenIn = document.querySelector(".overlay-hidden-in");

//elements
const expendFormEl = document.querySelector(".expend-form");
const noteContainerEl = document.querySelector(".note-container");
const overlayNoteContainerEl = document.querySelector(
  ".overlay-note-container"
);
const overlayShadowEl = document.querySelector(".overlay-shadow");

//labels
const overlayTitleLabel = document.querySelector(".overlay-title");
const overlayDescriptionLabel = document.querySelector(".overlay-description");

//buttons
const closeBtn = document.querySelector(".clse-btn");
const overlayClsBtn = document.querySelector(".overlay-cls-btn");

//empty the note html
noteContainerEl.innerHTML = "";

const noteData = JSON.parse(localStorage.getItem("note")) || [];
//listeners
// note input expend functionality
window.addEventListener("click", (e) => {
  const target = e.target.classList;
  if (
    target == "description" ||
    target == "title" ||
    target == "close-btn" ||
    target == "note-input"
  ) {
    expendFormEl.classList.add("display");
    noteInput.style.display = "none";
  } else {
    if (titleInput.value !== "" || descriptionInput.value !== "") {
      //save the value
      save();
      expendFormEl.classList.remove("display");
      noteInput.style.display = "block";
    } else {
      expendFormEl.classList.remove("display");
      noteInput.style.display = "block";
    }
  }
});
// note input expend functionality

// text area auto resize functionality
descriptionInput.addEventListener("input", (e) => {
  descriptionInput.style.height = "auto";
  const taHeight = e.target.scrollHeight;
  descriptionInput.style.height = `${taHeight}px`;
});
// text area auto resize functionality
// overlay textarea auto resize
overlayDescriptionLabel.addEventListener("input", (e) => {
  overlayDescriptionLabel.style.height = "auto";
  const overlayTaHeight = e.target.scrollHeight;
  overlayDescriptionLabel.style.height = `${overlayTaHeight}px`;
});
// overlay shadow element closes the overlay note container
overlayShadowEl.addEventListener("click", (e) => {
  overlayNoteContainerEl.style.display = "none";
  overlayShadowEl.style.display = "none";
  window.location.reload();
  saveEdit();
});
//close button saves data and closes the modal
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // displayNote(titleInput.value, descriptionInput.value);
  // titleInput.value = "";
  // descriptionInput.value = "";
  save();
});
overlayClsBtn.addEventListener("click", (e) => {
  // displayNoteEdited(
  //   overlayTitleLabel.value,
  //   overlayDescriptionLabel.value,
  //   OverlayHiddenIn.value
  // );
  saveEdit();
});
//listeners

//functions
function createNoteData(title, description) {
  const noteDataObj = {
    title,
    description,
  };
  noteData.push(noteDataObj);
  localStorage.setItem("note", JSON.stringify(noteData));
  return noteDataObj;
}

function createNoteDataEdited(title, description, index) {
  const noteDataObjEdited = {
    title,
    description,
  };
  console.log(noteData);
  noteData.reverse();
  noteData.splice(index, 1, noteDataObjEdited);
  noteData.reverse();
  console.log(noteData);
  localStorage.setItem("note", JSON.stringify(noteData));

  return noteDataObjEdited;
}
// function createNoteElement(noteDataArr) {
//     noteDataArr.forEach((note, i) => {
//       const noteHtml = `<div class="note">
//     <h3 class="title-label">${note.title}</h3>
//     <p class="description-label">
//     ${note.description}
//     </p>
//     <div class="overlap">
//       <i class="more-btn fa-solid fa-ellipsis-vertical"></i>
//     </div>
//     <div class="overlap-more">
//       <p>Delete note</p>
//     </div>
//   </div>`;

//       noteContainerEl.insertAdjacentHTML("afterbegin", noteHtml);
//       //buttons
//       const moreBtn = document.querySelector(".more-btn");
//       //elements
//       const overlapMoreEl = document.querySelector(".overlap-more");
//       const notesEl = document.querySelector(".note");
//       //labels
//       const titleLabel = document.querySelector(".title-label");
//       const descriptionLabel = document.querySelector(".description-label");

//       moreBtnDisplay(moreBtn, overlapMoreEl);

//       noteElementEvent(notesEl, titleLabel, descriptionLabel);
//     });
// }
function createNoteElement(noteDataArrObj) {
  const noteHtml = `<div class="note index">
    <h3 class="title-label">${noteDataArrObj.title}</h3>
    <p class="description-label">
    ${noteDataArrObj.description}
    </p>
    <div class="overlap">
      <i class="more-btn nt fa-solid fa-ellipsis-vertical"></i>
    </div>
    <div class="overlap-more">
      <p class="delete nt">Delete note</p>
    </div>
  </div>`;

  noteContainerEl.insertAdjacentHTML("afterbegin", noteHtml);
  //buttons
  const moreBtn = document.querySelector(".more-btn");
  const deleteBtn = document.querySelector(".delete");

  //elements
  const overlapMoreEl = document.querySelector(".overlap-more");
  const notesEl = document.querySelector(".note");
  const indexEl = document.querySelectorAll(".index");
  //labels
  const titleLabel = document.querySelector(".title-label");
  const descriptionLabel = document.querySelector(".description-label");

  //setting attribut data-index to note html div
  indexEl.forEach((node, i) => {
    node.setAttribute("data-index", i);
  });

  moreBtnDisplay(moreBtn, overlapMoreEl);

  deleteEl(deleteBtn, notesEl);

  noteElementEvent(notesEl, titleLabel, descriptionLabel);
}
// it displays the delete button
function moreBtnDisplay(moreBtnNodes, overlayMore) {
  moreBtnNodes.addEventListener("click", (e) => {
    overlayMore.classList.toggle("show");
  });
}

function noteElementEvent(notesNode, titleNode, descriptionNode) {
  notesNode.addEventListener("click", (e) => {
    // const index = notesNode.getAttribute("data-index");
    // overlayNoteContainerEl.style.display = "flex";
    // overlayShadowEl.style.display = "block";

    // overlayTitleLabel.value = titleNode.textContent;
    // overlayDescriptionLabel.value = descriptionNode.textContent;
    // OverlayHiddenIn.value = index;

    // overlayDescriptionLabel.style.height = `${overlayDescriptionLabel.scrollHeight}px`;
    console.log(e.target.classList.contains("nt"));
    if (!e.target.classList.contains("nt")) {
      const index = notesNode.getAttribute("data-index");
      overlayNoteContainerEl.style.display = "flex";
      overlayShadowEl.style.display = "block";

      overlayTitleLabel.value = titleNode.textContent;
      overlayDescriptionLabel.value = descriptionNode.textContent;
      OverlayHiddenIn.value = index;

      overlayDescriptionLabel.style.height = `${overlayDescriptionLabel.scrollHeight}px`;
    }
  });

  // // overlay shadow element closes the overlay note container
  // overlayShadowEl.addEventListener("click", (e) => {
  //   overlayNoteContainerEl.style.display = "none";
  //   overlayShadowEl.style.display = "none";
  // });
}

function displayNote(title, description) {
  const newNote = createNoteData(title, description);
  updateUI(newNote);
  console.log(noteData);
}

function displayNoteEdited(title, description, index) {
  const newNoteEdited = createNoteDataEdited(title, description, index);
  //updateUI(newNoteEdited);
}

function save() {
  displayNote(titleInput.value, descriptionInput.value);
  titleInput.value = "";
  descriptionInput.value = "";
}

function saveEdit() {
  displayNoteEdited(
    overlayTitleLabel.value,
    overlayDescriptionLabel.value,
    OverlayHiddenIn.value
  );
}

function deleteEl(delBtnNode, noteElNode) {
  delBtnNode.addEventListener("click", (e) => {
    const index = e.target.parentNode.parentNode.getAttribute("data-index");
    noteData.reverse();
    noteData.splice(index, 1);
    noteData.reverse();
    window.location.reload();
    localStorage.setItem("note", JSON.stringify(noteData));
    console.log(noteData);
  });
}

function updateUI(noteDataArr) {
  createNoteElement(noteDataArr);
}
noteData.forEach(updateUI);
//functions
