(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

//filter faeture
function attachFilterEventListeners() {
  let links = document.querySelectorAll("#filter"); 
  for (let link of links) {
      link.addEventListener("click", (e) => {
          e.preventDefault();  
          let currLink = e.target.innerText;
          console.log(currLink);

          // Send the currLink value to the server
          fetch('/filter', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ currLink }),
          })
          .then(response => response.text())
          .then(html => {
              document.body.innerHTML = html;
              attachFilterEventListeners();
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      });
  }
}

document.addEventListener("DOMContentLoaded", attachFilterEventListeners);



