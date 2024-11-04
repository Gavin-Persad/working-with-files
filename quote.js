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

export async function editQuote(id, quoteText) {
	const quotes = await getQuotes();
	const quoteIndex = quotes.findIndex((quote) => quote.id === id);
	if (quoteIndex === -1) {
		return null;
	}
	quotes[quoteIndex].text = quoteText;
	await fs.writeFile(fileName, JSON.stringify(quotes, null, 2));
	return quotes[quoteIndex];
}

export async function deleteQuote(id) {}
