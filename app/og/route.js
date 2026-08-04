import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        background: "white",
        color: "black",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      Hello
    </div>,
    { height: 630, width: 1200 },
  );
}
