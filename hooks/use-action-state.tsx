"use client"

import { startTransition, useState, useTransition } from "react"

/**
 * Tiny poly-fill for React 19’s `useActionState`.
 *   - `action` must be an async function that returns the new state.
 *   - Returned tuple:  [state, boundAction, isPending]
 */
export function useActionState<State>(
  action: (prevState: State | undefined, formData: FormData) => Promise<State>,
  initialState: State,
): [State, (formData: FormData) => void, boolean] {
  const [state, setState] = useState<State>(initialState)
  const [isPending, start] = useTransition()

  async function boundAction(formData: FormData) {
    // keep UI responsive with a transition
    start(async () => {
      const newState = await action(state, formData)
      // `startTransition` so React 18 doesn’t block input
      startTransition(() => setState(newState))
    })
  }

  return [state, boundAction, isPending]
}
