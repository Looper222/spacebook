

const phrase = 'Spacja dwie';

const countSpaces = (word) => {
    const number = word.match();
}


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

phrase.forEach( e => {
    let v = e.match(mtchWord);
    value.push(v);
});


// const value = phrase.generateArrays(mtchWord);

console.log(value);
