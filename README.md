# Local In-Memory RDBMS Service

This service hosts a local in-memory Relational Database Management System (RDBMS). It allows you to perform identification queries based on email and phone number inputs.
## Requirements

- Docker: [Install Docker](https://docs.docker.com/get-docker/)


## Getting Started

Follow the steps below to run the project using Docker.

### 1. Clone the repository

git clone https://github.com/singh-harshit/identification-service.git

cd identification-service

### 2. Build the Docker image
docker build -t identification-service .

### 3. Run the Docker container

docker run -p 3000:3000 identification-service

The application should now be running and accessible at `http://localhost:3000`.


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

