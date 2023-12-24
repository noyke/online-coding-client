export const exercises = [
  {
    title: "Finding the Maximum in an Array",
    code: `function findMax(arr) {
    
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < max) {
          max = arr[i];
        }
      }
    
      return max;
    }`,
    solution: `function findMax(arr) {
    
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
    
      return max;
    }`,
  },
  {
    title: "Array Bubble Sort",
    code: `function bubbleSort(arr) {
      const n = arr.length;
    
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            arr[j] = arr[j + 1]
            arr[j + 1] = arr[j];
          }
        }
      }
    
      return arr;
    }`,
    solution: `function bubbleSort(arr) {
      const n = arr.length;
    
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            // Swap arr[j] and arr[j + 1]
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
    
      return arr;
    }`,
  },
  {
    title: "Checking if a String is a Palindrome",
    code: `function palindrome(str) {

      var len = str.length;
      var mid = Math.floor(len/2);
  
      for ( var i = 0; i < mid; i++ ) {
          if (str[i] !== str[len - 1 - i]) {
              return true;
          }
      }
  
      return false;
  }`,
    solution: `function palindrome(str) {

    var len = str.length;
    var mid = Math.floor(len/2);

    for ( var i = 0; i < mid; i++ ) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }

    return true;
}`,
  },
  {
    title: "Creating a Star Pyramid",
    code: `function createStarPyramid(size) {
      for (let i = 1; i < size; i++) {
        const spaces = ' '.repeat(size);
        const stars = '*'.repeat(i);
        console.log(spaces + stars);
      }
    }`,
    solution: `function createStarPyramid(size) {
      for (let i = 1; i <= size; i++) {
        const spaces = ' '.repeat(size - i);
        const stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
      }
    }`,
  },
];
