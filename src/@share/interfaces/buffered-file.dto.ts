export class BufferedFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: AppMimeType;
	size: number;
	buffer: Buffer | string;
}

export type AppMimeType = 'image/png' | 'image/jpeg' | 'text/csv; charset=utf-8';
