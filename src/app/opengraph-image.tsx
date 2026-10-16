import { ImageResponse } from "next/og";
import { site } from "@/lib/data";
export const alt = `${site.name} — portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", background: "#1b1d21", color: "#eeeff1", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "Georgia, serif" }}>
      <div style={{ fontSize: 34, color: "#6894ff", fontFamily: "monospace" }}>{site.name}</div>
      <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 980 }}>{site.headline}</div>
    </div>), size);
}
