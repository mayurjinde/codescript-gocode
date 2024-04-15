from googleapiclient.discovery import build
import os
from dotenv import load_dotenv

load_dotenv()


api_key = os.getenv('apiKey')
cx = os.getenv('cx')

# Build a service object for interacting with the API
service = build('customsearch', 'v1', developerKey=api_key)

# Define your search query


# Execute the search request


# Access search results and display relevant information, including images
def getSearchResults(query)->list:
    response = service.cse().list(q=query, cx=cx).execute()
    """
    This function will return the list of links for the query
    :param query: The query to be searched
    :return: list of links
    """
    links = []
    # print(response['items'])
    if 'items' not in response:
        return []
    for item in response['items']:
        links.append(item['link'])
    return links


if __name__ == '__main__':
    with open('example.txt', 'r') as f:
        query = f.read()
    links = getSearchResults(query)
    for i in links:
        print(i)

