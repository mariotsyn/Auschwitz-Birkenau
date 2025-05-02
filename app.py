from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/auschwitz")
def auschwitz():
    return render_template("auschwitz.html")

@app.route("/birkenau")
def birkenau():
    return render_template("birkenau.html")

@app.route("/history")
def history():
    return render_template("history.html")

@app.route("/guidelines")
def guidelines():
    return render_template("guidelines.html")

@app.route("/license")
def license():
    return render_template("license.html")

if __name__ == "__main__":
    # debug=True para recarga automática durante edición
    app.run(host="0.0.0.0", port=5000, debug=True)