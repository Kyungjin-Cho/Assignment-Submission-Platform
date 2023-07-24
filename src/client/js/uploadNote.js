document.addEventListener('DOMContentLoaded', (event) => {
  let quill = new Quill('#quill-editor', { theme: 'snow' });

  document.querySelector('#note-submit').addEventListener('click', async function() {
    const noteContent = quill.root.innerHTML; // Get HTML content of the note
  
    // Send this content to your server using fetch or AJAX
    const response = await fetch('/notes', {
      method: 'POST',
      body: JSON.stringify({ text: noteContent }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Handle the response
    if (response.ok) {
      alert('Note created successfully!');
    } else {
      alert('Error creating note.');
    }
  });
});


