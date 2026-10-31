"use client";
import katex from "katex";
import { Fragment, useMemo } from "react";

type Part = { math: boolean; value: string };

function parse(text: string): Part[] {
  const PH = "\u0000";
  const safe = text.replace(/\\\$/g, PH);
  const segs = safe.split("$");
  if (segs.length % 2 === 0) return [{ math: false, value: text.replace(/\\\$/g, "$") }];
  return segs.map((s, i) => ({ math: i % 2 === 1, value: s.split(PH).join(i % 2 ? "\\$" : "$") }));
}

function renderText(value: string, key: number) {
  const pieces = value.split(/(_{4,})/);
  return (
    <Fragment key={key}>
      {pieces.map((p, i) =>
        /^_{4,}$/.test(p) ? (
          <span key={i} className="blank" aria-label="blank" />
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </Fragment>
  );
}

/** Renders text with $...$ math (KaTeX) and ______ blanks. Write a literal dollar as \$. */
export default function MathText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => parse(text), [text]);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.math ? (
          <span
            key={i}
            className="math"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(p.value, { throwOnError: false, output: "htmlAndMathml" }),
            }}
          />
        ) : (
          renderText(p.value, i)
        ),
      )}
    </span>
  );
}
