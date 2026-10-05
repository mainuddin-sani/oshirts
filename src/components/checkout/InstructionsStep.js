"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiFileText,
  FiTag,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { ARTWORK_TYPES, MAX_ARTWORK_MB, MAX_INSTRUCTIONS } from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import styles from "./Checkout.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const formatSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const isAllowed = (file) =>
  ARTWORK_TYPES.split(",").some((type) => file.name.toLowerCase().endsWith(type.trim()));

export default function InstructionsStep() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { instructions, update } = useCheckout();

  const inputRef = useRef(null);
  const [file, setFile] = useState(instructions?.artwork || null);
  const [fileError, setFileError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      notes: instructions?.notes || "",
      reference: instructions?.reference || "",
      designReview: instructions?.designReview ?? true,
    },
  });

  const notes = useWatch({ control, name: "notes" }) || "";
  const designReview = useWatch({ control, name: "designReview" });

  const used = notes.length;
  const remaining = MAX_INSTRUCTIONS - used;

  const counterClass = [
    styles.counter,
    remaining < 0 && styles.counterOver,
    remaining >= 0 && remaining <= 50 && styles.counterNear,
  ]
    .filter(Boolean)
    .join(" ");

  const acceptFile = (candidate) => {
    if (!candidate) return;

    if (!isAllowed(candidate)) {
      setFileError(`That file type is not supported. Use ${ARTWORK_TYPES.replaceAll(",", ", ")}.`);
      return;
    }

    if (candidate.size > MAX_ARTWORK_MB * 1024 * 1024) {
      setFileError(`Keep artwork under ${MAX_ARTWORK_MB} MB, or send it to us after checkout.`);
      return;
    }

    setFileError("");
    // Only the descriptive bits are kept — the File itself cannot be
    // serialised into session storage and no upload endpoint exists yet.
    setFile({ name: candidate.name, size: candidate.size });
  };

  const removeFile = () => {
    setFile(null);
    setFileError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const onSubmit = (values) => {
    update({ instructions: { ...values, artwork: file } });
    router.push("/checkout/shipping");
  };

  const errorMessage = (message) => (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          className={styles.error}
          role="alert"
          initial={reduce ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          <FiAlertCircle aria-hidden="true" />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Reveal className={styles.card}>
        <div className={styles.cardHead}>
          <h2>Special instructions</h2>
          <p className={styles.cardNote}>Optional, but it helps our press team get it right first time.</p>
        </div>

        <div className={styles.form}>
          <div className={`${styles.field} ${errors.notes ? styles.fieldError : ""}`}>
            <div className={styles.counterRow}>
              <label htmlFor="notes">Notes for the print team</label>
              <span className={counterClass} aria-live="polite">
                {used} / {MAX_INSTRUCTIONS}
              </span>
            </div>
            <textarea
              id="notes"
              className={styles.textarea}
              placeholder="Ink colour matches (Pantone), placement notes, how sizes should be bagged, event deadline…"
              aria-invalid={errors.notes ? "true" : "false"}
              {...register("notes", {
                maxLength: {
                  value: MAX_INSTRUCTIONS,
                  message: `Keep instructions under ${MAX_INSTRUCTIONS} characters`,
                },
              })}
            />
            {errorMessage(errors.notes?.message)}
          </div>

          <div className={styles.field}>
            <label htmlFor="reference">
              Company or PO number <span className={styles.optional}>Optional</span>
            </label>
            <div className={`${styles.control} ${styles.hasIcon}`}>
              <FiTag className={styles.leadIcon} aria-hidden="true" />
              <input
                id="reference"
                type="text"
                placeholder="PO-10482"
                {...register("reference", {
                  maxLength: { value: 40, message: "Keep it under 40 characters" },
                })}
              />
            </div>
            <p className={styles.hint}>We print this on your invoice and packing slip.</p>
            {errorMessage(errors.reference?.message)}
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.card} delay={0.06}>
        <div className={styles.cardHead}>
          <h2>Artwork</h2>
          <p className={styles.cardNote}>Optional — send print-ready files if you have them.</p>
        </div>

        {file ? (
          <div className={styles.uploadFile}>
            <span className={styles.uploadFileIcon}>
              <FiFileText size={18} aria-hidden="true" />
            </span>
            <span className={styles.uploadFileText}>
              <span className={styles.uploadFileName}>{file.name}</span>
              <span className={styles.uploadFileMeta}>{formatSize(file.size)} · ready for review</span>
            </span>
            <button
              type="button"
              className={styles.removeFile}
              onClick={removeFile}
              aria-label={`Remove ${file.name}`}
            >
              <FiX size={17} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div
            className={`${styles.upload} ${dragOver ? styles.uploadOver : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              acceptFile(event.dataTransfer.files?.[0]);
            }}
          >
            <span className={styles.uploadIcon}>
              <FiUploadCloud size={20} aria-hidden="true" />
            </span>
            <span className={styles.uploadTitle}>Drop artwork here or browse</span>
            <span className={styles.hint}>
              Vector preferred · {ARTWORK_TYPES.replaceAll(",", ", ")} · up to {MAX_ARTWORK_MB} MB
            </span>
            <input
              ref={inputRef}
              type="file"
              accept={ARTWORK_TYPES}
              aria-label="Upload artwork"
              onChange={(event) => acceptFile(event.target.files?.[0])}
            />
          </div>
        )}

        {errorMessage(fileError)}

        <div
          className={`${styles.check} ${styles.checkCard} ${styles.stackTop} ${
            designReview ? styles.checkCardOn : ""
          }`}
        >
          <label htmlFor="designReview">
            <input id="designReview" type="checkbox" {...register("designReview")} />
            <span className={styles.box} aria-hidden="true">
              <FiCheck />
            </span>
            <span className={styles.checkText}>
              <strong>Free design review before printing</strong>
              A print specialist checks resolution, colour separation and placement, then sends a proof for
              approval. Nothing goes to press until you say so.
            </span>
          </label>
        </div>
      </Reveal>

      <div className={styles.nav}>
        <Link href="/checkout/summary" className="ic_btn ic_btn_secondary ic_btn_lg">
          <FiArrowLeft aria-hidden="true" />
          Back
        </Link>
        <button type="submit" className="ic_btn ic_btn_primary ic_btn_lg">
          Continue to shipping
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
