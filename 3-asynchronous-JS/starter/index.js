const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😥'); // what is passed into reject is available in catch handler
      resolve(data); //what is passed into resolve is what is available in the .then handler
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

//Async await makes code looks like synchronous code but in asynchronous mode
//try catch is used for error handling - not async/await, basic JS feature
//await can be used only in an async function
//async/await allows to not use .then handlers
// Async function automatically returns a promise!!!. The value returned is the resolved value of promise
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]); // this is how to pass multiple promises
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err; //If an error is thrown the entire promise is marked as rejected
  }
  return '2: READY 🐶';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic(); //this async function will return a promise, so can you await on it
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();

/*
console.log('1: Will get dog pics!');
// Async function returns a promise, so need to use .then to access output!!!
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics!');
  })
  .catch((err) => {
    console.log('ERROR 💥');
  });
*/

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    //.then is called on the promise returned from readFilePro
    console.log(`Breed: ${data}`);

    //This will do http request
    // .then is a Promise, when promise comes back with data it is a resolved promise
    // a resolved promise might not always be successful, it may be fulfilled or rejected
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file');
  })
  //catch handles rejected promise
  .catch((err) => {
    console.log(err);
  });
  */
