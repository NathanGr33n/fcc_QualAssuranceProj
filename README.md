# Issue Tracker

A full-stack JavaScript Issue Tracker application built for the freeCodeCamp Quality Assurance certification.

## Features

- Create, read, update, and delete issues for multiple projects
- Filter issues by various parameters
- RESTful API with full CRUD operations
- MongoDB database for persistent storage
- Comprehensive functional tests using Chai and Mocha

## API Endpoints

### POST `/api/issues/{project}`
Create a new issue for a project.

**Required fields:**
- `issue_title` (string)
- `issue_text` (string)
- `created_by` (string)

**Optional fields:**
- `assigned_to` (string)
- `status_text` (string)

**Returns:** Created issue object with all fields plus `_id`, `created_on`, `updated_on`, and `open` (boolean, defaults to true)

### GET `/api/issues/{project}`
Retrieve all issues for a project. Can filter by any field as query parameters.

**Example:** `/api/issues/apitest?open=true&assigned_to=Joe`

**Returns:** Array of issue objects

### PUT `/api/issues/{project}`
Update an existing issue.

**Required field:**
- `_id` (string)

**Optional update fields:**
- `issue_title`, `issue_text`, `created_by`, `assigned_to`, `status_text`, `open`

**Returns:** `{ result: 'successfully updated', '_id': _id }` on success

### DELETE `/api/issues/{project}`
Delete an issue.

**Required field:**
- `_id` (string)

**Returns:** `{ result: 'successfully deleted', '_id': _id }` on success

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `sample.env` to `.env` and configure your MongoDB connection:
   ```
   NODE_ENV=test
   PORT=3000
   DB=mongodb://localhost:27017/issuetracker
   ```
4. Make sure MongoDB is running on your system

## Usage

### Start the server:
```bash
npm start
```

### Run tests:
```bash
npm test
```

The app will be available at `http://localhost:3000`

## Testing

The project includes 14 comprehensive functional tests covering:
- Creating issues (with all fields, required fields only, missing fields)
- Viewing issues (all, with one filter, with multiple filters)
- Updating issues (one field, multiple fields, missing _id, no fields, invalid _id)
- Deleting issues (valid, invalid _id, missing _id)

## Project Structure

```
fcc_IssueTracker/
├── routes/
│   ├── api.js           # API routes and Issue model
│   └── fcctesting.js    # FCC testing routes
├── tests/
│   └── 2_functional-tests.js  # All 14 functional tests
├── views/
│   ├── index.html       # Homepage
│   └── issue.html       # Project-specific issue page
├── public/
│   └── style.css        # Styling
├── server.js            # Main application file
├── test-runner.js       # Test runner
├── assertion-analyser.js # Assertion analyzer
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Testing:** Mocha, Chai, Chai-HTTP
- **Frontend:** Vanilla JavaScript, HTML5, CSS3

## License

MIT
