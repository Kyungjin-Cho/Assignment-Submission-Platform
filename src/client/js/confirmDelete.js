document.addEventListener("DOMContentLoaded", function() {
  const deleteVideo = document.getElementById('delete-video');

  if (deleteVideo) {
    deleteVideo.addEventListener('click', function(e) {
      const confirmation = confirm('Are you sure you want to delete this video?');

      if (!confirmation) {
        // Stop the link from being followed if the user did not confirm
        e.preventDefault();
      }
    });
  }
});

