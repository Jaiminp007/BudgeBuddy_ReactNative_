# BudgetBuddy

![BudgetBuddy Logo](assets/Logo.png)

**BudgetBuddy** is a cross-platform personal finance management app built with React Native and Expo. It helps users track cash, manage expenses, visualize spending trends, and provide feedback—all with a clean, modern UI.

---

## 🚀 Features

- **User Accounts:** Sign up, switch, and delete multiple user accounts.
- **Cash Management:** Set and update your cash balance.
- **Expense Tracking:** Add expenses with notes and dates.
- **Top Expenses:** See your highest expenses at a glance.
- **Currency Support:** Choose between Rupee, Dollar, Euro, and Pound.
- **Visual Analytics:** Interactive line chart of your cash history.
- **Persistent Storage:** All data is stored locally using AsyncStorage.
- **Feedback Form:** Submit feedback directly from the app.
- **Navigation Drawer:** Quick access to Dashboard, Feedback, Logout, and Delete Account.
- **Responsive UI:** Works on Android, iOS, and Web.

---

## 📦 Project Structure

```
.
├── app/
│   ├── components/         # UI components (Login, Main, Expense, Feedback, etc.)
│   ├── services/           # API and data service logic
│   ├── GlobalData.js       # Global state for user session
│   ├── _layout.jsx         # Drawer navigation and layout
│   ├── index.jsx           # Entry point
│   ├── MainPage.jsx        # Main dashboard page
│   ├── LoginPage.jsx       # Landing page after login
│   ├── LandingPage.jsx     # Initial cash/currency setup
│   ├── ExpensePage.jsx     # Add expense page
│   └── feedback.jsx        # Feedback form page
├── assets/                 # App icons, images, and Lottie animations
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── babel.config.js         # Babel configuration
└── app.json                # Expo configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

```sh
git clone https://github.com/yourusername/BudgeBuddy_ReactNative_.git
cd BudgeBuddy_ReactNative_
npm install
# or
yarn install
```

### Running the App

```sh
npm start
# or
yarn start
```

- Press `a` for Android, `i` for iOS, or `w` for Web in the Expo CLI.

---

## 🧩 Main Technologies

- **React Native** (with Expo)
- **TypeScript**
- **React Navigation** (Drawer)
- **AsyncStorage** (local storage)
- **react-native-chart-kit** (charts)
- **Lottie** (animations)
- **react-native-paper** (UI components)

---

## 📚 Key Files

- `app/components/MainScreen.jsx`: Main dashboard UI.
- `app/components/ExpenseScreen.jsx`: Add and manage expenses.
- `app/components/LoginScreen.tsx`: User sign up and account selection.
- `app/components/FeedbackForm.tsx`: Feedback submission form.
- `app/services/apiHost.js`: API and data logic (for future backend integration).
- `app/_layout.jsx`: Drawer navigation and layout.

---

## 📝 Feedback

We value your feedback! Use the in-app Feedback form or [open an issue](https://github.com/yourusername/BudgeBuddy_ReactNative_/issues).

---

## 🏷️ Tags

`react-native` `expo` `personal-finance` `expense-tracker` `mobile-app` `typescript` `asyncstorage` `charts` `lottie` `feedback` `drawer-navigation`

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

- [Your Name](https://github.com/yourusername)

---

> _Happy budgeting with BudgetBuddy!_
