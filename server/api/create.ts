import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  console.log("adding plate");
  console.log(event);
});
