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
          page.hideFill();
        } else {
          page.loginDialog;
        }
        window.loggedIn = loginOk;
      }
    };

    xhr.open("POST", "/login", true, user, pass);
    xhr.send(null);

    return false;
  },
  logout: _ => {
    window.loggedIn = false;
  },
  loginSafe: _ => {
    page.login($("[name=loginUser]", $("[name=loginPass]")));
  },
  loginDialog: async _ => {
    const userSel = `user`;
    const passSel = `pass`;
    const { value: formValues } = await Swal.fire({
      title: "Login with Windows account:",
      html:
        `<div class="mb-3">
            <input id="${userSel}" class="form-control w-100" type="username" autocomplete="username" placeholder="somebody@t.com">
         </div>` +
        `<input id="${passSel}" class="form-control w-100" type="password" placeholder="password" autocomplete="current-password">`,
      focusConfirm: false,
      preConfirm: () => {
        return [$(`#${userSel}`).value, $(`#${passSel}`).value];
      }
    });
    page.login(formValues[0], formValues[1]);
  },
  hideFill: _ => {
    $("#loginBlock").setAttribute("style", "display:none !important");
  },
  showFill: _ => {
    $("#loginBlock").setAttribute("style", "");
  }
};
