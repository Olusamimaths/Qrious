window.onload = () => {
  const spinner = document.getElementById("spinner");
  // get the access token
  function getMessages(url) {
    spinner.removeAttribute('hidden');
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      window.location.href = 'signin.html';
      flash(document.querySelector('#report'), 'You need to sign in.', 'red;');
      return;
    }

    document.querySelector('#share-link').value = `Send me an anonymous message, I'm not gonna know who sent it!
    https://olusamimaths.github.io/Qrious/ask.html?user=${localStorage.getItem('username')}
    `;

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        spinner.setAttribute('hidden', '');
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
                  
              </aside>`;
              // <button class="btn">Delete</button>
            document.querySelector('#messages').innerHTML = `
            <h1 id="greetings">${localStorage.getItem('username') || 'friend'}, you have ${res.messages.length} ${res.messages.length === 1 ? 'message' : 'messages'}</h1>
            ${content}`;
          });
        } else if (res.status === 404) {
          document.querySelector('#messages').innerHTML = `
            <h1 id="greetings">${localStorage.getItem('username') || 'friend'}, you have no messages yet</h1>
            <aside class="message">
            <div class="message-header">
                <p class="message-date"></p>
                <p class="time"></p>
            </div>

            <p class="message-text">
                Share this link and let your friends send you anonymous messages
                https://olusamimaths.github.io/Qrious/ask.html?user=${localStorage.getItem('username')}
            </p>
        </aside>`;
        } else {
          window.location.href = 'signin.html';
          flash(document.querySelector('#report'), 'You need to sign in.', 'red');
        }

      })
      .catch((err) => {
        spinner.setAttribute('hidden', '');
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

  getMessages(`${apiPrefix}/questions`);

  
}