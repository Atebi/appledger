import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
// import appledger from "./data.json";
// import fs from "fs";
import { getApps } from "@/app/utils/localStorage";

const appDirectory = await getApps();
console.log(appDirectory);
// const appDirectory = await response.json();

export async function GET(request) {
  console.log(appDirectory);
  return NextResponse.json(appDirectory);
}

export async function POST(request) {
  const { title, description, tag } = await request.json();

  try {
    const newApp = {
      id: uuidv4(),
      title,
      description,
      tag,
    };
    console.log(newApp);

    appDirectory.push(newApp);
    console.log(appDirectory);
    localStorage.setItem("ledgerString", JSON.stringify(appDirectory));

    return NextResponse.json(appDirectory);
  } catch (error) {
    return new NextResponse("Failed to create new entry", { status: 500 });
  }
}
