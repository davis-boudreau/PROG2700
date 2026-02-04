// Function to update the content and style
function updateContent() {
    // Change the text of the paragraph
    document.getElementById('myParagraph').textContent = 'Welcome to my website!';

    // Change the background color of the div
    document.getElementById('myDiv').style.backgroundColor = 'lightblue';

    // Add a new list item to the unordered list
    const newItem = document.createElement('li');
    newItem.textContent = 'New Item';
    document.getElementById('myList').appendChild(newItem);
}

// Attach event listener to the button
document.getElementById('updateButton').addEventListener('click', updateContent);