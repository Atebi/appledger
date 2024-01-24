import { NextResponse } from "next/server";

// import getApps from "../utils/localStorage";
import getApps from "@/app/utils/localStorage";

export async function GET(request) {
  // const [allApps, _] = getApps();
  const allApps = JSON.parse(localStorage.getItem("ledgerString"));
  console.log("response allapps", allApps);
  const { searchParams } = new URL(request.url);
  console.log("searchparams :", searchParams);
  const query = searchParams.get("query");
  const filteredApps = allApps.filter((app) => {
    return app.title.toLowerCase().includes(query.toLowerCase());
  });
  return NextResponse.json(filteredApps);
}
