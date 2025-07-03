import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactEmailData {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <noreply@yourdomain.com>", // You'll need to verify this domain
      to: ["ramyabhat93@gmail.com"],
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.phoneNumber ? `<p><strong>Phone:</strong> <a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></p>` : ""}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #212529;">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
            <p>This email was sent from your website contact form on ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
${data.phoneNumber ? `Phone: ${data.phoneNumber}` : ""}

Message:
${data.message}

Sent on: ${new Date().toLocaleString()}
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error: any) {
    console.error("Email sending error:", error)
    return { success: false, error: error.message || "Failed to send email" }
  }
}
