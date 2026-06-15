import { Resend } from 'resend'

function client() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

export async function sendConfirmation({ to, name, referenceId, facility }: { to: string; name: string; referenceId: string; facility: string }) {
  return client().emails.send({
    from: 'Samruthi One <noreply@samruthione.in>',
    to,
    subject: `Enquiry received — ${referenceId}`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px">
      <div style="background:#0a0a0a;padding:20px 28px;border-radius:4px 4px 0 0">
        <span style="color:#fff;font-weight:700;font-size:1.1rem">Samruthi One</span>
        <span style="color:#F7C83C;font-size:0.7rem;margin-left:10px;letter-spacing:0.1em;text-transform:uppercase">Financing Simplified</span>
      </div>
      <div style="border:1px solid #e8e8e8;border-top:none;padding:28px;border-radius:0 0 4px 4px">
        <p style="color:#333;margin-bottom:16px">Dear ${name},</p>
        <p style="color:#333;margin-bottom:20px">Your enquiry has been received. A relationship manager will contact you within <strong>2 business hours</strong>.</p>
        <div style="background:#FFFBEE;border:1px solid #FFE680;border-radius:4px;padding:16px;text-align:center;margin-bottom:20px">
          <p style="font-size:0.65rem;color:#888;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:4px">Reference ID</p>
          <p style="font-size:1.6rem;font-weight:700;color:#0a0a0a;letter-spacing:0.08em">${referenceId}</p>
        </div>
        <p style="color:#555;font-size:0.85rem">Facility: <strong>${facility}</strong></p>
        <hr style="border:none;border-top:1px solid #f0f0f0;margin:20px 0" />
        <p style="color:#aaa;font-size:0.75rem">+91 98400 00000 · hello@samruthione.in · Mon–Sat 8AM–6PM</p>
      </div>
    </div>`,
  })
}

export async function sendAdminAlert({ referenceId, name, phone, email, facility, loanAmount }: { referenceId: string; name: string; phone: string; email: string; facility: string; loanAmount: string }) {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'hello@samruthione.in'
  return client().emails.send({
    from: 'Samruthi One System <noreply@samruthione.in>',
    to: adminEmail,
    subject: `New Lead ${referenceId} — ${facility} — ${name}`,
    html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px">
      <h2 style="color:#0a0a0a;margin-bottom:16px">New Enquiry Received</h2>
      <table style="width:100%;border-collapse:collapse;font-size:0.875rem">
        ${[['Ref ID',referenceId],['Name',name],['Phone',phone],['Email',email],['Facility',facility],['Loan Amount',loanAmount]].map(([l,v],i)=>`<tr style="background:${i%2===0?'#f9f9f9':'#fff'}"><td style="padding:10px 14px;color:#888;width:35%;border:1px solid #ebebeb">${l}</td><td style="padding:10px 14px;color:#0a0a0a;border:1px solid #ebebeb"><strong>${v}</strong></td></tr>`).join('')}
      </table>
      <a href="${process.env.NEXTAUTH_URL ?? 'http://localhost:5030'}/admin" style="display:inline-block;margin-top:20px;background:#0a0a0a;color:#F7C83C;padding:12px 24px;text-decoration:none;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-radius:3px">View in Dashboard →</a>
    </div>`,
  })
}
