import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import ExcelJS from 'exceljs'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? ''
  const where: Record<string, unknown> = { deleted: false }
  if (status) where.status = status

  const leads = await prisma.enquiry.findMany({ where, orderBy: { createdAt: 'desc' }, take: 10_000 })

  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Leads')

  ws.columns = [
    { header: 'Ref ID', key: 'referenceId', width: 14 },
    { header: 'Date', key: 'createdAt', width: 20 },
    { header: 'Name', key: 'name', width: 22 },
    { header: 'Phone', key: 'phone', width: 16 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Business Type', key: 'businessType', width: 18 },
    { header: 'Facility', key: 'facility', width: 24 },
    { header: 'Loan Amount', key: 'loanAmount', width: 14 },
    { header: 'Turnover', key: 'turnover', width: 14 },
    { header: 'Status', key: 'status', width: 14 },
  ]

  ws.getRow(1).eachCell(cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0A0A0A' } }
    cell.font = { bold: true, color: { argb: 'FFFFC800' }, size: 10 }
    cell.alignment = { vertical: 'middle' }
  })
  ws.getRow(1).height = 22

  leads.forEach(l => ws.addRow({
    referenceId: l.referenceId,
    createdAt: l.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: l.name, phone: l.phone, email: l.email,
    businessType: l.businessType, facility: l.facility,
    loanAmount: l.loanAmount, turnover: l.turnover, status: l.status,
  }))

  const buffer = await wb.xlsx.writeBuffer()
  const today = new Date().toISOString().split('T')[0]

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="samruthi-leads-${today}.xlsx"`,
    },
  })
}
