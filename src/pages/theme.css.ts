import { siteThemeCss } from "../theme";

// Static endpoint: built once into /theme.css and linked by Layout
export const GET = () =>
  new Response(siteThemeCss(), { headers: { "Content-Type": "text/css" } });
