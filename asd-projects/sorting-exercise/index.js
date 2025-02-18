/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
// sorts elements in the array from smallest to largest and update the swap counter
async function bubbleSort(array){
    for(let i = 0; i < array.length - 1; i++)   // runs  through the array
        for(let j = array.length - 1; j > 1; j--){ // sorts the elements,  starts at the end of the array, and compares the elements, and moves backwards
            if(array[j].value < array[j-1].value){ // if current value is less than the previous element they get swapped
                swap(array, j, j - 1);  //swaps the values 
                updateCounter(bubbleCounter); // updats the move count
                await sleep(); // slows the proccess
            }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if (right - left < 0){ // base case
        return; 
    }
    var index = await partition(array, left, right);
    if(left < index - 1){ // if the left value is less than the index the quicksort function is called
        await quickSort(array, left, index - 1); // sorts the parameters in the array and decreaes their value
        
    }
    if(right > index){ // if the right value is bigger than the index the quicksort function is called
        await quickSort(array, index, right); //sorts the paramaters in the array
    }
}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; // creates a variable named pivot that selects the amount by finding the index and using its value
    while(left < right){
        while(array[left].value < pivot){ //when the left value is less than the pivot, the left position is increased
            left++; // increases the left value
        }
        while(array[right].value > pivot){ //when the right value is bigger than the pivot, the right position is decreased
            right--; // decreases the right value
        }
        if(left < right){ //if left is less than the right they trade positions
            swap(array, left, right) // swaps the code
            updateCounter(quickCounter); // updates the counter
            await sleep(); //pauses the code
        }
    }
    
    
    
    return left + 1; // returns the left value + 1
}

// TODO 1: Implement swap
function swap(array, i, j){
    var temp = array[i]; // stores array in a temporary variable
    array[i] = array[j]; // storing j to i 
    array[j] = temp;  // stores original i to j
    drawSwap(array, i, j); // visually shows the swap
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}