from crypt import methods
from flask import Flask, jsonify, request


app = Flask(__name__)


@app.route("/data", methods=["POST"])
def get_style():

    if request.is_json:
        data = request.get_json()
        print(data["style"])
        print(data["comment"])

    return "파일 경로를 보내드립니다"


if __name__ == "__main__":
    app.run(debug=True)
