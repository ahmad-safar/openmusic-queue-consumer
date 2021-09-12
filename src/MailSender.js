import { createTransport } from 'nodemailer'

export default class MailSender {
  constructor() {
    this._transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Songs App',
      to: targetEmail,
      subject: 'Eksport Lagu Playlist',
      text: 'Terlampir hasil dari eksport Lagu Playlist',
      attachments: [
        {
          filename: 'songs.json',
          content,
        },
      ],
    }

    return this._transporter.sendMail(message)
  }
}
