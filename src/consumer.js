import dotenv from 'dotenv'
dotenv.config()
import { connect } from 'amqplib'
import SongsService from './SongsService'
import MailSender from './MailSender'
import Listener from './Listener'

const init = async () => {
  const songsService = new SongsService()
  const mailSender = new MailSender()
  const listener = new Listener(songsService, mailSender)

  const connection = await connect(process.env.RABBITMQ_SERVER)
  const channel = await connection.createChannel()
  const queueName = 'export:songs'

  await channel.assertQueue(queueName, {
    durable: true,
  })

  channel.consume(queueName, listener.listen, { noAck: true })
}
init()
