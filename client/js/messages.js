window.onload = () => {
  // get the access token
  function getMessages(url) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      window.location.href = 'signin.html';
      flash(document.querySelector('#report'), 'You need to sign in.', 'red;');
      return;
    }

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
        if (res.messages) {
          let content = '';
          flash(document.querySelector('#report'), 'Signed in', 'red');
          res.messages.forEach((message) => {
            content += `
                  <aside class="message">
                  <div class="message-header">
                      <p>${new Date(message.timeplaced).toLocaleDateString()}, by Anon:</p>
                      <p>${new Date(message.timeplaced).toLocaleTimeString()}</p>
                  </div>
      
                  <p class="message-text">
                  ${message.question}
                  </p>
                  <button class="btn">Options</button>
              </aside>`;
            document.querySelector('#messages').innerHTML = `
            <h1 id="greetings">${localStorage.getItem('username') || 'friend'}, you have ${res.messages.length} messages</h1>
            ${content}`;
          });
        } else if (res.message) {
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
        }

      })
      .catch(e => console.log(e));
  }

  getMessages('http://localhost:5000/api/v1/questions');

}
;
