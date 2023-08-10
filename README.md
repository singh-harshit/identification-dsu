# Local In-Memory RDBMS Service

This service hosts a local in-memory Relational Database Management System (RDBMS). It allows you to perform identification queries based on email and phone number inputs.

## Getting Started

###  Service Hosted Url

https://identification-service.onrender.com

### 2. Use Postman or any other Resources to use cURL

Example cURLS

```
curl --location 'https://identification-service.onrender.com/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber": "1234567890",
    "email": "abc@gmail.com"
}'
```

```
curl --location 'https://identification-service.onrender.com/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber": "1234567890",
}'
```

```
curl --location 'https://identification-service.onrender.com/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "abc@gmail.com"
}'
```

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



