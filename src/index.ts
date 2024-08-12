import * as fs from 'fs';
import axios from 'axios'; // Importazione corretta di axios
import * as readline from 'readline-sync';



// Funzione per leggere il contenuto del file
async function readFileContent(path: string): Promise<string> {
  if (path.startsWith('http')) {
    const response = await axios.get(path);
    return response.data;
  } else {
    return fs.promises.readFile(path, 'utf-8');
  }
}

// Funzione per analizzare il contenuto
export function analyzeContent(content: string) {
  const wordCounts = new Map<string, number>();
  let totalWords = 0;
  let totalLetters = 0;
  let totalSpaces = 0;

  const words = content.split(/\s+/);
  words.forEach(word => {
    totalWords++;
    totalLetters += word.length;
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  });

  totalSpaces = (content.match(/\s+/g) || []).length;

  const frequentWords = Array.from(wordCounts.entries())
    .filter(([_, count]) => count > 10)
    .map(([word, count]) => ({ word, count }));

  return {
    totalWords,
    totalLetters,
    totalSpaces,
    frequentWords,
  };
}

// Funzione principale
async function main() {
  const path = readline.question('Inserisci il path del file (locale o URL): ');
  try {
    const content = await readFileContent(path);
    const result = analyzeContent(content);
    console.log(`Numero totale di parole: ${result.totalWords}`);
    console.log(`Numero totale di lettere: ${result.totalLetters}`);
    console.log(`Numero totale di spazi: ${result.totalSpaces}`);
    console.log('Parole che si ripetono più di 10 volte:');
    result.frequentWords.forEach(({ word, count }) => {
      console.log(`"${word}": ${count} volte`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Ora TypeScript sa che 'error' è un'istanza di 'Error'
    } else {
      console.error('An unknown error occurred'); // Gestisci il caso in cui l'errore non è un'istanza di 'Error'
    }
  }
}

// Avvio del programma
main();
