fetch('images.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    console.log(response.json()[0].url);
  })
  .then(data => console.log(data))
  .catch(error => console.error('There has been a problem with your fetch operation: ', error));

