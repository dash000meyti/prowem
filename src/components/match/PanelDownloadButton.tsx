"use client";

import { toPng } from "html-to-image";

export async function downloadElementPng(
  node: HTMLElement,
  filename: string,
) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#0D0F12",
  });
  const link = document.createElement("a");
  link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
  link.href = dataUrl;
  link.click();
}
