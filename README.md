# Local In-Memory RDBMS Service

This service hosts a local in-memory Relational Database Management System (RDBMS). It allows you to perform identification queries based on email and phone number inputs.

## Getting Started

To run the service, follow these steps:

1. Make sure you have Node.js installed on your machine.
2. Clone this repository or download the source code.
3. Install the dependencies by running the following command in the project directory:


4. Start the service using the following command:


The service will run on the default port 3000. You can modify the port in the `src/main.ts` file if needed.

## API Endpoints

### Identify Endpoint

**Endpoint:** `POST /identify`

This endpoint allows you to identify contacts based on email and phone number inputs.

#### Request

**Request Body:**

```typescript
email?: string;

phoneNumber?: number;
```

**Response Body:**
```typescript
export interface IdentifyResponseDto {
  primaryContactId: number;
  emails: string[];
  phoneNumbers: number[];
  secondaryContactIds: number[];
}
```

