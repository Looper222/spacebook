

const phrase = 'Spacja dwie';

// const countSpaces = (word) => {
//     const number = word.match();
// };


// if (phrase.includes(' ') && ) {

// }

const mtchWord = new RegExp('\s\w*(?!\s)', 'i');

// let matchedArray = [];

// const generateArrays = (mtchWord) => {
//     const matchedArray = [];

//     mtchWord.forEach(e => {
//         matchedArray.push(e);
//     });

//     return matchedArray;
// };

// const generateArrays = (phrase) => {
//     const matchedArray = [];

//     phrase.forEach(e => {
//         matchedArray.push(e);
//     });

//     return matchedArray;
// };
const value = [];

// The last the best
// const generateArrays = (word, signature) => {
//     word.forEach( e => {
//         let v = e.match(signature);
//         value.push(v);
//     });
// };

// generateArrays(phrase, mtchWord);

// const value = phrase.generateArrays(mtchWord);
const matchedSignature = new RegExp('\w*(?!\s)', 'i');

const splittedValue = phrase.split()

console.log(value);
console.log(splittedValue);
