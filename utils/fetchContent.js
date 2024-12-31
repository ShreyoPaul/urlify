import axios from 'axios';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

async function fetchContent(url) {
  try {
    const { data } = await axios.get(url);
    
    // Create a DOM from the HTML
    const dom = new JSDOM(data);

    // Use Readability to extract the main content
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    // Output the content (article.textContent is the main content without tags)
    return cleanHTMLContent(article.textContent);
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

function cleanHTMLContent(inputText) {
    // Replace \n and \t with a single space, then trim extra spaces
    const cleanedText = inputText
      .replace(/\\n/g, ' ') // Replace all \n with a space
      .replace(/\\t/g, ' ') // Replace all \t with a space
      .replace(/\s+/g, ' ') // Remove extra spaces
      .trim();              // Trim leading/trailing spaces
  
    return cleanedText;
  }

export default fetchContent;
