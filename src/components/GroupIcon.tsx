import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'

const IconResolver = lazy(() => import('./IconResolver'))

interface GroupIconProps {
  icon: string
}

export function GroupIcon({ icon }: GroupIconProps): ReactNode {
  return (
    <Suspense fallback={<span className="text-2xl">?</span>}>
      <IconResolver icon={icon} priority="lucide" />
    </Suspense>
  )
}
