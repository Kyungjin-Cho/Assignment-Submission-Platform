// Import async
import { async } from "regenerator-runtime";

// Get variables related to comment delete function
window.addEventListener("DOMContentLoaded", (event) => {
  const deleteButtons = document.querySelectorAll('.comment__delete');
  deleteButtons.forEach(button => button.addEventListener('click', handleDelete));
});

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");

// Implement addComment function with profile picture and username
const addComment = (text, id, owner) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  
  const img = document.createElement("img");
  if (owner.avatarUrl) {
    img.src = `/${owner.avatarUrl}`;
    img.alt = "Profile Picture";
  } else {
    img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`<text x="0" y="15" font-size="20" fill="black">😀</text>`);
    img.alt = "Default Profile Picture";
  }
  img.style.width = "30px"; 
  img.style.height = "30px";
  img.style.marginRight = "15px";
  img.style.marginLeft = "5px";
  img.style.borderRadius = "50%";

  const a = document.createElement("a");
  a.href = `/users/${owner._id}`;
  a.innerText = `${owner.name}:`;
  a.style.fontWeight = "bolder";
  a.style.color = "white";
  
  const span = document.createElement("span");
  span.innerText = `${text}`;
  
  const span2 = document.createElement("span");
  span2.innerText = "x";
  span2.className = "comment__delete";

  // Add event listener for the delete button
  span2.addEventListener('click', handleDelete);

  newComment.appendChild(img);
  newComment.appendChild(a);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  
  videoComments.prepend(newComment);
};

// Implement comment submit function
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
    const { newCommentId, ownerName, ownerId, ownerAvatar } = await response.json();
    addComment(text, newCommentId, { name: ownerName, _id: ownerId, avatarUrl: ownerAvatar });
  }
};

// Event listner for comment submission
if (form) {
  form.addEventListener("submit", handleSubmit);
}

// Implement comment delettion function
const handleDelete = async function(e) {
  const confirmation = confirm('Are you sure you want to delete this comment?');
  if (!confirmation) {
    e.preventDefault();
  } else {
    const commentId = e.target.parentElement.dataset.id;
    const response = await fetch(`/api/comments/${commentId}/delete`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      e.target.parentElement.remove();
    }
  }
};
