function reload() {
  let www = window.location.href;
  let query = www.slice(www.indexOf('?') + 1);

  setTimeout(() => {
    if (!window.localStorage.getItem('query')) {
      window.localStorage.setItem('query', 1);
    } else {
      window.localStorage.setItem('query', +window.localStorage.getItem('query') + 1);
    }

    window.location.replace(`?` + window.localStorage.getItem('query'));
}, 3000)

  console.log(query);

}

reload();