# Expense Tracker App

A React Native mobile application for tracking personal expenses with real-time Firebase integration.

## Features

- 📱 Track daily expenses with description, amount, and date
- 💰 View expenses from the last 7 days
- 📊 See total expenses summary
- ✏️ Edit or delete existing expenses
- 🔄 Real-time data synchronization with Firebase
- 📊 Summary view with total amount for selected period

## Tech Stack

- React Native
- Expo
- Firebase Realtime Database
- React Navigation
- Axios for API calls

## Installation

1. Clone the repository
```bash
git clone https://github.com/chyashp/expense-tracker-react-native.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npx expo start
```

## Usage

- **Add Expense**: Tap the '+' button to add a new expense with description, amount, and date
- **Recent Expenses**: View expenses from the last 7 days
- **All Expenses**: See all recorded expenses
- **Edit/Delete**: Tap on any expense to edit or delete it

## Firebase Setup

This app uses Firebase Realtime Database. To set up your own Firebase instance:

1. Create a new project in Firebase Console
2. Set up Realtime Database
3. Update the `BACKEND_URL` in `util/http.js` with your Firebase database URL

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
