---
name: Copier
description: "A small program to back up files"
status: finished
startDate: 2023-06
endDate: 2023-08
tags: [cli]
glyph: 📁
color: "#3c3c3c"
github: https://github.com/zabackary/copier
---

Copier is a project that simply copies files from one directory to another, with
a trick up its sleeve. It takes a simple ignore file and backs up everything but
black holes like Python environments and the dreaded `node_modules`.

## Usage

```
copier <source> <target> <ignorelist>
```

where `<ignorelist>` is a file of the syntax:

```
# Comment

# Directory containing `file.txt`
/file.txt

# Directory name
node_modules
```

