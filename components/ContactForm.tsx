"use client";

import { useId, useState } from "react";
import { contact } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Contact form.
 *
 * Validates every field client side, then opens the visitor's mail app with a
 * draft addressed to contact.email, filled in from the form. Nothing is posted
 * to a server, so a message only leaves the page once the visitor sends the
 * draft themselves.
 */
export default function ContactForm() {
  const id = useId();
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: contact.form.subjects[0] as string,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) {
      next.name = "Enter your name so we know who we are replying to.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "That email address is not valid. Check for a typo.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Add a little more detail, at least ten characters.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setOpened(false);
      /* Send the cursor to the first field that needs attention. */
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      if (first) document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    const name = values.name.trim();
    const subject = `${values.subject}: message from ${name}`;
    const body = `${values.message.trim()}\n\n---\nFrom: ${name} <${values.email.trim()}>`;
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setOpened(true);
    window.location.href = href;
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field as keyof Errors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
    if (opened) setOpened(false);
  }

  const field =
    "field body-3";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="title-4 block text-ink">
            {contact.form.name}
            <span className="text-danger" aria-hidden="true">
              {" "}*
            </span>
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            required
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            onChange={(e) => update("name", e.target.value)}
            className={`${field} mt-2`}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="body-6 mt-2 text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="title-4 block text-ink">
            {contact.form.email}
            <span className="text-danger" aria-hidden="true">
              {" "}*
            </span>
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            onChange={(e) => update("email", e.target.value)}
            className={`${field} mt-2`}
          />
          {errors.email && (
            <p id={`${id}-email-err`} className="body-6 mt-2 text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-subject`} className="title-4 block text-ink">
          {contact.form.subject}
        </label>
        <select
          id={`${id}-subject`}
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={`${field} mt-2`}
        >
          {contact.form.subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="title-4 block text-ink">
          {contact.form.message}
            <span className="text-danger" aria-hidden="true">
              {" "}*
            </span>
        </label>
        <textarea
          id={`${id}-message`}
          rows={6}
          required
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          onChange={(e) => update("message", e.target.value)}
          className={`${field} mt-2 resize-y`}
        />
        {errors.message && (
          <p id={`${id}-message-err`} className="body-6 mt-2 text-danger">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-lime">
          {contact.form.submit}
        </button>

        {opened && (
          <p role="status" className="body-6 text-ink-soft">
            Your mail app should open with the message ready. If it does not,
            write to {contact.email} directly.
          </p>
        )}
      </div>
    </form>
  );
}
