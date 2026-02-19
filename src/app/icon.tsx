import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pen/edit icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
