const btnLogin = document.querySelector('#btn-login');

btnLogin.addEventListener('click',()=>{
    $.ajax({
      url: "/api/v1/checkLogin",
      type: "post",
    })
      .then((data) => {
        if (data.status === 200) {
          window.location.href = "/netflixDemo/movie";
        } else {
          window.location.href = "/login";
        }
      })
      .catch((er) => {
        console.log(er);
      });
    // window.location.href = '/login'
})
