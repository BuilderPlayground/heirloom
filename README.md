# Heirloom™

Heirloom™ is a personal affairs dashboard exploring how individuals can organize important assets, relationships, records, and continuity considerations.

This repository contains a limited technical demonstration developed for the Resilient Coders Fall 2026 fellowship.

## Features

- Responsive personal affairs dashboard
- Asset management with create, read, update, and delete functionality
- MongoDB-backed asset records
- Asset categorization and continuity status tracking
- Illustrative legacy readiness overview
- Read-only mode for public demonstrations

## Tech Stack

HTML, CSS, JavaScript, Node.js, Express, EJS, MongoDB, and Mongoose.

## Running Locally

1. Install dependencies: `npm install`
2. Create a `.env` file containing your `MONGODB_URI`.
3. Start the server: `node server.js`
4. Open `http://localhost:8082`.

For read-only mode, run:

`DEMO_READ_ONLY=true node server.js`

## Project Scope & Ownership

Heirloom™ is an intentionally limited demonstration adapted from an independently conceived project that predates this fellowship. This public implementation does not represent or disclose the full scope of the founder's private work, product strategy, or future development plans.

This repository is not offered under an open-source license.

## Disclaimer

Heirloom™ is an early-stage demonstration using fictional data. Illustrative readiness figures are not legal or financial assessments. The application is not intended for storing sensitive personal or financial information.
