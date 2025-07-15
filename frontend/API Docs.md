# API Docs

Base URL `http://localhost:3000`

### Auth

#### Register

```bash
curl -X POST 'http://localhost:3000/app/auth/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "name": "Joe",
  "email": "itsjoeeverest@gmail.com",
  "password": "Qwertyuiop[]1"
}'
```

#### Login

```bash
curl -X POST 'http://localhost:3000/app/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "email": "itsjoeeverest@gmail.com",
  "password": "Qwertyuiop[]1"
}'
```

### Notes

#### Get All Notes

```bash
curl -X GET 'http://localhost:3000/app/notes' \
  --header 'Authorization: Bearer token.goes.here'
```

#### Create Note

```bash
curl -X POST 'http://localhost:3000/app/notes' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "title": "My First Note",
  "content": "This is the content of my note"
}' \
  --header 'Authorization: Bearer token.goes.here'
```

#### Get Note by Slug

```bash
curl -X GET 'http://localhost:3000/app/note/my-first-note' \
  --data-raw '{
  "title": "My First Note",
  "content": "This is the content of my note"
}'
```

`Note: No token for this`

#### Update Note

```bash
curl -X PUT 'http://localhost:3000/app/notes/687597da2241e2c6f2028343' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "title": "Update",
  "content": "This is the note"
}' \
  --header 'Authorization: Bearer token.goes.here'
```

#### Delete Notes

```bash
curl -X DELETE 'http://localhost:3000/app/notes/687597da2241e2c6f2028343' \
  --data-raw '{
  "title": "Update",
  "content": "This is the note"
}' \
  --header 'Authorization: Bearer token.goes.here'
```
