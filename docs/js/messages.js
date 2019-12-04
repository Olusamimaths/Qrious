window.onload = () => {
  // get the access token
  function getMessages(url) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      window.location.href = 'signin.html';
      flash(document.querySelector('#report'), 'You need to sign in.', 'red;');
      return;
    }

    document.querySelector('#share-link').value = `Send me an anonymous message, I'm not gonna know who sent it!
    http://127.0.0.1:5500/user?=${localStorage.getItem('username')}
    `;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          let content = '';
          flash(document.querySelector('#report'), 'Signed in', 'green');
          res.messages.forEach((message) => {
            content += `
                  <aside class="message">
                  <div class="message-header">
                      <p>${new Date(message.timeplaced).toDateString()}, by Anon:</p>
                      <p>${new Date(message.timeplaced).toLocaleTimeString()}</p>
                  </div>
      
                  <p class="message-text">
                  ${message.question}
                  </p>
                  <button class="btn">Delete</button>
              </aside>`;
            document.querySelector('#messages').innerHTML = `
            <h1 id="greetings">${localStorage.getItem('username') || 'friend'}, you have ${res.messages.length} ${res.messages.length === 1 ? 'message' : 'messages'}</h1>
            ${content}`;
          });
        } else if (res.status === 404) {
          document.querySelector('#messages').innerHTML = `
            <h1 id="greetings">${localStorage.getItem('username') || 'friend'}, you have no messages yet</h1>
            <aside class="message">
            <div class="message-header">
                <p></p>
                <p></p>
            </div>

            <p class="message-text">
                Share this link and let your friends send you anonymous messages
            </p>
        </aside>`;
        } else {
          window.location.href = 'signin.html';
          flash(document.querySelector('#report'), 'You need to sign in.', 'red');
        }

      })
      .catch((err) => {
        flash(document.querySelector('#report'), 'Make sure you are connected to the internet!', 'red');
        console.log('Error : ', err)
        ; 
});
  }

  function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = 'signin.html';
    
  }
  /**Copy link for sharing */
  function copyLink() {
    let copyText = document.querySelector('#share-link');
    copyText.select()
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    // flash success message
    flash(document.querySelector('#report'), 'Link copied! You can now share it', 'green');
  }

  document.querySelector('.fa-sign-out-alt').addEventListener('click', logout)
  document.querySelector('.fa-share-square').addEventListener('click', copyLink)

  getMessages('http://localhost:5000/api/v1/questions');

  
}
