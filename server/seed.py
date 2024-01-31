from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from faker import Faker

from models import db, Restaurant, Pizza, Restaurant_pizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

fake = Faker()

def seed_data():
    with app.app_context():
        db.create_all()

        for _ in range(10):
            restaurant = Restaurant(name=fake.company(), address=fake.address())
            db.session.add(restaurant)

        for _ in range(10):
            pizza = Pizza(name=fake.word(), ingredients=fake.text())  # Correct the variable name
            db.session.add(pizza)

        db.session.commit()

        restaurants = Restaurant.query.all()
        pizzas = Pizza.query.all()  # Correct the variable name

        for restaurant in restaurants:
            pizzas_to_associate = fake.random_elements(elements=pizzas, length=fake.random_int(min=1, max=5), unique=True)

            for pizza in pizzas_to_associate:
                restaurant_pizza = Restaurant_Pizza(price=fake.random_int(min=5, max=20), restaurant=restaurant, pizza=pizza)
                db.session.add(restaurant_pizza)

        db.session.commit()

if __name__ == '__main__':
    print('seeding')
    print('seeding succesful')


    