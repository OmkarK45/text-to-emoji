"use client"

import { useEffect, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
}

function CopyButton({ value, className, src, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  async function copyToClipboardWithMeta(value: string) {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(value)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <button
      className="relative z-20 mt-5 inline-flex w-full items-center justify-center rounded-md border-slate-200 p-2 py-10 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 focus:outline-none dark:text-slate-100 dark:hover:bg-slate-800"
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <div className="flex items-center space-x-2">
          <CheckIcon className="h-10 w-10" />
          <p className="text-lg">Copied!</p>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <CopyIcon className="h-10 w-10" />
          <p className="text-lg">Copy</p>
        </div>
      )}
    </button>
  )
}

export default CopyButton
