# Electrode Skeleton

## What is this?
This repo is a learning tool to help me build better webapps using Team Electrode's amazing toolset

## The App
This app is a simple TODO app. you can view, create, edit any todo.

## API

### Grab all my TODOS
```
GET /api/todos
```
```
Response 200
Body
  {
    todos:[{
      id: 123,
      description: "I am a TODO",
      completed: false
      }]
  }
```
### Create a new TODO
```
POST /api/todo
Body
  {
    description: "I am a TODO",
    completed: false
  }
```
```
Response 201
Body
  {
    id: 123,
    description: "I am a TODO",
    completed: false
  }
```
### Update a TODO
```
PUT /api/todo/:id
Body
  {
    id: 123,
    description: "I am a TODO, my ",
    completed: true
  }
```
```
Response 200
Body
  {
    id: 123,
    description: "I am a TODO",
    completed: false
  }
```

## Need Help On

There are a lot of things that need to be done:
- implement API endpoints
- add server side rendering
- configure and use winston logging
- add test code
