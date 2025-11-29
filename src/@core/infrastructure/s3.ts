import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { envData } from '@core/config/core.config';
import { BufferedFile } from '@share/interfaces/buffered-file.dto';

@Injectable()
export default class S3Service {
	private readonly s3: S3Client;
	private readonly bucketName: string;

	constructor() {
		this.s3 = new S3Client({
			region: envData.s3.region,
			credentials: {
				accessKeyId: envData.s3.accessKeyId,
				secretAccessKey: envData.s3.secretAccessKey,
			},
		});
		this.bucketName = envData.s3.bucket;
	}

	/**
	 * Upload a file to S3
	 */
	async uploadFile(file: BufferedFile): Promise<any> {
		const fileKey = `storage/${randomUUID()}-${file.originalname}`;

		await this.s3.send(
			new PutObjectCommand({
				Bucket: this.bucketName,
				Key: fileKey,
				Body: file.buffer,
				ContentType: file.mimetype,
				ContentEncoding: file.encoding,
			}),
		);
		return {
			fileKey,
			url: this.getFileUrl(fileKey),
		}; // Return file key for retrieval
	}

	/**
	 * Get file URL from S3
	 */
	getFileUrl(fileKey: string): string {
		return `https://${this.bucketName}.s3.${envData.s3.region}.amazonaws.com/${fileKey}`;
	}

	/**
	 * Delete a file from S3
	 */
	async deleteFile(fileKey: string): Promise<boolean> {
		await this.s3.send(
			new DeleteObjectCommand({
				Bucket: this.bucketName,
				Key: fileKey,
			}),
		);
		return true;
	}

	async uploadCSVFile(csvData: any, fileName: string): Promise<any> {
		const fileKey = `storage/${fileName}`;

		await this.s3.send(
			new PutObjectCommand({
				Bucket: this.bucketName,
				Key: fileKey,
				Body: csvData,
				ContentType: 'text/csv',
			}),
		);
		return {
			fileKey,
			url: this.getFileUrl(fileKey),
		}; // Return file key for retrieval
	}
}
