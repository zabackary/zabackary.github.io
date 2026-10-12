---
name: DIY Car Robot
description: "Firmware for car robot kit purchased as budget surplus by science teacher"
status: incomplete
startDate: 2023-05
endDate: 2023-05
tags: [web, arduino]
glyph: 🚗
---

TODO(copy): project write-up. Source is `backups/documents_coding_20240417/_snippets/diy_car_robot` (an Arduino backend and a web frontend); the backend README follows.

## Backend

Being a simple microprocessor, the backend doesn't do very much. It's a simple
JSON RESTful API.

The server cannot handle longer than 16-character paths for memory
reasons. >128-character bodies also cannot be handled.

The server returns the response "{{status}} Go Look Up The Status Code
Yourself".

### GET `/`

Returns a JSON object of the form

```json
{
  "ok": true,
  "stats": {
    "connections": 0,
    "uptime": 39843
  },
  "help": "See backend `README.md`"
}
```

where `connections` is the number of previous connections and `uptime` is how
long in milliseconds the server has been running.

### GET `/state`

> Note: You MUST NOT end the URL with `/`.

Returns an object of the form

```json
{
  "direction": "forward",
  "display": "Hello, world!"
}
```

where `direction` is of type `"forward" | "backward" | "left" | "right"` and
`display` is the current value of the display.

### PUT `/state`

Must have a payload that can be applied to `GET /state` as the new state.
