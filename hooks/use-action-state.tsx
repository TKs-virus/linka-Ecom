"use client"

import { useFormState, type FormStateAction, useFormStatus } from "react-dom"
import { useTransition } from "react"

/**
 * Lightweight polyfill for the upcoming React `useActionState` API.
 * Returns the same `[state, action, isPending]` tuple expected by existing code.
 */
export function useActionState<S, P extends FormData = FormData>(
  action: FormStateAction<S, P>,
  initialState: S,
): readonly [S, (payload: P) => void, boolean] {
  // React’s official API splits state & isPending; we stitch them together.
  const [state, formAction] = useFormState(action, initialState)
  const { pending } = useFormStatus()
  const [, startTransition] = useTransition()

  // action runner so components can still call the function directly
  const wrappedAction = (payload: P) => {
    startTransition(() => formAction(payload))
  }

  return [state, wrappedAction, pending]
}
