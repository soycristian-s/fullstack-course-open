sequenceDiagram
    participant user
    participant browser
    participant server
    
    user->>browser: User enters https://studies.cs.helsinki.fi/exampleapp/spa
    activate browser
    

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    browser-->>user: Browser shows user the page
    deactivate browser

    user->>browser: User writes a note in input form and click Save
    activate browser
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Returns a json with {"message" : note created"}
    deactivate server
    Note right of browser: This returns state 201

    browser->>browser: 
    Note right of browser: Browser clears input form and redraws notes
    deactivate browser
    browser-->>user: User sees his note 