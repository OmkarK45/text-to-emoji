"use client"

import React, { useEffect, useState } from "react"
import Head from "next/head"
import { HeartIcon } from "lucide-react"

import { imageUrls } from "@/lib/constants"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import CopyButton from "@/components/ui/copy-button"
import { Textarea } from "@/components/ui/textarea"

export function App() {
  const [text, setText] = useState("")
  const [emojiText, setEmojiText] = useState("")
  const [hasMounted, setHasMounted] = useState(false)

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      text: { value: string }
    }
    const enteredValue = target.text.value

    const finalValue = enteredValue
      .split("")
      .map((t) => {
        if (t === "\n" || !t.trim()) {
          return " "
        }
        return `:${t.toLowerCase()}le:`
      })
      .join("")

    setEmojiText(finalValue)
  }

  return (
    <Layout>
      <Head>
        <title>TextEmote</title>
        <meta
          name="description"
          content="Generate Discord NQN Text emoji from plain text"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Easily generate Discord emojis from plain text.
          </h1>
          <p className="mt-5 max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Just type plain text in the textbox below and hit convert. Paste the
            output in discord.
          </p>
        </div>
      </section>

      <section className="container space-y-10">
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit}>
            <Textarea
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-md"
            />
            <Button className="mt-5 w-full py-10 text-lg" type="submit">
              Convert
            </Button>
          </form>
        </div>
        <h1 className="text-lg">Preview</h1>

        <div className="flex max-w-2xl flex-wrap space-x-2">
          {text.split("").map((t, idx) => {
            if (!imageUrls.static[`${t.toLowerCase()}le`]) {
              return <span className="mx-2" />
            }
            return (
              <img
                key={`${t}${idx}`}
                className="mt-2 block h-12 w-12 rounded-xl border border-gray-100 p-2 "
                alt={t}
                src={imageUrls.static[`${t.toLowerCase()}le`]}
              />
            )
          })}
        </div>

        <div className="max-w-2xl">
          <h1 className="mb-5 text-lg">Output</h1>
          <Textarea
            name="text"
            value={emojiText}
            className="text-md"
            readOnly
          />
          <CopyButton value={emojiText ?? ""} />
        </div>

        <footer className="flex max-w-2xl pb-10 items-center justify-center">
          Made with Love <HeartIcon className="mx-2" /> by Omkar
        </footer>
      </section>
    </Layout>
  )
}
