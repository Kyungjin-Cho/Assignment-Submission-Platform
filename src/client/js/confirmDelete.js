document.addEventListener("DOMContentLoaded", function() {
  const deleteVideo = document.querySelector('.video__delete');
  const deleteCommunity = document.querySelector('.community__delete');

  if (deleteVideo) {
    deleteVideo.addEventListener('click', function(e) {
      const confirmation = confirm('Are you sure you want to delete this video?');
      if (!confirmation) {
        e.preventDefault();
      }
    });
  }

  if (deleteCommunity) {
    deleteCommunity.addEventListener('click', function(e) {
      const confirmation = confirm('Are you sure you want to delete this cpmmunity?');
      if (!confirmation) {
        e.preventDefault();
      }
    });
  }

});

