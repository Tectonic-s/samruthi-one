import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { timingSafeEqual } from 'crypto'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const rawPage = parseInt(searchParams.get('page') ?? '1', 10)
  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage)
  const status = searchParams.get('status') ?? ''
  const search = searchParams.get('search') ?? ''
  const PAGE = 25

  const where: Record<string, unknown> = { deleted: false }
  if (status && !search) where.status = status
  if (search) {
    where.AND = [
      { deleted: false },
      ...(status ? [{ status }] : []),
      { OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { referenceId: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]},
    ]
    delete where.deleted
  }

  const [leads, total] = await Promise.all([
    prisma.enquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * PAGE, take: PAGE }),
    prisma.enquiry.count({ where }),
  ])

  return NextResponse.json({ leads, total, page, totalPages: Math.ceil(total / PAGE) })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, status, notes, delete: doDelete, passphrase } = await req.json()

  if (doDelete) {
    const expected = process.env.DELETE_PASSPHRASE ?? ''
    const provided = passphrase ?? ''
    // timingSafeEqual requires equal-length buffers
    const a = Buffer.alloc(Math.max(expected.length, provided.length))
    const b = Buffer.alloc(Math.max(expected.length, provided.length))
    Buffer.from(expected).copy(a)
    Buffer.from(provided).copy(b)
    if (!timingSafeEqual(a, b) || provided.length !== expected.length)
      return NextResponse.json({ error: 'Invalid passphrase' }, { status: 403 })
    await prisma.enquiry.update({ where: { id: Number(id) }, data: { deleted: true } })
    return NextResponse.json({ success: true })
  }

  const updated = await prisma.enquiry.update({
    where: { id: Number(id), deleted: false },
    data: { ...(status && { status }), ...(notes !== undefined && { notes }) }
  })
  return NextResponse.json({ success: true, lead: updated })
}
