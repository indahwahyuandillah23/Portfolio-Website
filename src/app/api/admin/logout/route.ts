import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logout success" });
  // Hapus token dengan mengatur cookie kosong dan expired
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // waktu kadaluarsa
    path: '/',
  });
  return res;
}
