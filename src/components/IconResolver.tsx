import * as SimpleIcons from '@icons-pack/react-simple-icons'
import * as LucideIcons from 'lucide-react'
import type { ReactNode } from 'react'

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

interface IconResolverProps {
  icon: string
  size?: number
  priority?: 'simple-icons' | 'lucide'
}

export default function IconResolver({ icon, size = 24, priority = 'simple-icons' }: IconResolverProps): ReactNode {
  if (icon.startsWith('http') || icon.startsWith('/')) {
    return <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
  }

  if (icon.length === 1) {
    return <span className="text-2xl">{icon}</span>
  }

  if (priority === 'simple-icons') {
    const siKey = Object.keys(SimpleIcons).find(
      (key) => key.toLowerCase() === `si${icon.toLowerCase()}`
    )
    if (siKey) {
      // biome-ignore lint/performance/noDynamicNamespaceImportAccess: runtime icon lookup by name
      const Icon = SimpleIcons[siKey as keyof typeof SimpleIcons] as React.ComponentType<{ size: number }>
      return <Icon size={size} />
    }

    // biome-ignore lint/performance/noDynamicNamespaceImportAccess: runtime icon lookup by name
    const LucideIcon = LucideIcons[toPascalCase(icon) as keyof typeof LucideIcons] as
      | React.ComponentType<{ size: number }>
      | undefined
    if (LucideIcon) {
      return <LucideIcon size={size} />
    }
  } else {
    // biome-ignore lint/performance/noDynamicNamespaceImportAccess: runtime icon lookup by name
    const LucideIcon = LucideIcons[toPascalCase(icon) as keyof typeof LucideIcons] as
      | React.ComponentType<{ size: number }>
      | undefined
    if (LucideIcon) {
      return <LucideIcon size={size} />
    }

    const siKey = Object.keys(SimpleIcons).find(
      (key) => key.toLowerCase() === `si${icon.toLowerCase()}`
    )
    if (siKey) {
      // biome-ignore lint/performance/noDynamicNamespaceImportAccess: runtime icon lookup by name
      const Icon = SimpleIcons[siKey as keyof typeof SimpleIcons] as React.ComponentType<{ size: number }>
      return <Icon size={size} />
    }
  }

  return <span className="text-2xl">?</span>
}
