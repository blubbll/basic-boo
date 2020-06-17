//© by Blubbll

//imports
const { Deno } = window;

import {
  Application,
  Router
} from "https://deno.land/x/denotrain@v0.5.0/mod.ts";

//dirname
const __dirname = Deno.env.toObject().PWD;

//setup
const app = new Application(),
  router = new Router(),
  sFinity = 999999999,
  host = Deno.env.toObject().PROJECT_DOMAIN
    ? "https://deno-page.glitch.me"
    : "http://deno-page.eu-4.evennode.com";

//serve
app.get(".*", async ctx => {
  //console.debug(ctx.req.path);

  console.log(ctx.req.original.headers);
});

(async () => {
  await app.run();
})();
