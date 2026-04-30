import type { Group, App } from '../types'
import { GroupIcon } from './GroupIcon'
import { AppCard } from './AppCard'

interface GroupSectionProps {
  group: Group
  filteredApps: App[]
}

export function GroupSection({ group, filteredApps }: GroupSectionProps) {
  if (filteredApps.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="opacity-70">
          <GroupIcon icon={group.icon} />
        </div>
        <h2 className="text-2xl font-bold">{group.name}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredApps.map((app) => (
          <AppCard key={app.name} app={app} />
        ))}
      </div>
    </section>
  )
}
