"use server";

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Função para gerar um token único
function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

// Configuração do transporter do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const prisma = new PrismaClient();

export async function resetPassword(email: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    return {
      success: false,
      message: "E-mail ou Senha incorreto. Por favor, tente novamente.",
    };
  } else {
    try {
      const token = generateToken();
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Redefinição de Senha",
        text: `Você solicitou a redefinição de sua senha. Por favor, clique no link a seguir para redefinir sua senha: ${resetLink}`,
        html: `
          <p>Você solicitou a redefinição de sua senha.</p>
          <p>Por favor, clique no link a seguir para redefinir sua senha:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>Se você não solicitou esta redefinição, por favor ignore este e-mail.</p>
        `,
      };
      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      return {
        success: true,
        message:
          "Um e-mail com instruções para redefinir sua senha foi enviado.",
      };
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha:", error);
      return {
        success: false,
        message:
          "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
      };
    }
  }
}
