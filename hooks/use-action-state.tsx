"use client"

import { useCallback, useRef, useState, useTransition } from "react"

type ActionState<T> = T | null
type ActionFunction<T> = (prevState: T | null, formData: FormData) => Promise<T>

export function useActionState<T>(
  action: ActionFunction<T>,
  initialState: T | null = null,
): [ActionState<T>, (formData: FormData) => void, boolean] {
  const [state, setState] = useState<ActionState<T>>(initialState)
  const [isPending, startTransition] = useTransition()
  const actionRef = useRef(action)
  actionRef.current = action

  const dispatch = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        try {
          const result = await actionRef.current(state, formData)
          setState(result)
        } catch (error) {
          console.error("Action failed:", error)
        }
      })
    },
    [state],
  )

  return [state, dispatch, isPending]
}
