"use client";

import {
  DownloadSimpleIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import type {
  PdfViewerProps,
} from "./PdfViewer";

import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

declare global {
  interface Window {
    Tawk_API?: {
      hideWidget?: () => void;
      showWidget?: () => void;
    };
  }
}

type DocumentLoadSuccess = {
  numPages: number;
};

const MIN_ZOOM = 0.7;
const MAX_ZOOM = 1.6;
const ZOOM_STEP = 0.1;

export default function PdfViewerClient({
  open,
  onClose,
  pdf,
  title,
}: PdfViewerProps) {
  const viewerRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(
      null,
    );

  const [
    numberOfPages,
    setNumberOfPages,
  ] = useState(0);

  const [
    pageWidth,
    setPageWidth,
  ] = useState(0);

  const [
    zoom,
    setZoom,
  ] = useState(1);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    hasError,
    setHasError,
  ] = useState(false);

  const calculatePageWidth =
    useCallback(() => {
      const container =
        viewerRef.current;

      if (!container) {
        return;
      }

      const computedStyles =
        window.getComputedStyle(
          container,
        );

      const leftPadding =
        Number.parseFloat(
          computedStyles.paddingLeft,
        ) || 0;

      const rightPadding =
        Number.parseFloat(
          computedStyles.paddingRight,
        ) || 0;

      const availableWidth =
        container.clientWidth -
        leftPadding -
        rightPadding;

      let maximumWidth = 760;

      if (window.innerWidth <= 640) {
        maximumWidth =
          availableWidth;
      } else if (
        window.innerWidth <= 900
      ) {
        maximumWidth = 680;
      }

      setPageWidth(
        Math.max(
          260,
          Math.min(
            availableWidth,
            maximumWidth,
          ),
        ),
      );
    }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    window.Tawk_API?.hideWidget?.();

    setNumberOfPages(0);
    setZoom(1);
    setIsLoading(true);
    setHasError(false);

    const animationFrame =
      window.requestAnimationFrame(
        () => {
          calculatePageWidth();
          closeButtonRef.current?.focus();
        },
      );

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    window.addEventListener(
      "resize",
      calculatePageWidth,
    );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      document.body.style.overflow =
        previousOverflow;

      window.Tawk_API?.showWidget?.();

      window.removeEventListener(
        "keydown",
        handleEscape,
      );

      window.removeEventListener(
        "resize",
        calculatePageWidth,
      );
    };
  }, [
    open,
    onClose,
    calculatePageWidth,
  ]);

  useEffect(() => {
    if (
      !open ||
      !viewerRef.current ||
      typeof ResizeObserver ===
        "undefined"
    ) {
      return;
    }

    const resizeObserver =
      new ResizeObserver(() => {
        calculatePageWidth();
      });

    resizeObserver.observe(
      viewerRef.current,
    );

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    open,
    calculatePageWidth,
  ]);

  const handleLoadSuccess = ({
    numPages,
  }: DocumentLoadSuccess) => {
    setNumberOfPages(numPages);
    setIsLoading(false);
    setHasError(false);

    window.requestAnimationFrame(
      calculatePageWidth,
    );
  };

  const handleLoadError = (
    error: Error,
  ) => {
    console.error(
      "Error al cargar el certificado:",
      error,
    );

    setIsLoading(false);
    setHasError(true);
  };

  const decreaseZoom = () => {
    setZoom((current) =>
      Math.max(
        MIN_ZOOM,
        Number(
          (
            current -
            ZOOM_STEP
          ).toFixed(2),
        ),
      ),
    );
  };

  const increaseZoom = () => {
    setZoom((current) =>
      Math.min(
        MAX_ZOOM,
        Number(
          (
            current +
            ZOOM_STEP
          ).toFixed(2),
        ),
      ),
    );
  };

  const resetZoom = () => {
    setZoom(1);
  };

  if (!open || !pdf) {
    return null;
  }

  const renderedWidth =
    pageWidth > 0
      ? Math.round(
          pageWidth * zoom,
        )
      : undefined;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-viewer-title"
      >
        <header
          className={styles.header}
        >
          <div
            className={styles.titleBox}
          >
            <span>
              Certificado oficial
            </span>

            <h2 id="pdf-viewer-title">
              {title}
            </h2>
          </div>

          <div
            className={
              styles.headerActions
            }
          >
            <div
              className={
                styles.zoomControls
              }
              aria-label="Controles de zoom"
            >
              <button
                type="button"
                onClick={
                  decreaseZoom
                }
                disabled={
                  zoom <= MIN_ZOOM
                }
                aria-label="Alejar documento"
              >
                <MinusIcon
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                className={
                  styles.zoomValue
                }
                onClick={
                  resetZoom
                }
                aria-label="Restablecer zoom"
                title="Restablecer zoom"
              >
                {Math.round(
                  zoom * 100,
                )}
                %
              </button>

              <button
                type="button"
                onClick={
                  increaseZoom
                }
                disabled={
                  zoom >= MAX_ZOOM
                }
                aria-label="Acercar documento"
              >
                <PlusIcon
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
              </button>
            </div>


            <button
              ref={closeButtonRef}
              type="button"
              className={
                styles.closeButton
              }
              onClick={onClose}
              aria-label="Cerrar visor"
            >
              <XIcon
                size={21}
                weight="bold"
                aria-hidden="true"
              />
            </button>
          </div>
        </header>

        <div
          ref={viewerRef}
          className={
            styles.viewerContainer
          }
        >
          {isLoading && (
            <div
              className={
                styles.loadingState
              }
              role="status"
              aria-live="polite"
            >
              <span
                className={
                  styles.loadingSpinner
                }
              />

              <p>
                Cargando certificado...
              </p>
            </div>
          )}

          {hasError ? (
            <div
              className={
                styles.errorState
              }
              role="alert"
            >
              <strong>
                No pudimos mostrar el
                certificado.
              </strong>

              <p>
                Comprueba que el archivo
                exista y sea un PDF válido.
              </p>

              {/* <a
                href={pdf}
                download
              >
                Descargar certificado
              </a> */}
            </div>
          ) : (
            <Document
              key={pdf}
              file={pdf}
              onLoadSuccess={
                handleLoadSuccess
              }
              onLoadError={
                handleLoadError
              }
              loading={null}
              className={
                styles.document
              }
            >
              {Array.from(
                {
                  length:
                    numberOfPages,
                },
                (_, index) => {
                  const currentPage =
                    index + 1;

                  return (
                    <div
                      key={`${pdf}-${currentPage}`}
                      className={
                        styles.pageWrapper
                      }
                    >
                      <Page
                        pageNumber={
                          currentPage
                        }
                        width={
                          renderedWidth
                        }
                        renderTextLayer={
                          false
                        }
                        renderAnnotationLayer={
                          false
                        }
                        devicePixelRatio={
                          Math.min(
                            window
                              .devicePixelRatio ||
                              1,
                            2,
                          )
                        }
                        loading={null}
                      />

                      <span
                        className={
                          styles.pageNumber
                        }
                      >
                        Página {currentPage} de{" "}
                        {numberOfPages}
                      </span>
                    </div>
                  );
                },
              )}
            </Document>
          )}
        </div>
      </section>
    </div>
  );
}