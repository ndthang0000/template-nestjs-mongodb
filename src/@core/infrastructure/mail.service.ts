import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envData } from '../config/core.config';

@Injectable()
export class MailerService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport(envData.mail);
	}

	async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
		try {
			await this.transporter.sendMail({
				from: `"Support Team" <no-reply@oktravel.com.vn>`,
				to,
				subject,
				text,
				html,
			});
		} catch (error) {
			console.error('Error sending email:', error);
			throw new Error('Email sending failed');
		}
	}

	async sendOTP(email: string, otp: string): Promise<void> {
		const subject = 'Your OTP Code';
		const text = `Your OTP code is ${otp}. It expires in 5 minutes.`;
		const html = `<p>Your OTP code is <strong>${otp}</strong>. It expires in 5 minutes.</p>`;

		await this.sendMail(email, subject, text, html);
	}
}
