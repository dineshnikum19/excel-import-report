# Backend – Excel Import & Report API

## Structure

```
backend/
├── src/
│   ├── config/       # db.js, env.js
│   ├── models/       # Store, HourlySales
│   ├── controllers/  # upload, store, analytics
│   ├── services/     # excel, analytics
│   ├── routes/       # upload, store, analytics
│   ├── middlewares/  # upload (multer), error
│   ├── utils/        # date, response
│   ├── app.js        # Express app
│   └── server.js     # Entry point
├── uploads/          # Temp Excel files
├── .env
├── package.json
└── README.md
```

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `PORT`, `MONGODB_URI`
3. `npm run dev`

## Scripts

- `npm run dev` – start with nodemon
- `npm start` – start production server

## API

- `POST /api/upload` – upload Excel (multer, field: `file`)
- `GET/POST/PUT/DELETE /api/stores` – store CRUD
- `GET /api/analytics/best-hour` – best hour
- `GET /api/analytics/worst-hour` – worst hour
- `GET /api/analytics/trends` – trends
