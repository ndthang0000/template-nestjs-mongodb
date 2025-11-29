import './env';

export default function coreConfig() {
	return {
		port: parseInt(process.env.PORT || '3000', 10),
		database: {
			mongoDBUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/than-do-so-local',
		},
		jwt: {
			secretUser: process.env.JWT_SECRET,
			secretAdmin: process.env.JWT_SECRET_ADMIN,
			refreshSecretUser: process.env.REFRESH_JWT_SECRET,
			refreshSecretAdmin: process.env.REFRESH_JWT_SECRET_ADMIN,
			jwtExpiresTime: process.env.JWT_EXPIRES_TIME || '8h',
			refreshJwtExpiresTime: process.env.REFRESH_JWT_EXPIRES_TIME || '30d',
		},
		env: process.env.NODE_ENV || 'local',
		redis: {
			host: process.env.REDIS_HOST || 'localhost',
			prefix: process.env.REDIS_PREFIX || 'test',
			port: parseInt(process.env.REDIS_PORT || '6379', 10),
		},
		projectName: process.env.PROJECT_NAME || 'OK-Travel',
		s3: {
			region: process.env.AWS_REGION || 'us-east-1',
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
			bucket: process.env.AWS_S3_BUCKET || 'test',
		},
		mail: {
			host: process.env.MAIL_HOST, // e.g., smtp-relay.sendinblue.com for Brevo
			port: Number(process.env.MAIL_PORT) || 587,
			secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		},
	};
}
export const envData = coreConfig();
