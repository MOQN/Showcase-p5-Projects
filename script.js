document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from CSV
  fetch('projects.csv')
    .then(response => response.text())
    .then(data => {
      const lines = data.trim().split('\n');
      const listElement = document.getElementById('project-list');
      const iframe = document.getElementById('p5-iframe');

      lines.forEach(line => {
        const parts = line.split(',');

        if (parts.length >= 2) {
          const name = parts[0].trim();
          const link = parts[1].trim();
          const note = parts.length > 2 ? parts[2].trim() : '';

          // Create list item container
          const li = document.createElement('li');

          // Create project name element
          const nameDiv = document.createElement('div');
          nameDiv.className = 'project-name';
          nameDiv.textContent = name;

          // Create additional note element
          const noteDiv = document.createElement('div');
          noteDiv.className = 'project-note';
          noteDiv.textContent = note;

          // Append elements to list item
          li.appendChild(nameDiv);
          li.appendChild(noteDiv);

          // Add click event to swap iframe source
          li.addEventListener('click', () => {
            iframe.src = link;

            // Handle active state styling
            document.querySelectorAll('#project-list li').forEach(el => {
              el.classList.remove('active');
            });
            li.classList.add('active');
          });

          // Append list item to the menu
          listElement.appendChild(li);
        }
      });
    })
    .catch(error => console.error('Error loading CSV data:', error));
});