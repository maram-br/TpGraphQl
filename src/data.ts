
        export const DB = {
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "role": "ADMIN",
      "cvs": [
        1
      ]
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com",
      "role": "USER",
      "cvs": [
        2,
        3
      ]
    }
  ],
  "roles": [
    {
      "id": 1,
      "designation": "ADMIN",
      "methods": [
        "GET",
        "PUT",
        "POST",
        "DELETE"
      ]
    },
    {
      "id": 2,
      "designation": "USER",
      "methods": [
        "GET"
      ]
    }
  ],
  "skills": [
    {
      "id": 1,
      "designation": "GraphQL"
    },
    {
      "id": 2,
      "designation": "TypeScript"
    },
    {
      "id": 3,
      "designation": "React"
    }
  ],
  "cvs": [
    {
      "id": 1,
      "name": "Updated Name",
      "age": 29,
      "job": "Updated Job Title",
      "userId": 1,
      "skillIds": [
        1,
        2
      ]
    },
    {
      "id": 2,
      "name": "Bob CV",
      "age": 25,
      "job": "Frontend Dev",
      "userId": 2,
      "skillIds": [
        3
      ]
    },
    {
      "id": 3,
      "name": "Cv v2",
      "age": 22,
      "job": "FrontEnd Dev",
      "userId": 2,
      "skillIds": [
        1,
        2
      ]
    }
  ]
};
    