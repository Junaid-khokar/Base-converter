// Get references to the result display and the convert button
let result = document.querySelector("#Result");
let convert = document.querySelector("#convert");
let run = true;

// Add event listener to the convert button
convert.addEventListener('click', (e) => {
   run = true;
   result.value = "";
   document.querySelector("input").classList.remove("same");
   
   // Get the input number and selected bases
   let num = document.querySelector("#number").value;
   let baseFrom = document.querySelector("#From");
   let baseTo = document.querySelector("#To");

   // Validate the input number based on the selected base
   if (baseFrom.value == "BI") {
      // Validate binary number (only 0 and 1 allowed)
      for (let i = 0; i < num.length; i++) {
         if (num[i] != 1 && num[i] != 0) {
            same();
            run = false;
            break;
         }
      }
   }
   else if (baseFrom.value == "DEC") {
      // Validate decimal number (only digits 0-9 allowed)
      for (let i = 0; i < num.length; i++) {
         if (num[i] >= 0 && num[i] <= 9) {
            continue;
         } else {
            same();
            run = false;
            break;
         }
      }
   }
   else if (baseFrom.value == "OCT") {
      // Validate octal number (only digits 0-7 allowed)
      for (let i = 0; i < num.length; i++) {
         if (num[i] >= 0 && num[i] <= 7) {
            continue;
         } else {
            same();
            run = false;
            break;
         }
      }
   }
   else if (baseFrom.value == "HEX") {
      // Validate hexadecimal number (digits 0-9 and letters A-F allowed)
      for (let i = 0; i < num.length; i++) {
         if ((num[i] >= 0 && num[i] <= 9) || (num.charCodeAt(i) >= 'A'.charCodeAt(0) && num.charCodeAt(i) <= 'F'.charCodeAt(0)) || num.charCodeAt(i) >= 'a'.charCodeAt(0) && num.charCodeAt(i) <= 'f'.charCodeAt(0)) {
            continue;
         } else {
            same();
            run = false;
            break;
         }
      }
   }

   // Perform the conversion based on the selected bases
   if (baseFrom.value == "BI" && run) {
      if (baseTo.value == "DEC") {
         console.log("to decimal");
         result.value = toDec(num, 2);
      } else if (baseTo.value == "OCT") {
         result.value = toOct(num);
      } else if (baseTo.value == "HEX") {
         result.value = toHex(num);
      } else if (baseTo.value == "BI") {
         same();
      }
   } else if (baseFrom.value == "DEC" && run) {
      if (baseTo.value == "BI") {
         result.value = toBi(num);
      } else if (baseTo.value == "OCT") {
         let temp = toBi(num);
         result.value = toOct(temp);
      } else if (baseTo.value == "HEX") {
         let temp = toBi(num);
         console.log(temp);
         result.value = toHex(temp);
      } else if (baseTo.value == "DEC") {
         same();
      }
   } else if (baseFrom.value == "OCT" && run) {
      if (baseTo.value == "BI") {
         let temp = toDec(num, 8)
         result.value = toBi(temp);
      } else if (baseTo.value == "DEC") {
         result.value = toDec(num, 8);
      } else if (baseTo.value == "HEX") {
         let temp = toDec(num, 8);
         let temp1 = toBi(temp);
         result.value = toHex(temp1);
      } else if (baseTo.value == "OCT") {
         same();
      }
   } else if (baseFrom.value == "HEX" && run) {
      if (baseTo.value == "BI") {
         let temp = hexToDec(num, 16);
         result.value = toBi(temp);
      } else if (baseTo.value == "OCT") {
         let temp = hexToDec(num, 16);
         let temp1 = toBi(temp);
         result.value = toOct(temp1);
      } else if (baseTo.value == "DEC") {
         result.value = hexToDec(num, 16);
      } else if (baseTo.value == "HEX") {
         same();
      }
   }
});

// Function to highlight the input field when invalid input is detected
function same() {
   let wrong = document.querySelector("input");
   wrong.classList.add("same");
}

// Function to convert a number to decimal
function toDec(num, base) {
   num = num.toString();
   let sum = 0, number = num;
   for (let i = 0; i < num.length; i++) {
      console.log(i);
      sum = sum + ((number % 10) * (Math.pow(base, i)));
      number = parseInt(number / 10);
      console.log(sum);
   }
   return sum;
}

// Function to convert a binary number to octal
function toOct(num) {
   let number = num, sum = 0, oct = 1;
   for (let i = 0; i < num.length; i = i + 3) {
      console.log(number % 1000);
      sum = sum + (toDec(number % 1000, 2) * oct);
      number = parseInt(number / 1000);
      oct = oct * 10;
   }
   return sum;
}

// Function to convert a binary number to hexadecimal
function toHex(num) {
   let number = num, sum = "", Arr1 = [], count = 0;
   let Arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
   for (let i = 0; i < num.length; i = i + 4) {
      Arr1[count] = (Arr[toDec(number % 10000, 2)]);
      number = parseInt(number / 10000);
      count++;
   }
   for (let i = Arr1.length - 1; i >= 0; i--) {
      sum = sum + Arr1[i];
   }
   console.log(sum);
   return sum;
}

// Function to convert a decimal number to binary
function toBi(num) {
   let number = num, Arr = [], count = 0, sum = "";
   while (number > 1) {
      Arr[count] = (number % 2).toString();
      number = parseInt(number / 2);
      if (number == 1) {
         sum = sum + number;
      }
      count++
   }

   for (let i = Arr.length - 1; i >= 0; i--) {
      sum = sum + Arr[i];
   }

   return sum;
}

// Function to convert a hexadecimal number to decimal
function hexToDec(num, base) {
   num = num.toUpperCase();
   let sum = 0;

   for (let i = 0; i < num.length; i++) {
      let digit = num[i];
      let digitValue = parseInt(digit, base);

      sum = sum * base + digitValue;
   }
   return sum;
}
