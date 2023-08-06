document.addEventListener("DOMContentLoaded", function() {
  const deleteVideo = document.querySelector('.video__delete');
  const deleteCommunity = document.querySelector('.community__delete');

  // Code to confirm delete actions for videos
  if (deleteVideo) {
    deleteVideo.addEventListener('click', function(e) {
      const confirmation = confirm('Are you sure you want to delete this video?');
      if (!confirmation) {
        e.preventDefault();
      }
    });
  }

  // Code to confirm delete actions for communities
  if (deleteCommunity) {
    deleteCommunity.addEventListener('click', function(e) {
      const confirmation = confirm('Are you sure you want to delete this cpmmunity?');
      if (!confirmation) {
        e.preventDefault();
      }
    });
  }

});

