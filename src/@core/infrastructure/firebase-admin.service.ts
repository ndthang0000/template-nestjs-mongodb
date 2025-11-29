import * as admin from 'firebase-admin';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { BaseMessage } from 'firebase-admin/messaging';
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
	constructor() {
		// Initialize Firebase Admin SDK
		if (admin.apps.length === 0) {
			admin.initializeApp({
				credential: admin.credential.cert(require('../config/firebase.json')),
			});
		}
	}

	private logger = new Logger(FirebaseService.name);

	async verifyToken(token: string): Promise<DecodedIdToken> {
		try {
			return await admin.auth().verifyIdToken(token);
		} catch (error) {
			this.logger.error('Token verification error:', error);
			throw new BadRequestException('Invalid token');
		}
	}

	async getUser(uid: string): Promise<UserRecord> {
		return await admin.auth().getUser(uid);
	}

	async subscribeTopic(tokens: string[], topic: string) {
		return await admin.messaging().subscribeToTopic(tokens, topic);
	}

	async unSubscribeTopic(tokens: string[], topic: string) {
		return await admin.messaging().unsubscribeFromTopic(tokens, topic);
	}

	async sendNotificationTopicFCM(topic: string, message: BaseMessage) {
		try {
			message.data = _.omitBy(message.data, _.isNil);
			message.notification = _.omitBy(message.notification, _.isNil);
			const result = await admin.messaging().send({
				topic,
				...message,
			});
			this.logger.log(`sendNotificationTopicFCM ${topic}: ${result}`);
			return result;
		} catch (e) {
			this.logger.error(`ERR sendNotificationTopicFCM ${topic}:`, e.message);
			return null;
		}
	}
}
