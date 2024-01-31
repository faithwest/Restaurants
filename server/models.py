from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    pizzas = db.relationship('Pizza', secondary='restaurant_pizzas', back_populates='restaurants')
    restaurant_pizzas_rel = db.relationship('Restaurant_pizza', back_populates='restaurant', overlaps="pizzas,restaurants")
    def to_dict(self):
        return {"id": self.id, "name": self.name, "address": self.address}

class Pizza(db.Model):
    __tablename__ = 'pizzas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ingredients = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    restaurants = db.relationship('Restaurant', secondary='restaurant_pizzas', overlaps="pizzas")
     
    def to_dict(self):
        return {"id": self.id, "name": self.name, "ingredients": self.ingredients}


class Restaurant_pizza(db.Model):
    __tablename__='restaurant_pizzas'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'))
    restaurant = db.relationship('Restaurant', backref=db.backref('restaurant_pizzas', cascade='all, delete-orphan'), overlaps="pizzas,restaurants")