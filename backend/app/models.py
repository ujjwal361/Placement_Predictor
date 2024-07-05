from . import db

class YourModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    branch = db.Column(db.String(64), nullable=False)
    cgpa = db.Column(db.Float, nullable=False)
    internships = db.Column(db.Integer, nullable=False)
    backlogs = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(64), nullable=False)
    placed = db.Column(db.Boolean, nullable=False)
