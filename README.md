## Switch Config Generator

A tool for generating switch configuration .txt files tailored for the APAC region.<br>
(*This is exclusive to the data format inputted and will not work for any other excel data)

## Features

- Implemented Excel data parsing using libraries like xlsx
- mapping data to a custom template engine Handlebars to automate the generation of accurate and structured .txt configuration files
- Ensured data security by not storing generated files in any database, and implemented a mechanism to delete files from the server immediately after download

## Screenshots

[![photo-2025-01-06-21-18-46.jpg](https://i.postimg.cc/hvndwJnB/photo-2025-01-06-21-18-46.jpg)](https://postimg.cc/34LN0xWS)

[![photo-2025-01-06-21-18-48.jpg](https://i.postimg.cc/BbCKGqZ1/photo-2025-01-06-21-18-48.jpg)](https://postimg.cc/sGvXYChV)

## Tech Stack

**Client:** React.js, Vanilla CSS

**Server:** Node, Express, Handlebars

## Lessons Learned

How to parse Excel data and using a javascript template to map these data. 


## Contribution Rules

Use the following types for contributing:

**feat**: for new features<br>
**fix**: for bug fixes<br>
**docs**: for documentation changes<br>
**style**: for code formatting<br>
**refactor**: for code refactoring<br>
**test**: for adding or modifying tests<br>
**chore**: for routine tasks or changes<br>
