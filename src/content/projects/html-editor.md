---
name: HTML Editor
description: "A simple editor to learn HTML."
status: finished
startDate: 2021-04
endDate: 2021-11
tags: [web]
glyph: 🧑‍💻
color: "#2a98f6"
thumbnail: ./assets/html-editor/editor.png
gallery:
  - image: ./assets/html-editor/editor.png
    caption: "TODO(copy): caption for editor.png"
---

A simple HTML editor with syntax highlighting and tutorials. The tutorials were 
automatically archived from [W3schools](https://w3schools.com/) using 
`coding/w3tut.py` (reproduced here):

```py
import requests
from html.parser import HTMLParser as html
from html.entities import name2codepoint
import json
import sys
import re

if input("Overwrite data? (y/n) ") == "y":
	f = open("C:/Users/Zachary/Documents/coding/generic_assets/htmleditor_data.js","w")
	f.write("window.tutorialsData = []")
	f.close()

class W3schoolsTutorial():
	def __init__(self, url, root):
		parser = self.W3schoolsTutorialParser()
		parser.maintag_divin = -1
		parser.in_maintag = False
		parser.ready_handledata = False
		parser.in_h2 = False
		parser.in_p = False
		parser.in_code = False
		parser.in_title = False
		parser.current_data = None
		parser.title = None
		parser.output = []
		parser.root = root
		res = requests.get(url).text
		parser.feed(res)
		format = self.FormatTutorial(parser.get_parsed_tutorial(),url,root)
		f = open("C:/Users/Zachary/Documents/coding/generic_assets/htmleditor_data.js","r")
		obj = json.loads(f.read()[len("window.tutorialsData = "):])
		f.close()
		obj.append(format.format())
		str = json.dumps(obj)
		str = "window.tutorialsData = " + str
		f = open("C:/Users/Zachary/Documents/coding/generic_assets/htmleditor_data.js","w")
		f.write(str)
		f.close()
	
	class W3schoolsTutorialParser(html):
		def get_tryit(self, url):
			res = requests.get(url)
			txt = res.text
			pos1 = txt.index('<textarea autocomplete="off" id="textareaCode" wrap="logical" spellcheck="false">')
			pos2 = txt.index('</textarea>')
			txt = txt[pos1:pos2]
			txt = txt.replace('<textarea autocomplete="off" id="textareaCode" wrap="logical" spellcheck="false">','')
			txt = txt.replace('\r','')
			txt = txt.strip()
			return txt
		
		def handle_starttag(self, tag, attrs):
			for attr in attrs:
				if attr[0] == "id" and attr[1] == "main":
					self.in_maintag = True
					self.maintag_divin = 0
					return
				
				#if attr[0] == "class" and attr[1][:7] == "w3-code" and tag == "div":
				#	self.in_code = True
				
				if attr[0] == "href" and attr[1][:9] == "tryit.asp":
					self.output.append({"type":"code", "text": self.get_tryit(self.root + attr[1]), "code_url": self.root + attr[1]})
			
			if tag == "div" and self.in_maintag == True:
				self.maintag_divin += 1
			
			if self.maintag_divin > -1 and tag == "h2":
				self.in_h2 = True
			
			if self.maintag_divin > -1 and tag == "p":
				self.in_p = True
				self.current_data = ""
			
			if tag == "title":
				self.in_title = True
			
				

		def handle_endtag(self, tag):
			if tag == "div" and self.in_maintag:
				self.maintag_divin -= 1
			
			if tag == "div" and self.in_code:
				self.in_code = False
			
			if self.maintag_divin == 0:
				self.ready_handledata = True
			
			if self.in_h2 and tag == "h2":
				self.in_h2 = False
			
			if self.in_title:
				self.in_title = False
			
			if self.in_p and tag == "p":
				self.in_p = False
				if self.current_data != "Get certifiedby completinga course today!" and self.current_data != "Play Game" and self.current_data != "If you want to report an error, or if you want to make a suggestion, do not hesitate to send us an e-mail:" and self.current_data != "help@w3schools.com" and self.current_data != "Your message has been sent to W3Schools.":
					self.output.append({"type":"content","text":self.current_data})
			
			#if self.in_code and tag == "div":
			#	self.in_code = False

		def handle_data(self, data):
			if self.in_h2 and not (data=="Report Error" or data=="Thank You For Helping Us!"):
				self.output.append({"type":"header","text":data})
			
			#if self.in_code and self.in_maintag:
			#	if self.output[-1]["type"] == "code":
			#		self.output[-1]["text"] += data.strip()
			#	else:
			#		self.output.append({"type":"code","text":data.strip()})
			
			if self.in_p:
				self.current_data = self.current_data + "".join("".join(data.split("\n")).split("\r"))
			
			if self.in_title:
				self.title = data
		
		def get_parsed_tutorial(self):
			return {"output":self.output,"title":self.title}

	class FormatTutorial():
		def __init__(self,output,url,root):
			self.output = output["output"]
			self.title = output["title"]
			self.url = url
			self.root = root
		
		def format(self):
			output = self.output
			steps = [{"type":""}]
			obj = {"title":self.title,"steps":[],"url":self.url}
			prep_steps = [[{"type":"header","text":"Introduction"}]]
			
			for d in output:
				if steps[-1]["type"] == d["type"]:
					steps[-1]["text"] += "\n"
					steps[-1]["text"] += d["text"]
				else:
					if d["type"] == "code":
						steps.append({"type":d["type"],"text":d["text"],"code_url": d["code_url"]})
					else:
						steps.append({"type":d["type"],"text":d["text"]})
			
			steps = steps[1:]
			
			for s in steps:
				if s["type"] == "header":
					prep_steps.append([])
				prep_steps[-1].append(s)
			
			
			i = 0
			for p in prep_steps:
				has_code = False
				has_content = False
				code_url = None
				for s in p:
					if s["type"] == "code":
						has_code = True
				
				if not has_code:
					p.append({"type":"code","text":"","code_url":""})
				
				step = {"name":"","body":"","code":""}
				for s in p:
					if s["type"] == "header":
						step["name"] += s["text"] + "\n"
					elif s["type"] == "content":
						step["body"] += s["text"] + "\n"
					elif s["type"] == "code":
						step["code"] += s["text"] + "\n"
						if not code_url:
							code_url = s["code_url"]
						
				
				step["name"] = step["name"].strip()
				step["body"] = step["body"].strip()
				step["code"] = step["code"].strip()
				step["codeUrl"] = code_url
				
				prep_steps[i] = step
				i += 1
			
			prep_steps[0]["body"] = "THIS IS A W3SCHOOLS.COM TUTORIAL.\n\n" + prep_steps[0]["body"]
			obj["source"] = self.root
			obj["steps"] = prep_steps
			
			
			return obj

def index_page(index):
	type = requests.get(index).text
	root = "/".join(index.split("/")[:-1]) + "/"
	domain = "/".join(index.split("/")[:-2])
	results = re.findall('<a target="_top" href=".*">.*<\/a>', type)
	finished = []
	for i in range(len(results)):
		results[i] = results[i].replace(re.search('">.*<\/a>',results[i]).group(),"")
		results[i] = results[i].replace(re.search('<a target="_top" href="', results[i]).group(),"")
		
		if results[i] in finished or results[i][0] == "/":
			results[i] = "noindex"
			continue
		
		finished.append(results[i])

	i = 0
	for url in results:
		if url != "noindex":
			if results[i][0] == "/":
				W3schoolsTutorial(domain + url, root)
				print("  %r out of %r - Indexed %r" % (i + 1, len(finished), domain + url))
			else:
				W3schoolsTutorial(root + url, root)
				print("  %r out of %r - Indexed %r" % (i + 1, len(finished), root + url))
			i += 1

pages = "https://www.w3schools.com/html/default.asp https://www.w3schools.com/css/default.asp https://www.w3schools.com/bootstrap4/default.asp https://www.w3schools.com/js/default.asp https://www.w3schools.com/jquery/default.asp".split(" ")
i = 0
for page in pages:
	print(str(i) + " pages indexed...")
	index_page(page)
	i += 1
```

