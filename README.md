#  Coding Platform and Tool for Plagiarism Detection

A coding platfrom where you can code. It comes with plagiarism checker which generates a plagiarism report after every contest.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Loading](loading)
- [Suggestions](suggestions)
- [Contact](contact)


## Introduction

Welcome to Coding Platform and Tool for Plagiarism Detection, your ultimate destination for honing your coding skills! Our platform offers a diverse range of coding problems from various websites, ensuring you always have new challenges to tackle.

At Coding Platform and Tool for Plagiarism Detection, we prioritize fair competition. Our plagiarism detection system scans submissions after every contest, maintaining the integrity of the competition.

Powered by React on the frontend and Node.js with Express.js on the backend, [Project Name] offers a seamless user experience and efficient infrastructure.

Join our community, explore coding challenges, and elevate your skills. Happy coding!

## Features

List the key features of your project here.

- Questions from different platform for practice
- Collaborative Learning
- Plagiarism Detection

## Installation

To install this whole application you will need.

```
- Docker 
- Python 3.10
- Node.Js 
```
- for installing docker refer to this [Link](https://docs.docker.com/get-docker/)
- for installing python [link](https://www.python.org/downloads/)
- for Node.js [link](https://nodejs.org/en/download)



After installing all three things, navigate to the final folder and run the following command.

```
docker compose up
```
it will create the container for the following images.

now open a new terminal and run 

```
docker exec -it ubuntu bash
```

it will connect the current terminal to the _ubuntu_ bash. Then first update the ubuntu using the command.

```
sudo apt udpate
```

after that install nodejs and npm

```
sudo apt install nodejs
sudo apt install npm
```
As DOLOS works on specific node version 
first install curl in ubuntu
```
sudo apt install curl
```

Then to install specific version of node.js run these commands
```
npm i -g n
n 18.10.0
```
Now we have to install DOLOS in ubuntu

```
npm i @dodona/dolos
```

now navigate to **home/ubuntu** and run 
```
npm install
```

Now DOLOS installation is done.

--------------------------

Now navigate to Plagiarism Checker and run 

```
pip install -r requirement.txt
python -m spacy download en_core_web_sm
```

--------------------------
Navigate to the folder **frontend** and run
```
npm install
```
-----------------------------------------
Navigate to the folder **backend** and run
```
npm install
```

Here our installation part is done.

## Loading

in current folder run 
```
docker compose up
```
in new terminal run following commands.
```
docker exec -it bash
cd ./home/ubuntu
npm run dev
```

now in new termnal run navigate to **Plagiarism Checker** and run 
```
py main.py
```
now in new termnal run navigate to **frontend** and run 
```
npm run start
```

now in new termnal run navigate to **backend** and run 
```
npm run start
```

you can access the web at http://localhost:3000/

## Suggestions

- for now we were using jdoodle compiler api but you can use this node.js [package](https://www.npmjs.com/package/codehelp-compiler) as we had security concerns.
- For searching the code against internet we used Google custom search API, we have removed our credentials, just generate them and put in into **Plagiarism Checker/.env** and OPENAPI token also.
- To detect AI generated Code you can work machine learning part. You can create a LLM model for it but you have to create a dataset for it.


## Contact

If you have any please feel free to reach out to me
[Mail](mailto:shaulendra1@gmail.com).I am Shaulendra Kumar.