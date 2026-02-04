### Assignment: Interactive Web Page with JavaScript

#### **Objective:**
Create a simple HTML page and use JavaScript to dynamically change the content and style of the page using a button.

#### **Instructions:**

1. **HTML Structure:**
   - Create an HTML file named `index.html`.
   - Add the following elements to your HTML file:
     - A paragraph with the text "Hello, World!" and an ID of `myParagraph`.
     - A div with a background color of lightgray, some text inside it, and an ID of `myDiv`.
     - An unordered list with three list items and an ID of `myList`.
     - A button with the text "Update" and an ID of `updateButton`.

2. **JavaScript Functionality:**
   - Create a JavaScript file named `script.js`.
   - Write JavaScript code to:
     - Change the text of the paragraph to "Welcome to my website!".
     - Change the background color of the div to lightblue.
     - Add a new list item with the text "New Item" to the unordered list.
     - Attach an event listener to the button to trigger these changes when clicked.

3. **Linking JavaScript to HTML:**
   - Link your `script.js` file to your `index.html` file using a `<script>` tag at the end of the body section.

#### **Example Code:**

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Web Page</title>
</head>
<body>
    <p id="myParagraph">Hello, World!</p>
    <div id="myDiv" style="background-color: lightgray; padding: 10px;">
        This is a div element.
    </div>
    <ul id="myList">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    <button id="updateButton">Update</button>

    <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
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
```

#### **Submission:**
- Ensure your HTML and JavaScript files are correctly linked and functioning.
- Submit your `index.html` and `script.js` files.

---
