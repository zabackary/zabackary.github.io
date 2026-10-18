---
name: DIY Car Robot
description: "Firmware for car robot kit purchased as budget surplus by science teacher"
status: incomplete
startDate: 2023-05
endDate: 2023-05
tags: [web, arduino, schoolwork]
glyph: 🚗
---

In 8th grade, my science teacher (and social studies teacher 😀) had some leftover budget from the school and decided to purchase a plastic Arduino car kit. The kit
also included an ESP32 for network communication so I tried to make a remote for
it. Needless to say, I did not succeed before graduating middle school.

For some reason 8th grade me thought the issue was because our school network was using WPA3. (Our school network was kind of not optimal, with SSIDs for each room, but because there was only one tech staff for a school of 200 without outside consulting I don't blame him.) With the benefit of hindsight, I can say the program was almost certainly that the network was 5 GHz-only[^1], probably for interference
optimization, reducing wall penetration in a tight deployment.

[^1]: Remember those days, where 5 GHz was the fancy band. My high school uses the 6 GHz band now.

## Frontend

The frontend was planned as a simple app to send HTTP PATCH's to the backend
running on an ESP32.

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
