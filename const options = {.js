const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'shazam-core.p.rapidapi.com',
    'x-rapidapi-key': '2ccdaa2299msh4238d647d690fb5p114be1jsne62492646e9a'
  }
};

fetch('https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=IN', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));