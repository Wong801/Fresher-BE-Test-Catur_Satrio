/**
 * Direction:
 * Find prefix of the word from array of string
 *
 * Expected Result:
 * fl
 */
const words = ['flower', 'flow', 'flight'];

function result(words) {
  // Your Code Here
  if(!words || !words.length) {
    return ''
  }
  
  const sorted = words.sort((a,b) => a.length - b.length)

  let shortest = sorted[0]

  while (!words.every(str => str.startsWith(shortest))) {
    if(shortest.length === 0) {
      return
    }
    shortest = shortest.slice(0, -1)
  }
  return shortest
}

console.log(result(words));
