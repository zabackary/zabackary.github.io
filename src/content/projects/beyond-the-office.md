---
name: Beyond the Office Website
description: "Online storefront for a elementary-me company idea"
status: finished
startDate: 2020-06
endDate: 2020-08
tags: [web, javascript]
glyph: 🛍️
color: "#1ae1eb"
thumbnail: ./assets/beyond-the-office/home.png
gallery:
  - image: ./assets/beyond-the-office/home.png
    caption: The homepage, with a horribly-sized image.
  - image: ./assets/beyond-the-office/shop.png
    caption: The old shop, an iframe of Google Sheets with custom borders and clickable rows overlaid *just* right.
---

A website created for Beyond the Office (one of my fake companies) to showcase their
products, prices, and (fake) blog. The second screenshot shows the old shop,
powered by Google Sheets, so it may stop working at some point.

The current header link to the shop goes to `#/shop/`, but the old shop is at
`#/shop/old/`. As you can see, the page is a SPA (single page application) with
routes defined by `location.hash`.
