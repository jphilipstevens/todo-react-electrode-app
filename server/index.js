"use strict";
/*eslint-disable*/
// Using babel register is not ideal in production code but for now works 
require("babel-core/register");
require("electrode-server")
       (require("electrode-confippet").config, [require("electrode-static-paths")()]);
/*eslint-enable*/
