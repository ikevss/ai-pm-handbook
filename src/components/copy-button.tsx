"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CopyButton({
  text,
  label = "复制",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={copied ? "secondary" : "outline"}
      size="sm"
      onClick={onCopy}
    >
      {copied ? (
        <Check className="mr-1 h-4 w-4" />
      ) : (
        <Copy className="mr-1 h-4 w-4" />
      )}
      {copied ? "已复制" : label}
    </Button>
  );
}