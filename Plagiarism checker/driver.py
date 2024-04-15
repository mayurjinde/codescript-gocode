import requests

from bs4 import BeautifulSoup

# url="https://www.interviewbit.com/blog/kmp-algorithm-pattern-search/"

def getdata(url): 
	r = requests.get(url,verify=False) 
	return r.text 

# complete_article_html = getdata(url) 
# soup = BeautifulSoup(complete_article_html, 'html.parser') 


# with open('interviewbit.txt','w') as f:
# 	f.write(soup.get_text())


def scrapText(url):
	complete_article_html = getdata(url) 
	soup = BeautifulSoup(complete_article_html, 'html.parser') 
	return soup.get_text()