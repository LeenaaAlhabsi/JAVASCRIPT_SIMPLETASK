const myPromise = new Promise(
    (resolve, reject) => {
        setTimeout(() => {
          const success = true;
      
          if (success) {
            resolve("Task done!");
          } else {
            reject("Something went wrong");
          }
        }, 1000);
      }
);

 /*myPromise
.then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });*/

  fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json()).then(
      data => {
        const post = document.getElementById('app');
        const postydiv = document.createElement('div');
        postydiv.innerHTML = `<h1>${data.title}</h1><h2>${data.userId}</h2><h2>${data.id}</h2><p>${data.body}</p>`;

        post.appendChild(postydiv);
      }
  )
  .catch(error => console.error(error))