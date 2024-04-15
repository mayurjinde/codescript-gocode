import requests 
from bs4 import BeautifulSoup 
import json



url="https://codeforces.com/blog/entry/107810"


def getdata(url): 
	r = requests.get(url) 
	return r.text 


def codescrapper(soup, article=None): 
	codes_languages = soup.find_all('code')
	codes = soup.find_all("div", class_='code-container')
	# print(codes_languages[0].get_text())
	for i in codes_languages:
		print(i.get_text())
		print('-------------------')
	with open('codeforces.html', 'w',encoding='utf-8') as outfile:
		outfile.write(str(soup.prettify()))
	exit() 
	
	data={}
	langs=[]
	for i in codes_languages:
		langs.append(i.get_text())
	
	for idx,val in enumerate(langs):
		if val in data:
			data[val].append(codes[idx].get_text())
		else:
			data[val]=[codes[idx].get_text()]
	

	for key,val in data.items():
		for idx,v in enumerate(val):
			with open('codes/'+str(key)+str(idx)+'.txt', 'w',encoding='utf-8') as outfile:
				outfile.write(v)
	


if __name__ == '__main__': 
	
	complete_article_html = getdata(url) 
	soup = BeautifulSoup(complete_article_html, 'html.parser') 
	codescrapper(soup) 
