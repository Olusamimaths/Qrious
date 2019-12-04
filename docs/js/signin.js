window.onload = () => {
  const signInArrow = document.querySelector('#submit-arrow');

  function signInUser(url) {
    const username = document.querySelector('#signInUsername').value;
    const password = document.querySelector('#signInPassword').value;

    const data = { username, password };
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
        const { error, status } = res;

        if (error) {
          setColor('rgb(189, 87, 87)');
          let string = '';
          error.forEach(e => string += `${e}\n`);
          flash(document.querySelector('#report'), `${string}`, 'red');

        } else if (status === 200) {
          localStorage.setItem('accessToken', res.token);
          setColor('rgb(87, 189, 130)');
          flash(document.querySelector('#report'), res.message, 'rgb(1, 65, 27);');
          localStorage.setItem('username', data.username);
          window.location.href = 'messages.html';
        }

      })
      .catch((err) => {
        flash(document.querySelector('#report'), 'Make sure you are connected to the internet!', 'red');
        console.log('Error : ', err)
        ; 
});
  }

  signInArrow.addEventListener('click', (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/v1/signin';
    signInUser(url);
  });
}
;
