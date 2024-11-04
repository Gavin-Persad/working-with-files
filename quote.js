import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const fileName = 'quotes.json';

export async function getQuotes() {
	const quotes = await fs.readFile(fileName, 'utf8');
	return JSON.parse(quotes);
}

export async function addQuote(quoteText) {
	const quotes = await getQuotes();
	const newQuote = {
		id: uuidv4(),
		text: quoteText,
	};
	quotes.push(newQuote);
	await fs.writeFile(fileName, JSON.stringify(quotes, null, 2));
	return newQuote;
}

export async function getRandomQuote() {
	const quotes = await getQuotes();
	return quotes[Math.floor(Math.random() * quotes.length)];
}

export async function editQuote(id, quoteText) {}

export async function deleteQuote(id) {}
