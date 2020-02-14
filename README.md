## Detailed explanation - Sugar High Task

First I establish a simple helper function that takes an array and using JS sort() method returns the sorted array.
`function sortArr(arr) {
     return arr.sort((a, b) => a - b);
 }`
 
 Next, with another helper `function errorHanding(candies,threshold)` handle possible errors.
 
 First I check if the candies array length is not in the possible limits and whether the passed parameter is actually an array.If not, an error message is returned.
 
 ` if (candies.length < 0 || candies.length > 10 ** 5 || !Array.isArray(candies)) {
          return 'Candies must be a valid array and their count must be between 0 and 1 000 00.';
      }`
      
 Then when JS function every() I check if every element of the array is between the possible limits and if its an integer. If not, an error message is returned.
  
  `const areValidNumbers = candies.every(num => num >= 0 && num <= 100 && typeof num === 'number');
       if (!areValidNumbers) {
           return 'Each candy\'s sugar grams must be a valid integer between 0 and 100.';
       }`
       Lastly, I check if the threshold is between the limits and if it is an integer. If not, an error message is returned.
        
       `  if (threshold < 1 || threshold > 10 ** 9 || typeof threshold !== 'number') {
                return 'Sugar high threshold must be a valid integer between 1 and 1 000 000 000.';
            }`
         
   If the parameters are valid we proceed with the establishing the constants and variables.
   I set the current sum of eaten candies to 0. `let currSum = 0;`
   I copy the original array because later we will flag the used numbers at their respective indices.
   `const originalArrCopy = [...candies];` Then, I create a new sorted array with my helper function because I will iterate over the sorted values so I can get the smallest sum but the longest sequence of numbers `const sortedOriginalArr = sortArr(candies);`.
   After that, I create an empty array where the final indices will be pushed to `const possibleIndicesArr = [];`.
   
   Next, I loop over the sorted array with a simple old fashioned for-loop because it is the only loop I can safely break from when threshold is reached.
   ` for (let i = 0; i < sortedOriginalArr.length; i++)`
   And if statement checks if current array value is smaller or equal than the threshold AND if the current value + the current sum of eaten candies will be smaller or equal than the threshold.
   ` if (sortedOriginalArr[i] <= threshold && sortedOriginalArr[i] + currSum <= threshold)`. If this pass, I proceed with finding the first array index that matches the current value of the original array copy (because if there are candies that are the same number - the one that comes first must be used) 
   `const findIndexOfOriginal = originalArrCopy.indexOf(sortedOriginalArr[i]);` After that, I modify the original array copy with a string 'FLAGGED' at the returned index, so that in case there is another same number it wont be matched again. `originalArrCopy.splice(findIndexOfOriginal, 1, 'FLAGGED');`
   Then, I push the returned to the array of indices and add the sum to the current grams. `possibleIndicesArr.push(findIndexOfOriginal); currSum += sortedOriginalArr[i];` At the end of the current for-loop iteration I check if the sum has reached the threshold. If it has, I break the array to stop unnecessary loops.
   `  if (currSum === threshold) {
                    break;
                }`
   
   Finally, I return the array of indices sorted with my previously defined helper function.
  ` return sortArr(possibleIndicesArr);`
                                                                                                     