//selectors
const $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document);

const { Swal } = window;

const page = {
  /*toggleState: _ => {
    $("form").setAttribute(
      "state",
      $("form").getAttribute("state") === "link" ? "login" : "linker"
    );
  },*/
  login: (user, pass) => {
    var xhr = new XMLHttpRequest();

    xhr.onload = _ => {
      if (xhr.readyState === 4) {
        const loginOk = xhr.status === 200;
        console.log("Manual check: loggedIn?", loginOk);

        if (loginOk) {
          history.replaceState(null, null, location.href);
        } else {
          page.loginDialog
        }
        window.loggedIn = loginOk;
      }
    };

    xhr.open(
      "GET",
      "/login",
      true,
      user, pass
    );
    xhr.send(null);

    return false;
  },
  logout: _ => {
    window.loggedIn = false;
  },
  loginDialog: async _ => {
    const userSel = `user_${+new Date()}`
    const passSel = `pass_${+new Date()}`
    const { value: formValues } = await Swal.fire({
      title: "Login with Windows account:",
      html:
        `<div class="mb-3">
            <input id="${userSel}" class="form-control w-100" type="username" autocomplete="off" placeholder="somebody@t.com">
         </div>` +
        `<input id="${passSel}" class="form-control w-100" type="password" placeholder="password" autocomplete="off">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          $(`#${userSel}`).value,
          $(`#${passSel}`).value
        ];
      }
    });
    page.login(formValues[0], formValues[1])
  },
  hideFill: _ => {
    $("#loginBlock").setAttribute("style", "display:none !important");
  },
  showFill: _ => {
    $("#loginBlock").setAttribute("style", "");
  }
};

setTimeout(()=>{
  page.loginDialog()
}, 5000)