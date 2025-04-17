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

resetPage = () => {
    window.location.reload();
}

//Show Users
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
      const btn = document.getElementById('loadUser');
      btn.addEventListener('click', () => {
          const userList = document.getElementById('userList');
          userList.innerHTML = ""; // Clear previous content
          data.forEach(user => {
              const li = document.createElement('li');
              li.innerHTML = `<strong>Name:</strong> ${user.name} - <strong>Email:</strong> ${user.email} - <strong>Company:</strong> ${user.company.name}`;
              userList.appendChild(li);
          });
      });
  })
  .catch(error => console.error(error));

//Show Posts
const btn1 = document.getElementById('loadPost');
btn1.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const postList = document.getElementById('postList');
        postList.innerHTML = "";
        data.forEach(post => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>Title: ${post.title}</strong>
                          <h5>Body: ${post.body}</h5>`;
          postList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
  });

  //add Posts
  const postForm = document.getElementById("postForm");
  postForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent normal form submission
  
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      })
    })
    .then(response => response.json())
    .then(data => {
      const postSuccessDiv = document.getElementById("postSuccessMessage");
      postSuccessDiv.innerHTML = `
        <h4>Post added successfully!</h4>
        <p>ID: ${data.id}</p>
        <p>Title: ${data.title}</p>
        <p>Body: ${data.body}</p>
      `;
      // Optionally reset the form after successful submission
      postForm.reset();
    })
    .catch(error => console.error("Error:", error));
  });


//Show Comments for a Post
const btn3 = document.getElementById('loadComment');
btn3.addEventListener('click',()=>{
    const postId = document.getElementById('postIdInput').value;
    if (!postId) {
      alert("Please enter a valid Post ID");
      return;
    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => {
        const commentList = document.getElementById('commentList');
        commentList.innerHTML = ""; // Clear previous comments
        data.forEach(data => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h4>${data.name}</h4>
            <p>${data.body}</p>
          `;
          commentList.appendChild(li);
        });
      })
      .catch(error => console.error("Error:", error));
  });