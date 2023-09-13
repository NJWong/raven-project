'use client'

import { useState, useEffect, FormEvent, MouseEvent } from 'react'
import { Heading } from '@/components/Heading'
import { CodeGroup } from '@/components/Code'
import { apiPathV1 } from '../consts/paths'

export function TryItOut() {
  const [requestInput, setRequestInput] = useState('parts/core/7')
  const [responsePath, setResponsePath] = useState(`${apiPathV1}/parts/core/7`)
  const [response, setResponse] = useState('')

  useEffect(() => {
    sendRequest(`${apiPathV1}/${requestInput}`)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    sendRequest(`${apiPathV1}/${requestInput}`)
  }

  async function handleClick(example: string) {
    // Set the input field to the selected example
    setRequestInput(example)

    sendRequest(`${apiPathV1}/${example}`)
  }

  async function sendRequest(path: string) {
    const res = await fetch(path)

    const data = await res.json()

    setResponse(data)
    setResponsePath(path)
  }

  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="try-it-out">
        Try it out!
      </Heading>

      <form className="flex w-full items-center" onSubmit={handleSubmit}>
        <div className="overflow-auto whitespace-nowrap rounded-l-lg bg-zinc-200 p-3 font-mono text-lg dark:bg-zinc-800 dark:text-zinc-100">
          {apiPathV1.split('https://')[1]}
        </div>
        <input
          className="p-3 font-mono text-lg ring-1 ring-inset ring-zinc-200 dark:text-zinc-100 dark:ring-zinc-600"
          type="text"
          value={requestInput}
          onChange={(e) => setRequestInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg bg-zinc-900 p-3 text-white hover:bg-zinc-700 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-1 dark:ring-inset dark:ring-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-300 dark:hover:ring-rose-300"
        >
          Submit
        </button>
      </form>

      <div>
        <ul>
          <li>
            <button
              className="font-bold text-rose-500 hover:underline"
              onClick={() => handleClick('parts/core?offset=5')}
            >
              parts/core?offset=5
            </button>
          </li>
          <li>
            <button
              className="font-bold text-rose-500 hover:underline"
              onClick={() => handleClick('parts/specs/10')}
            >
              parts/specs/10
            </button>
          </li>
          <li>
            <button
              className="font-bold text-rose-500 hover:underline"
              onClick={() => handleClick('ac/specs')}
            >
              ac/specs
            </button>
          </li>
        </ul>
      </div>

      {response && (
        <div>
          <CodeGroup
            title="Response"
            tag="GET"
            label={responsePath}
            code={JSON.stringify(response, null, 2)}
          >
            <code>{JSON.stringify(response, null, 2)}</code>
          </CodeGroup>
        </div>
      )}
    </div>
  )
}
