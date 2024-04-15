from flask import Flask, render_template
from flask_socketio import SocketIO
from customSearchApi import getSearchResults
from driver import scrapText
from similarity import checkTextSim,checkTextSimShingles
from urllib.parse import urlparse

def extract_website_name(link):
    parsed_url = urlparse(link)
    # Extract the netloc which contains the domain name
    domain = parsed_url.netloc
    # Split the domain to get the website name
    website_name = domain.split('.')[1]  # Assuming the website name is the second part
    return website_name

# Example usage
link = "https://www.example.com/page"
website_name = extract_website_name(link)
print("Website Name:", website_name)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app,cors_allowed_origins="*")

@socketio.on('connect')
def connection(socket):
    print(socket)
    return

@socketio.on('welcome')
def hello(data):
    print(data)


@socketio.on('query')
def searchQuery(data):
    result=[]
    links=getSearchResults(data['query'].decode())

    for i in links[:5]:
        text=scrapText(i)
        if len(text)>1000000:
            continue
        similarity=checkTextSim(data['query'].decode(),text)
        print(i,similarity)
        result.append({
            'link':i,'similarity':similarity
        })

    socketio.emit('result',{'data':result})


@socketio.on('checkCode')
def checkCode(data):
    result=[]
   
    links=getSearchResults(data['query'])
    print(links)
    for i in links:
        text=scrapText(i)
        similarity=checkTextSimShingles(data['query'],text)
        socketio.emit('result',{'name':extract_website_name(i),'link':i,'similarity':similarity})
    socketio.emit('finished')
       

if __name__ == '__main__':
    socketio.run(app,port=4999,debug=True)