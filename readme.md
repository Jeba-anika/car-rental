### A Car rental reservation system backend. Live Link: https://car-rental-reservation-system-teal.vercel.app/

Car rental reservation system backend built using Typescript, Express JS and Mongoose. This app helps a car rental business to keep track of cars and manage customer rentals.

- Technology used:

1. Node JS
2. Express JS
3. Typescript
4. Mongoose

### To run the application locally: clone this repository,run the command:

```
npm install
```

Then run the command

```
npm run start:dev
```

The application will start at port 3000. To run the routes locally just replace the live link with : http://localhost:3000/

### Application Routes:

#### User

- Route: https://car-rental-reservation-system-teal.vercel.app/api/auth/signup (POST)

```sample json:
{
    "name": "User",
    "email": "user@gmail.com",
    "role": "user",
    "password": "123456",
    "phone": "1234567890",
    "address": "Dhaka,Bangladesh"
}
```

- Route: https://car-rental-reservation-system-teal.vercel.app/api/auth/signin (POST)

```sample json:
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Cars

- Route: https://car-rental-reservation-system-teal.vercel.app/api/cars (POST)(Only accessible to admin)

```sample json:
{
  "name": "Audi e-tron",
  "description": "A luxury electric SUV with powerful performance and cutting-edge technology.",
  "color": "Grey",
  "isElectric": true,
  "features": ["Panoramic Sunroof", "Adaptive Cruise Control", "All-Wheel Drive"],
  "pricePerHour": 800
}
```

- Route: https://car-rental-reservation-system-teal.vercel.app/api/cars (GET)
- Route: https://car-rental-reservation-system-teal.vercel.app/api/cars/666c4d5bbfb29328ae8ad975 (Single GET)
- Route: https://car-rental-reservation-system-teal.vercel.app/api/cars/666c4d5bbfb29328ae8ad975 (PUT)(Only accessible to admin)

```sample json
{
    "color": "black",
    "description": "blah blah"
}
```

- Route: https://car-rental-reservation-system-teal.vercel.app/api/cars/666c4d5bbfb29328ae8ad975 (DELETE)(Only accessible to admin)
- Route: https://car-rental-reservation-system-teal.vercel.app/api/cars/return(PUT)

```sample json:
{
   "bookingId": "666c4d5bbfb29328ae8ad975",
   "endTime": "21:45"
}
```

### Bookings

- Route: https://car-rental-reservation-system-teal.vercel.app/api/bookings (POST)(Only accessible to user)

```sample json:
{
   "carId": "666c4da4bfb29328ae8ad981",
   "date": "2024-06-17",
   "startTime": "13:45"
}
```

- Route: https://car-rental-reservation-system-teal.vercel.app/api/bookings (GET)(Only accessible to admins)
  Query Parameters:

carId: ID of the car for which availability needs to be checked.
date: The specific date for which availability needs to be checked (format: YYYY-MM-DD).
Example Request:

- Route: https://car-rental-reservation-system-teal.vercel.app/api/bookings?carId=666c4d92bfb29328ae8ad97b&date=2024-06-16

- Route: https://car-rental-reservation-system-teal.vercel.app/api/bookings/my-bookings (GET)(Only accessible to users)
