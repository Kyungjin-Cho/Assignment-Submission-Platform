document.addEventListener('DOMContentLoaded', (event) => {
  const noteEditor = document.querySelector('#quill-editor');
  const noteWriteBtn = document.querySelector('#note-write');

  if (noteWriteBtn) { // only add the event listener if the Write Note button exists
    // Initially hide Quill editor
    noteEditor.style.display = 'none';

    // Show Quill editor when Write Note button is clicked
    noteWriteBtn.addEventListener('click', function() {
      noteEditor.style.display = 'block';
      noteWriteBtn.style.display = 'none';
    });

    // Initialize Quill
    quill = new Quill('#quill-editor', { theme: 'snow' });

    // Add event listener to submit button
    noteSubmitBtn.addEventListener('click', async function() {
      const noteContent = quill.root.innerHTML; // Get HTML content of the note
      // Send this content to your server using fetch or AJAX
      const response = await fetch(`/notes/${noteEditor.dataset.id}`, {
        method: 'POST',
        body: JSON.stringify({ text: noteContent }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Handle the response
      if (response.ok) {
        // Replace Quill editor with static content
        noteEditor.innerHTML = noteContent;

        // Change submit button to edit button
        noteSubmitBtn.innerText = 'Edit Note';

        // Add a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete Note';
        deleteBtn.id = 'note-delete';
        noteEditor.after(deleteBtn);

        deleteBtn.addEventListener('click', async function() {
          const response = await fetch(`/notes/${noteEditor.dataset.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            // Remove note content and delete button
            noteEditor.innerHTML = '';
            deleteBtn.remove();

            // Change edit button back to submit button
            noteSubmitBtn.innerText = 'Submit Note';
          } else {
            alert('Error deleting note.');
          }
        });
      } else {
        alert('Error creating note.');
      }
    });
  }
});
