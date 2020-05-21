window.onload = () => {
  const signInArrow = document.querySelector('#submit-arrow');
  const spinner = document.getElementById('spinner');

  function signInUser(url) {
    spinner.removeAttribute('hidden');

    const username = document.querySelector('#signInUsername').value;
    const password = document.querySelector('#signInPassword').value;

    const data = { username, password };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        spinner.setAttribute('hidden', '');
        const { error, status } = res;

        if (error) {
          setColor('rgb(189, 87, 87)');
          let string = '';
          error.forEach(e => (string += `${e}\n`));
          flash(document.querySelector('#report'), `${string}`, 'red');
        } else if (status === 200) {
          localStorage.setItem('accessToken', res.token);
          setColor('rgb(87, 189, 130)');
          flash(
            document.querySelector('#report'),
            res.message,
            'rgb(1, 65, 27);',
          );
          localStorage.setItem('username', data.username);
          window.location.href = 'messages.html';
        }
      })
      .catch((err) => {
        spinner.setAttribute('hidden', '');
        flash(
          document.querySelector('#report'),
          'Make sure you are connected to the internet!',
          'red',
        );
      });
  }


  signInArrow.addEventListener('click', (e) => {
    e.preventDefault();
    const url = `${apiPrefix}/signin`;
    signInUser(url);
  });


  // document.addEventListener('keydown', (event) => {
  //   console.log(signInArrow.hasAttribute('visible'))
  //   if (!signInArrow.hasAttribute('visible')) return;
  //   if (event.keyCode === 13 || event.which === 13) {
  //     const url = `${apiPrefix}/signin`;
  //     signInUser(url);
  //   }
  // });
};
