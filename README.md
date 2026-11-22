# OS Courses Manager

A simple interactive command-line application for managing courses.

## Features

- Add a new course
- List all courses
- View a course by ID
- Update a course by ID
- Remove a course by ID
- Validate course titles, prices, and IDs

## Requirements

- Node.js
- npm

## Installation

```bash
npm install
```

## Usage

Run commands from the project directory:

```bash
node index.js <command>
```

Display all available commands:

```bash
node index.js --help
```

## Commands

| Command | Alias | Description |
| --- | --- | --- |
| `add` | `a` | Add a new course |
| `list` | `ls` | List all courses |
| `single` | `s` | Find a course by ID |
| `update` | `u` | Update a course by ID |
| `remove` | `rm` | Remove a course by ID |

## Examples

```bash
node index.js add
node index.js list
node index.js single
node index.js update
node index.js remove
```

The aliases can be used instead:

```bash
node index.js a
node index.js ls
node index.js s
node index.js u
node index.js rm
```

## Input Validation

- Course title cannot be empty
- Course price must be zero or a positive number
- Course ID must be a positive integer

## Data Storage

Courses are stored in `courses.json` in the project directory.

## Dependencies

- [Commander](https://www.npmjs.com/package/commander)
- [Inquirer](https://www.npmjs.com/package/inquirer)
