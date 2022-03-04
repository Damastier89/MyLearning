const nums1 = [1, 2, 3, 1]; // true
const nums2 = [1, 2, 3, 4]; // false
const nums3 = [1,1,1,3,3,4,3,2,4,2] // true

function checkMatches(arr) {
  let result = [];
  for(let i of arr) {
    if(!result.includes(i)) {
      result.push(i)
    }
  }
  return result;
}

function checkMatches(arr) {
  let valueArr = new Set();
  let isDublicate = arr.some( item => {
    return valueArr.size === valueArr.add(item).size;
  });
  return isDublicate;
}

function checkMatches(arr) {
  let valueArr = arr.map( item => { return item });
  let isDublicate = valueArr.some( (item, idx) => {
    return valueArr.indexOf(item) != idx;
  });
  return isDublicate;
}

const res1 = checkMatches(nums1);
const res2 = checkMatches(nums2);
const res3 = checkMatches(nums3);
console.log(res1);
console.log(res2);
console.log(res3);