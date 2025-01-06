## Switch Config Generator

A tool for generating switch configuration .txt files tailored for the APAC region.
(*This is exclusive to the data format inputted and will not work for any other excel data)

## Features

- Implemented Excel data parsing using libraries like xlsx
- mapping data to a custom template engine Handlebars to automate the generation of accurate and structured .txt configuration files
- Ensured data security by not storing generated files in any database, and implemented a mechanism to delete files from the server immediately after download

## Screenshots

[![photo-2025-01-06-21-06-57.jpg](https://i.postimg.cc/P5YSvDqW/photo-2025-01-06-21-06-57.jpg)](https://postimg.cc/QFNQRH1C)

[![photo-2025-01-06-21-06-59.jpg](https://i.postimg.cc/nLx04Ls6/photo-2025-01-06-21-06-59.jpg)](https://postimg.cc/21HQmr7w)

## Tech Stack

**Client:** React.js, Vanilla CSS

**Server:** Node, Express, Handlebars

## Lessons Learned

How to parse Excel data and using a javascript template to map these data. 


## Contribution Rules

Use the following types for contributing:

feat: for new features
fix: for bug fixes
docs: for documentation changes
style: for code formatting
refactor: for code refactoring
test: for adding or modifying tests
chore: for routine tasks or changes
