from flask import Flask, redirect, url_for, request, render_template, send_from_directory
import json
import pyrebase 

config = {
    "apiKey": "AIzaSyDQyHhpsSepLEtFaFjhQWBOssfK-gLpvkI",
    "authDomain": "nexochallenge.firebaseapp.com",
    "databaseURL": "https://nexochallenge.firebaseio.com",
    "projectId": "nexochallenge",
    "storageBucket": "nexochallenge.appspot.com",
    "messagingSenderId": "84073883170"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

app = Flask(__name__)
@app.route("/")
def hello():
    return render_template('login.html')

@app.route("/login", methods=['POST'])
def login():
    body = json.loads(request.data)
    email = body["email"]
    password = body["password"]
    print("LOGIN REQUEST: ", email, password)
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return json.dumps({"status": "200", "email": email, "password": password, "idToken": user["idToken"]}, default=lambda x: x.__dict__) 
    except:
        return json.dumps({"status": "404"}, default=lambda x: x.__dict__) 

@app.route("/singup", methods=['POST'])
def signup():
    body = json.loads(request.data)
    email = body["email"]
    password = body["password"]
    print("SIGNUP REQUEST: ", email, password)
    try:
        user = auth.create_user_with_email_and_password(email, password)
        db.child("userCounter").set({0}, user['idToken'])
        return json.dumps({"status": "200", "email": email, "password": password, "idToken": user["idToken"]}, default=lambda x: x.__dict__) 
    except:
        return json.dumps({"status": "404"}, default=lambda x: x.__dict__) 

@app.route("/index", methods=["GET"])
def index():
    print("INDEX REQUEST")
    return render_template('index.html') 

#CREATE
@app.route("/addTarefa", methods=["POST"])
def addTarefas():
    body = json.loads(request.data)
    title = body["title"]
    content = body["content"]
    idToken = body["idToken"]
    tarefa = {
        "title": title,
        "content": content
    }
    try:
        db.child("tarefas").push(tarefa, idToken)
        return json.dumps({"status": "200"}, default=lambda x: x.__dict__)
    except:
        return json.dumps({"status": "400"}, default=lambda x: x.__dict__)

#READ
@app.route("/getTarefas", methods=["POST"])
def tarefas():
    body = json.loads(request.data)
    idToken = body["idToken"]
    res = db.child("tarefas").get(idToken).val()
    if(res):
        return json.dumps(res, default=lambda x: x.__dict__)
    else:
        return json.dumps({"isEmpty": 1}, default=lambda x: x.__dict__)                

#UPDATE
@app.route("/updateTarefa", methods=["POST"])
def update():
    body = json.loads(request.data) 
    id = body["id"]
    content = body["content"]
    db.child("tarefas").child(id).update({"content": content})
    return json.dumps({"status": "200"}, default=lambda x: x.__dict__)

#DELETE
@app.route("/removeTarefa", methods=["POST"])
def remove():
    body = json.loads(request.data) 
    id = body["id"]
    if(id):
        db.child("tarefas").child(id).remove()
        return json.dumps({"status": "200"}, default=lambda x: x.__dict__)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)