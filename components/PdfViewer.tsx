"use client";

import dynamic from "next/dynamic";

export type PdfViewerProps = {
  open: boolean;
  onClose: () => void;
  pdf: string;
  title: string;
};

const PdfViewerClient =
  dynamic<PdfViewerProps>(
    () =>
      import(
        "./PdfViewerClient"
      ),
    {
      ssr: false,
      loading: () => null,
    },
  );

export default function PdfViewer(
  props: PdfViewerProps,
) {
  if (!props.open) {
    return null;
  }

  return (
    <PdfViewerClient
      {...props}
    />
  );
}