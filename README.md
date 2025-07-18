# QuickNote

## The Problem

Linkedin notes only allow a maximum of 200 characters for initial connection requests. But some pitches take more than 200 characters

### The Real Problem

I don’t want to pay for Linkedin Premium, and I needed an excuse to learn how to use hono

### The Solution

QuickNote, a simple way to send markdown notes to anyone. 

Think pastebin, but customizable short slugs that lead to a landing page with your note.

### The product

**Auth**
- [x] Basic email, password auth with a JWT stored locally.
- [ ] A way to recover lost accounts
- [ ] update passwords
- [ ] password reset

#### Notes
- [x] A markdown editor, then we store the text in a mongoDB collection with it’s slug and metadata (timestamps, userID)

### Note
Most of the UI is vibe coded
