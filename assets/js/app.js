const fNoteInput = document.querySelector(".note-input");
const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector("#description");

const expendForm = document.querySelector(".expend-form");

// const moreBtn = document.querySelector(".more-btn");

//const overlapMoreEl = document.querySelector(".overlap-more");
//const notesEl = document.querySelectorAll(".note");
const bodyEl = document.querySelector("body");
const noteContainerEl = document.querySelector(".note-container");
const overlayNoteContainerEl = document.querySelector(
  ".overlay-note-container"
);
const overlayShadowEl = document.querySelector(".overlay-shadow");

const overlayTitleLabel = document.querySelector(".overlay-title");
const overlayDescriptionLabel = document.querySelector(".overlay-description");

// textarea auto resize height
descriptionInput.addEventListener("input", (e) => {
  descriptionInput.style.height = "auto";
  descriptionInput.style.height = descriptionInput.scrollHeight + "px";
  console.log(descriptionInput.style.height);
});
overlayDescriptionLabel.addEventListener("input", (e) => {
  overlayDescriptionLabel.style.height = "auto";
  overlayDescriptionLabel.style.height =
    overlayDescriptionLabel.scrollHeight + "px";
});
// textarea auto resize height

//expend note input when click in take a note
// removeable
// fNoteInput.addEventListener("click", (e) => {
//     expendForm.classList.add("display");
//     fNoteInput.style.display = "none";
// });
window.addEventListener("click", (e) => {
  const target = e.target.classList;
  if (
    target == "description" ||
    target == "title" ||
    target == "close-btn" ||
    target == "note-input"
  ) {
    expendForm.classList.add("display");
    fNoteInput.style.display = "none";
  } else {
    if (titleInput.value !== "" || descriptionInput.value !== "") {
      //save the value
    } else {
      expendForm.classList.remove("display");
      fNoteInput.style.display = "block";
    }
  }
});
//expend note input when click in take a note

// click on note functionality

// click on note functionality

//=======================================================
// app
const notes = [
  {
    title: "This is a title",
    description:
      "This is description. this should not exceed three line. This is description. this should not exceed three line. This is description. this should not exceed three line",
  },
  {
    title: "This is another title",
    description:
      "well another description. this should not exceed three line. This is description. this should not exceed three line. This is description. this should not exceed three line",
  },
];

function createNotes(noteArr) {
  noteArr.forEach((note, i, arr) => {
    const noteHtml = `<div class="note">
  <h3 class="title-label">${note.title}</h3>
  <p class="description-label">
  ${note.description}
  </p>
  <div class="overlap">
    <i class="more-btn fa-solid fa-ellipsis-vertical"></i>
  </div>
  <div class="overlap-more">
    <p>Delete note</p>
  </div>
</div>`;

    noteContainerEl.insertAdjacentHTML("afterbegin", noteHtml);

    const moreBtn = document.querySelector(".more-btn");

    const titleLabel = document.querySelector(".title-label");
    const descriptionLabel = document.querySelector(".description-label");

    const overlapMoreEl = document.querySelector(".overlap-more");
    const notesEl = document.querySelectorAll(".note");

    //more button functionality
    moreBtn.addEventListener("click", (e) => {
      overlapMoreEl.classList.toggle("show");
    });
    //more button functionality

    //open modal to view or edit the note click functionality
    notesEl.forEach((noteEl, i) => {
      noteEl.addEventListener("click", (e) => {
        overlayNoteContainerEl.style.display = "flex";
        overlayShadowEl.style.display = "block";

        overlayTitleLabel.value = noteEl.childNodes[1].textContent;
        overlayDescriptionLabel.value = noteEl.childNodes[3].textContent;

        overlayDescriptionLabel.style.height =
          overlayDescriptionLabel.scrollHeight + "px";
      });
    });
    //open modal to view or edit the note click functionality
  });
}

// overlay shadow element closes the overlay note container
overlayShadowEl.addEventListener("click", (e) => {
  overlayNoteContainerEl.style.display = "none";
  overlayShadowEl.style.display = "none";
});

//this update the UI
function updateUI(arr) {
  createNotes(arr);
}
updateUI(notes);
// app
