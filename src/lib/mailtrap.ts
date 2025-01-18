import { MailtrapClient } from 'mailtrap';

export const EmailClient = new MailtrapClient({
  token: String(process.env.MAILTRAP_TOKEN),
});

export const Sender = {
  email: 'hello@demomailtrap.com',
  name: 'Nishan Kashyap',
};
