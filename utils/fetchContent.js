// const axios = require('axios');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');


// const fetchContent = async (url) => {
//   try {
//     const urlFetch = await fetch(url);

//     console.log(urlFetch.body)

//     const {data} = await axios.get(url)
//     // console.log("data: ", data)

//     // Create a DOM from the HTML
//     const dom = new JSDOM(data);

//     // Use Readability to extract the main content
//     const reader = new Readability(dom.window.document);
//     const article = reader.parse();

//     // Output the content (article.textContent is the main content without tags)
//     return cleanHTMLContent(article.textContent);
//   } catch (error) {
//     console.error('Error fetching content:', error);
//   }
// }

const fetchContent = async (url) => {
  try {
    // Make the HTTP request using fetch
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response text
    const data = await response.text();

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
};


function cleanHTMLContent(inputText) {
  // Replace \n and \t with a single space, then trim extra spaces
  const cleanedText = inputText
    .replace(/\\n/g, ' ') // Replace all \n with a space
    .replace(/\\t/g, ' ') // Replace all \t with a space
    .replace(/\s+/g, ' ') // Remove extra spaces
    .trim();              // Trim leading/trailing spaces

  return cleanedText;
}

module.exports = { fetchContent };
