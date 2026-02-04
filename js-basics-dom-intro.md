Introduction to the  Document Object Model (DOM) for web development:

---

### **Understanding the DOM**

#### **Objective:**
By the end of this lesson, students will understand what the DOM is, how it represents a web page, and how to manipulate it using JavaScript.

#### **Materials Needed:**
- Computer with a web browser
- Text editor (e.g., VSCode, Sublime Text)
- Basic knowledge of HTML, CSS, and JavaScript

#### **Lesson Outline:**

**1. Introduction to the DOM **
   - **Definition:** The DOM is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.
   - **Analogy:** Think of the DOM as a tree structure where each node is an object representing a part of the document (e.g., elements, attributes, text).

**2. Structure of the DOM **
   - **Tree Structure:** Explain how the DOM is structured as a tree with nodes.
     - **Root Node:** The top node is the `document` object.
     - **Element Nodes:** Represent HTML elements (e.g., `<div>`, `<p>`).
     - **Text Nodes:** Contain the text within elements.
     - **Attribute Nodes:** Represent attributes of elements (e.g., `class`, `id`).
    
![alt text](js-basics-dom-tree.png)

Source: https://www.w3schools.com/js/js_htmldom.asp


**3. Accessing the DOM **
   - **Using JavaScript:**
     - `document.getElementById('id')`: Selects an element by its ID.
     - `document.getElementsByClassName('class')`: Selects elements by their class name.
     - `document.querySelector('selector')`: Selects the first element that matches a CSS selector.
     - `document.querySelectorAll('selector')`: Selects all elements that match a CSS selector.

**4. Manipulating the DOM **
   - **Changing Content:**
     - `element.textContent`: Sets or gets the text content of an element.
     - Purpose: Sets or gets the text content of an element.
     - Behavior:
        When setting, it replaces the entire content of the element with the provided text.
        
        When getting, it retrieves the text content of the element, including all its descendants.
        
     - Security: Safe from Cross-Site Scripting (XSS) attacks because it treats the content as plain text.

     - `element.innerHTML`: Sets or gets the HTML content of an element.
   
    
    
        
        
   
   - **Changing Styles:**
     - `element.style.property`: Changes the CSS property of an element (e.g., `element.style.color = 'red'`).
   - **Adding and Removing Elements:**
     - `document.createElement('tag')`: Creates a new element.
     - `parentElement.appendChild(newElement)`: Adds a new element as a child.
     - `parentElement.removeChild(childElement)`: Removes a child element.

**5. Practical Exercise **
   - **Task:** Create a simple HTML page and use JavaScript to:
     - Change the text of a paragraph.
     - Change the background color of a div.
     - Add a new list item to an unordered list.

**6. Q&A and Recap **
   - **Recap:** Summarize the key points covered in the lesson.
   - **Questions:** Questions about the DOM?
  
--