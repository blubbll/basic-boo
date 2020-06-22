      //selectors
      const $ = document.querySelector.bind(document),
        $$ = document.querySelectorAll.bind(document);

  const page = {
        toggleState: _ => {
          $("form").setAttribute(
            "state",
            $("form").getAttribute("state") === "link" ? "login" : "linker"
          );
        },
        login: _ => {
          var xhr = new XMLHttpRequest();

          xhr.onload = _ => {
            if (xhr.readyState === 4) {
              const loginOk = xhr.status === 200;
              console.log("Manual check: loggedIn?", loginOk);

              if (loginOk) {
                history.replaceState(null, null, location.href);
              } else {
                alert("invalid credentials!");
              }
              window.loggedIn = loginOk;
            }
          };

          xhr.open(
            "GET",
            "/login",
            true,
            $("form").state === "login"
              ? $("input[name=loginUser]").value
              : $("input[name=linkerUser]").value,
            $("form").state === "login"
              ? $("input[name=loginPass]").value
              : $("input[name=linkerPass]").value
          );
          xhr.send(null);

          return false;
        },
        logout: _ => {
          window.loggedIn = false;
        },
        hideFill: _ => {
          $("#loginBlock").classList.add("d-none");
        },
        showFill: _ => {
          $("#loginBlock").classList.remove("d-none");
        }
      };