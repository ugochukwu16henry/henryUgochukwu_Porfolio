import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-rSWosdHT.mjs";
import { s as seed } from "./portfolio-C3mz8jZY.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as arrayType, b as anyType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const portfolioSchema = objectType({
  profile: anyType(),
  skills: anyType(),
  projects: arrayType(anyType()),
  experience: arrayType(anyType()),
  education: arrayType(anyType()),
  certificates: arrayType(anyType())
});
const getLivePortfolio_createServerFn_handler = createServerRpc({
  id: "7abefc919ff69cbf99252c20598241414d8450bfa308a740b01b002d762a0c38",
  name: "getLivePortfolio",
  filename: "src/lib/api/portfolio.functions.ts"
}, (opts) => getLivePortfolio.__executeServer(opts));
const getLivePortfolio = createServerFn({
  method: "GET"
}).handler(getLivePortfolio_createServerFn_handler, async () => {
  try {
    const {
      loadPortfolioFromGithub
    } = await import("./github-portfolio.server-Bjz00JHl.mjs");
    const portfolio = await loadPortfolioFromGithub();
    return {
      ok: true,
      source: "github",
      portfolio
    };
  } catch (error) {
    console.error(error);
    return {
      ok: true,
      source: "local",
      portfolio: seed
    };
  }
});
const saveLivePortfolio_createServerFn_handler = createServerRpc({
  id: "1215845bd484752425ae7a8c6700e00e8d68881d0b929bb098c8d0cbf0ea770d",
  name: "saveLivePortfolio",
  filename: "src/lib/api/portfolio.functions.ts"
}, (opts) => saveLivePortfolio.__executeServer(opts));
const saveLivePortfolio = createServerFn({
  method: "POST"
}).inputValidator(portfolioSchema).handler(saveLivePortfolio_createServerFn_handler, async ({
  data
}) => {
  const {
    savePortfolioToGithub
  } = await import("./github-portfolio.server-Bjz00JHl.mjs");
  const portfolio = data;
  const result = await savePortfolioToGithub(portfolio);
  return {
    ok: true,
    ...result
  };
});
export {
  getLivePortfolio_createServerFn_handler,
  saveLivePortfolio_createServerFn_handler
};
