const domain = ''
let state = '';


// GET request to retrieve and display the served HTML page sent by CPEE (endpoint on CPEE: PUT sethtml)
function getHTML() {

  const commUrl = document.body.dataset.commurl; // get body attribute

  fetch(`${commUrl}/html`)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        // if no html was sent by CPEE to cleint
        document.getElementById('dataContainer').innerHTML = 'No new tasks are currently available. <br><br> They will automatically appear here without the need for page refresh.';
        // throw new Error('Failed to retrieve HTML page');
        return '';
      }
    })
    .then(responseText => {
      if (responseText !== state  && responseText!== '') {
        state = responseText;

        document.getElementById('dataContainer').innerHTML = responseText;

        // if the received HTML contains an 'input' tag
        if (responseText.trim().includes('input')) {

          document.getElementById('submit').style.visibility = 'visible';

          const inputField = document.querySelector('input');
          const inputName = inputField.getAttribute('name');

          if (inputName) {
            inputField.id = inputName;
          } else {
            console.warn('Input field has no name attribute.');
          }
        } else {

          // if no 'input' tag is found hide 'submit' btn
          document.getElementById('submit').style.visibility = 'hidden';
        }
      } else {
        return;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
}
setInterval(getHTML, 1000);


// send UI form on submit to CPEE (endpoint on CPEE: GET receive)
function submitData(event) {
  event.preventDefault(); // Prevent the default form submission

  const commUrl = document.body.dataset.commurl; // get url as a body attribute

  const inputFields = document.querySelectorAll('input'); // get all input fields
  const inputValues = {};

  inputFields.forEach(inputField => {
    const inputName = inputField.getAttribute('name');
    const inputValue = inputField.value;
    inputValues[inputName] = inputValue; // store input value in the object
  });

  const requestBody = {
    commUrl,
    inputValues
  };

  fetch(`${commUrl}/submit-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // include input value as query parameters
    body: JSON.stringify(requestBody),
  })
    .then(response => {
      if (response.ok) {
        document.getElementById('submit').style.visibility = 'hidden';
        state = ''
        getHTML()

      } else {
        console.error('Failed to send data.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call getHTML initially
getHTML();
