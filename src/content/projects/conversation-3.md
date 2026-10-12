---
name: Conversation 3
description: "A Google Script webapp to replace Google Chat."
status: finished
startDate: 2021-09
endDate: 2021-11
tags: [google-script, web]
language: [javascript]
glyph: 💬
color: "#1e90ff"
thumbnail: ./assets/conversation-3/home.png
gallery:
  - image: ./assets/conversation-3/home.png
    caption: The homepage, which has a slideshow of features.
  - image: ./assets/conversation-3/channel.png
    caption: A channel with various types of messages. Also visible at the top-right is the account switcher.
  - image: ./assets/conversation-3/moderation.png
    caption: The quickly-made moderator portal, showing every message and enabling censorship (more on that in the description).
  - image: ./assets/conversation-3/createchannel.png
    caption: The channel creation screen.
  - image: ./assets/conversation-3/old.png
    caption: The old version, Conversation 1, had only a single channel, and also had XSS, hence the links.
---

The third iteration of a Google Script-powered webapp to replace Google Chat,
with Discord-like features and a full permission system. Technically, it's still
in beta, but it got pushed to the live Google Scripts project already so it's
basically done.

Like EduProxy, Conversation also has a built-in moderation panel to allow
students to chat safely despite lockdowns on other instant messaging apps.
