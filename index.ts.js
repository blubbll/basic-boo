//© by Blubbll

//imports
const { Deno } = window;

import {
  Application,
  Router
} from "https://deno.land/x/denotrain@v0.5.0/mod.ts";
import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

//dirname
const __dirname = Deno.env.toObject().PWD;

//setup
const app = new Application(),
  router = new Router(),
  sFinity = 999999999,
  host = Deno.env.toObject().PROJECT_DOMAIN
    ? "https://basic-boo.glitch.me"
    : "-";

app.get("/", async ctx => {
  
  console.log(ctx.req.original.headers)
  
  ctx.res.setMimeType("text/html");

  return (await readFileStr(`${__dirname}/login.html`)).replace(
    "{{status}}",
    ctx.req.original.headers.get("authorization") ? 'true' : 'false'
  );
});

//logout
app.get("/logout", async ctx => {
  ctx.res
      .setStatus(401)
  return "out"
});

//login
app.get("/login", async ctx => {
  console.log(ctx.req.original.headers);

  if (!ctx.req.original.headers.get("authorization")) {
    ctx.res
      .setStatus(401)
      .addHeader("WWW-Authenticate", 'Basic realm="shadow realm"');
  } else {
    ctx.res.setStatus(200);
    return "hi";
  }
  switch (1) {
  }
  return "in";
});

(async () => {
  await app.run();
})();
