---
name: "Photo Booth"
description: "A poorly-named photo booth application."
status: finished
startDate: 2024-02
languages: [rust]
tags: [native, community]
glyph: 📸
github: https://github.com/zabackary/photo-booth-v2
---

> A poorly named photo booth application

![photo_booth_demo](https://github.com/user-attachments/assets/92156f5b-1916-43cf-b1c3-65c7680ba3b2)

photo-booth-v2 is a configuration photo booth application supporting multiple backends for each option. It supports configurable theming, printers, email servers, etc.

I first took a stab at this with a nokhwa + iced + webhook-based approach in the
1.0.0 version series, on GitHub at [`zabackary/photo-booth`](https://github.com/zabackary/photo-booth).
However, after rewriting almost the whole application, I arrived at version 2
which added support for a printer driven by CUPS and a real camera driven by
gphoto2.

### Backends

One feature of this application The default build (available on GitHub releases) includes the following backends:

- **email_gapps_script_webhook**: send email via a Google Apps Script webhook

- **filter_skin_softening**: a simple skin softening filter

- **printer_cups**: print photos using CUPS (requires CUPS installed on the system)

- **camera_nokhwa**: capture webcam images using the nokhwa crate

- **camera_gphoto2**: capture from cameras using gphoto2 (requires gphoto2 installed on the system)

- **storage_google_drive**: upload photos to Google Drive using the Google Drive API

- **storage_local_filesystem**: save photos to the local filesystem
