import requests 
from bs4 import BeautifulSoup 
import json

 
article = 'extract-authors-information-from-geeksforgeeks-article-using-python'
index_Code = 3


# url = "https://www.geeksforgeeks.org/"+article 

url="https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/"


def getdata(url): 
	r = requests.get(url) 
	return r.text 


def codescrapper(soup, article=None): 
	codes_languages = soup.find_all('h2', class_='tabtitle') 
	codes = soup.find_all("div", class_='code-container')
	 
	
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
				print('codes/'+str(key)+str(idx)+'.txt'+" ------------------- File written successfully")

	
	


if __name__ == '__main__': 
	
	complete_article_html = getdata(url) 
	soup = BeautifulSoup(complete_article_html, 'html.parser') 
	codescrapper(soup, index_Code) 
