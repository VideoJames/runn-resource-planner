export type ProjectStatus = 'active' | 'completed' | 'on-hold'

export interface Person {
  id: string
  name: string
  role: string
  capacity_hours_per_week: number
}

export interface Project {
  id: string
  name: string
  colour: string
  status: ProjectStatus
}

export interface Allocation {
  id: string
  personId: string
  projectId: string
  week_start_date: string // ISO date string, e.g. "2026-04-27"
  hours: number
}
