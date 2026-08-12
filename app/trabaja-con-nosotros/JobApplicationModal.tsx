"use client";

import {
  XIcon,
} from "@phosphor-icons/react";

import {
  useEffect,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import JobApplicationForm from "./JobApplicationForm";

import styles from "./JobApplicationModal.module.css";

type JobApplicationModalProps = {
  jobId: string;
  jobTitle: string;
  area?: string;
};

export default function JobApplicationModal({
  jobId,
  jobTitle,
  area = "",
}: JobApplicationModalProps) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  /* =====================================================
     CLIENTE LISTO
  ===================================================== */

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  /* =====================================================
     BLOQUEAR SCROLL + ESCAPE
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setIsOpen(false);
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  /* =====================================================
     MODAL
  ===================================================== */

  const modal =
    mounted &&
    isOpen
      ? createPortal(
          <div
            className={
              styles.overlay
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby={`job-modal-${jobId}`}
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setIsOpen(false);
              }
            }}
          >
            <div
              className={
                styles.modal
              }
            >
              {/* =========================================
                  HEADER
              ========================================= */}

              <header
                className={
                  styles.header
                }
              >
                <div
                  className={
                    styles.heading
                  }
                >
                  <span>
                    Postula a esta convocatoria
                  </span>

                  <h2
                    id={`job-modal-${jobId}`}
                  >
                    {jobTitle}
                  </h2>

                  <p>
                    Completa tus datos y
                    adjunta tu CV en formato
                    PDF.
                  </p>
                </div>

                <button
                  type="button"
                  className={
                    styles.closeButton
                  }
                  onClick={() =>
                    setIsOpen(false)
                  }
                  aria-label="Cerrar formulario"
                >
                  <XIcon
                    size={21}
                    weight="bold"
                  />
                </button>
              </header>

              {/* =========================================
                  FORMULARIO
              ========================================= */}

              <div
                className={
                  styles.body
                }
              >
                <JobApplicationForm
                  jobId={jobId}
                  jobTitle={
                    jobTitle
                  }
                  area={
                    area ||
                    jobTitle
                  }
                />
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={
          styles.openButton
        }
        onClick={() =>
          setIsOpen(true)
        }
      >
        Postular a esta convocatoria
      </button>

      {modal}
    </>
  );
}