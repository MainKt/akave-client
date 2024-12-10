# Akave Client Library

## Overview
Akave is a decentralized protocol for managing on-chain data lakes. This JavaScript library provides an easy-to-use interface for interacting with the Akave Link API.

## Installation
```bash
npm install akave-client
```

## Quick Start

### Importing the Library
```javascript
import akave, { Akave, createAkaveInstance } from 'akave-client';
```

## Configuration
Set the Akave URL via environment variable:
```bash
AKAVE_BASE_URL=https://your-akave-endpoint.com
```

## API Methods

### Creating a Bucket
```javascript
// Create a new bucket
const bucket = await akave.createBucket('my-new-bucket');
console.log(bucket.ID); // Bucket ID
```

### Listing Buckets
```javascript
// Get all buckets
const buckets = await akave.listBuckets();
buckets.forEach(bucket => {
  console.log(bucket.ID, bucket.CreatedAt);
});
```

### File Operations

#### Upload a File
```javascript
// Upload a file to a specific bucket
const fs = require('fs');
const file = fs.createReadStream('/path/to/file');
const uploadedFile = await akave.uploadFile('bucket-id', file);
console.log(uploadedFile.RootCID);
```

#### List Files in a Bucket
```javascript
// Get all files in a bucket
const files = await akave.listFiles('bucket-id');
files.forEach(file => {
  console.log(file.Name, file.Size);
});
```

#### Download a File
```javascript
// Download a specific file
const fileBlob = await akave.downloadFile('bucket-id', 'filename');
```

#### Get File URL
```javascript
// Get download URL for a file
const fileUrl = await akave.getFileURL('bucket-id', 'filename');
console.log(fileUrl);
```

#### Get All File URLs in a Bucket
```javascript
// Get URLs for all files in a bucket
const allFileUrls = await akave.getAllFileURLs('bucket-id');
```

### Advanced Usage
```javascript
// Creating a custom Akave instance
const customAkave = new Akave('https://custom-endpoint.com');
const bucket = await customAkave.createBucket('custom-bucket');
```

## Error Handling
```javascript
try {
  await akave.createBucket('my-bucket');
} catch (error) {
  console.error('Failed to create bucket:', error.message);
}
```

## Environment Variables
- `AKAVE_BASE_URL`: Base URL for the Akave Link API

## Notes
- All methods return Promises
- File upload requires a ReadStream
