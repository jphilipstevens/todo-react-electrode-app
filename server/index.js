"use strict";
/*eslint-disable*/
require("babel-core/register");
require("electrode-server")
       (require("electrode-confippet").config, [require("electrode-static-paths")()]);
/*eslint-enable*/
