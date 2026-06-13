export interface Service {
  slug: string
  name: string
  category: string
  shortDesc: string
  fullDesc: string
  interestRate: string
  keyFeatures: string[]
  eligibility: string[]
  documents: string[]
  loanRange: string
  processingTime: string
}

export interface Lead {
  id: number
  referenceId: string
  createdAt: string
  updatedAt: string
  name: string
  phone: string
  email: string
  businessType: string
  facility: string
  loanAmount: string
  turnover: string
  message: string | null
  status: string
  assignedTo: string | null
  notes: string | null
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed'
