import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import { email } from "../../config/envVar";
import Logger from "../../core/Logger";

type EmailService =
  | "gmail"
  | "mailgun"
  | "sendgrid"
  | "mailjet"
  | "sendinblue"
  | "zoho"
  | "yandex"
  | "qq"
  | "hotmail"
  | "icloud";

interface EmailOptions {
  email: string | undefined;
  subject: string;
  message: string;
  template?: string;
  variables?: Object;
}

export const sendEmail = async (options: EmailOptions) => {
  let transporter: Transporter<unknown>;

  transporter = nodemailer.createTransport({
    host: email.smtpHost,
    port: Number(email.smtpPort),
    secure: true,
    auth: {
      user: email.smtpUser,
      pass: email.smtpPass,
    },
  });

  const mailOptions = {
    from: `${email.smtpUser}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: "",
  };

  if (!options.template) {
    transporter.sendMail(mailOptions, (err: any, res: Response) => {
      if (err) {
        Logger.error(err);
      } else {
        Logger.info("Email sent");
      }
    });
  } else {
    const html = await ejs.renderFile(
      `${__dirname}/templates/${options.template}.ejs`,
      {
        // Just give the file name of the template, without the extension
        name: options.email,
        variables: options.variables,
      }
    );
    mailOptions.html = html;
    transporter.sendMail(mailOptions, (err: any, res: Response) => {
      if (err) {
        console.log(err);
        Logger.error(err);
      } else {
        Logger.info("Email sent");
      }
    });
  }
};
