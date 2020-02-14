function sortArr(arr) {
    return arr.sort((a, b) => a - b);
}

function errorHandling(candies, threshold) {
    if (candies.length < 0 || candies.length > 10 ** 5 || !Array.isArray(candies)) {
        return 'Candies must be a valid array and their count must be between 0 and 1 000 00.';
    }
    const areValidNumbers = candies.every(num => num >= 0 && num <= 100 && typeof num === 'number');
    if (!areValidNumbers) {
        return 'Each candy\'s sugar grams must be a valid integer between 0 and 100.';
    }
    if (threshold < 1 || threshold > 10 ** 9 || typeof threshold !== 'number') {
        return 'Sugar high threshold must be a valid integer between 1 and 1 000 000 000.';
    }
    return false;
}

function sugarHigh(candies, threshold) {
    const error = errorHandling(candies, threshold);
    if (error) {
        return error;
    }
    let currSum = 0;
    const originalArrCopy = [...candies]; //using this for index reference
    const sortedOriginalArr = sortArr(candies);
    const possibleIndicesArr = [];
    for (let i = 0; i < sortedOriginalArr.length; i++) {
        if (sortedOriginalArr[i] <= threshold && sortedOriginalArr[i] + currSum <= threshold) {
            const findIndexOfOriginal = originalArrCopy.indexOf(sortedOriginalArr[i]); //finding the first possible index
            originalArrCopy.splice(findIndexOfOriginal, 1, 'FLAGGED'); //marking this index as used so that if the number is the same it won't match
            possibleIndicesArr.push(findIndexOfOriginal);
            currSum += sortedOriginalArr[i];
            if (currSum === threshold) {
                break;
            }
        }
    }
    return sortArr(possibleIndicesArr);
}

console.log(sugarHigh([33, 20, 1, 3, 29], 33));
console.log(sugarHigh([62, 67, 100], 8));
console.log(sugarHigh([16, 39, 67, 16, 38, 71], 17));
console.log(sugarHigh([16, 3, 14, 17, 11], 99));