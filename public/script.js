document.getElementById('try-api').addEventListener('click', (event) => {
  event.preventDefault()
  const headers = {
    'content-type': 'application/json'
  }
  const body = JSON.stringify({name: document.querySelector('input[name="name"]').value})
  fetch('/api/hello', {headers, body, method: 'post'})
    .then(response => response.json())
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert('ERROR: ' + error.message))
  return false
})
