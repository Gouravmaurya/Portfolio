// reverse the string 

const reverseString = (str) => {
    return str.split('').reverse().join('');
}
console.log(reverseString('hello Gourav'));

// check if the string is palindrome
const isPalindrome = (str) => {
    return str === reverseString(str);
}
console.log(isPalindrome('racecar'));

const addarr = (arr) => {
    return arr.reduce((acc, curr) => acc + curr, 0);
}
console.log(addarr([1, 2, 3, 4, 5]));


// add two array
const addtwoarray = (arr1, arr2) => {
    return arr1.concat(arr2);
}
console.log(addtwoarray([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]));


