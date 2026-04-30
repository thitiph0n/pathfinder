export interface UrlEntry {
  label: string
  url: string
}

export interface App {
  name: string
  url?: string
  urls?: UrlEntry[]
  icon: string
  description?: string
}

export interface Group {
  name: string
  icon: string
  apps: App[]
}

export interface Config {
  title: string
  logo?: string
  groups: Group[]
}
