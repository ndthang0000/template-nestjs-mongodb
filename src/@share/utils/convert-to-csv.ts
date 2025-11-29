import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { ObjectMap } from 'csv-writer/src/lib/lang/object';

export interface CustomColumn {
	id: string;
	title: string;
}

async function convertToCsv(name: string, columns: CustomColumn[], data: any[]): Promise<CsvWriter<ObjectMap<any>>> {
	const csvWriter = createCsvWriter({
		path: name, // Temporary file (won't actually be created)
		header: columns,
		encoding: 'utf8', // Explicitly set encoding
		alwaysQuote: true, // Ensure all text fields are quoted
	});
	// Convert data to CSV format
	await csvWriter.writeRecords(data);
	return csvWriter;
}

export default convertToCsv;
