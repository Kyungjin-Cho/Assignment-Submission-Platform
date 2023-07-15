import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  
  const span = document.createElement("span");
  span.innerText = `${text}`;
  
  const span2 = document.createElement("span");
  span2.innerText = "x";
  span2.className = "comment__delete";

  // Add event listener for the delete button
  span2.addEventListener('click', async function(e) {
    const confirmation = confirm('Are you sure you want to delete this comment?');
    if (!confirmation) {
      e.preventDefault();
    } else {
      const commentId = e.target.parentElement.dataset.id;
      const response = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
      });
      if (response.status === 201) {
        e.target.parentElement.remove();
      }
    }
  });

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = form.querySelector("textarea").value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
  if (response.status === 201) {
    form.querySelector("textarea").value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
