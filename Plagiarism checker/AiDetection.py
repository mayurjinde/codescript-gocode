import requests,math,os
from dotenv import load_dotenv
import openai

assessments = [
{"max_score": 10, "assessment": "very unlikely"},
{"max_score": 45, "assessment": "unlikely"},
{"max_score": 90, "assessment": "unclear if it is"},
{"max_score": 98, "assessment": "possibly"},
{"max_score": 99, "assessment": "likely"},
]

class AITextDetector:
    def __init__(self, token):
        self.header = {
            "Content-Type": "application/json",
            "Authorization": "Bearer {0}".format(token),
            }
        
    def detect(self, text):
        data = {
                "prompt": text + ".\n<|disc_score|>",
                "max_tokens": 1,
                "temperature": 1,
                    "top_p": 1,
                    "n": 1,
                    "logprobs": 5,
                "stop": "\n",
                "stream": False,
                "model": "text-davinci-003"
                }
        response = requests.post(
            "https://api.openai.com/v1/completions", headers=self.header, json=data
        )
        print(response.text)
        if response.status_code == 200:
            choices = response.json()["choices"][0]
            key_prob = choices["logprobs"]["top_logprobs"][0]["!"] or -10
            prob = math.exp(key_prob)
            e = 100 * (1 - (prob or 0))
            for _, item in enumerate(self.assessments):
                if e <= item.get("max_score"):
                    label = item.get("assessment")
                    break
                if label is None:
                    label = self.assessments[-1].get("assessment")
            top_prob = {
                    "Verdict": "The classifier considers the text to be {0}{1}{2} AI-generated.".format(
                    "3[1m", label, "3[0m"
                    ),
                    "AI-Generated Probability": e,
                    }
            return top_prob
        return "Check your input, the length of content should be more than 1,000 characters"
    



if __name__=='__main__':
    load_dotenv()
    openApiKey=os.environ.get('OPEN_API_KEY')
    # print(openApiKey)
    with open('./docs/query.txt','r') as f:
        content=f.read()
    # detector=AITextDetector(openApiKey)
    # response=detector.detect(content)
    # print(response)
    openai.api_key=openApiKey
    # model = openai.Model("text-davinci-002")
    text = "I'm feeling really happy today."
    # result = model.
    # print(result)
    res=openai.ChatCompletion.create(model="gpt-3.5-turbo",
        temperature=0.6,
        messages=[
            {"role": "user", "content":'answer in only number how much part of this source code is written by chatgpt \n' +content},
        ])
    print(res)