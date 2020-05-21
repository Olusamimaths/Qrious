window.onload = () => {

  const spinner = document.getElementById("spinner");
  const replyBtn = document.querySelector('#btn-reply');
  const urlParams = new URLSearchParams(window.location.search);
  const greetingsDiv = document.querySelector('#greetings');
  // get the username from the request query
  const meantFor = urlParams.get('username') || urlParams.get('user');


  if (!meantFor) {
    greetingsDiv.textContent = 'You have an invalid link, create your own link?';
    flash(document.querySelector('#report'), 'Error: invalid link', 'red');
    return;
  }

  greetingsDiv.textContent = `Sending Message to ${meantFor}`;

  function sendReply(url) {
    spinner.removeAttribute('hidden');

    const question = document.querySelector('#anon-message').value;

    const data = { question, meantFor };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        spinner.setAttribute('hidden', '');
        const { error } = res;
        if (error) {
          setColor('rgb(189, 87, 87)');
          flash(document.querySelector('#report'), `${error}`.replace(/question/g, 'message'), 'red');
          greetingsDiv.textContent = `${meantFor} is not a registered user!`
          return;
        }
        flash(document.querySelector('#report'), `${res.message.replace('question', 'message')}`, 'green');
        document.querySelector('#anon-message').value = '';
      })
      .catch(error) {
        spinner.setAttribute('hidden', '');
        flash(
          document.querySelector('#report'),
          'Make sure you are connected to the internet!',
          'red',
        );
      }

  }

  replyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendReply(`${apiPrefix}/ask`);
  });
};
