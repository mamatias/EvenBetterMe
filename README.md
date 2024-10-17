# ⏱️ Even Better Me
Welcome to **Even Better Me**, your ultimate tool to manage and time high-intensity interval training (HIIT) routines right from your browser! 💪🚀

This web application lets you select from predefined routines, start your workout, and follow along as the timer guides you through each step. Whether you're doing sprints, burpees, or simply taking a well-deserved break, the app has you covered. 🙌

## 🎯 Features

- **Choose a Routine**: Pick your desired workout from a simple dropdown.
- **Timer for Each Step**: Each step in your routine has a defined time, perfect for HIIT-style exercises.
- **Visual Progress**: Watch as the app guides you through each step, helping you stay on track.
- **Fully Customizable**: Add your own routines, modify existing ones, or create new timed workouts easily!

## 💻 How It Works

1. **Select a routine** from the dropdown menu.
2. Click the **START** button to begin your workout.
3. Follow along as the app shows you each step, with a countdown timer for every phase (exercise, rest, repeat!).
4. Once you're done, feel the burn! 🔥💥

## 🛠️ Project Structure

```bash
/mi-aplicacion-hiit
│
├── /css
│   └── styles.css              # All your custom styles
│
├── /js
│   └── app.js                  # The magic happens here! All the JS logic.
│
├── /data
│   └── routines.json           # Your customizable routines in JSON format.
│
├── /assets
│   └── (Optional: Any images, icons, or extra assets you need)
│
├── index.html                  # The main HTML entry point for the app.
└── README.md                   # You're reading this right now!
```
## 🚀 Getting Started
### Prerequisites
To get this project up and running, all you need is a web browser! 🖥️

### Installation
Clone the repository:
```bash
git clone https://github.com/your-username/EvenBetterMe.git
```
Open index.html in your favorite browser.
Get moving with your workout! 💪
## 📝 Customizing Your Routines
The routines are defined in a simple JSON format. You can find them in data/rutinas.json. Here's an example of a routine structure:

```json
{
  "id": 1,
  "name": "Basic HIIT Routine",
  "description": "A simple HIIT routine to get started.",
  "steps": [
    {
      "step": 1,
      "title": "Warm-up",
      "description": "Light stretches to get ready.",
      "time_secs": 60
    },
    {
      "step": 2,
      "title": "Sprint",
      "description": "Run at full speed.",
      "time_secs": 30
    }
  ]
}
```
You can easily add or modify steps and routines by editing the JSON file.

## 🤝 Contributing
Want to make this app better? Contributions are welcome! Feel free to fork the repository, make some improvements, and send a pull request. Together, we can make this the best HIIT timer ever! 😎

## ⚖️ License
This project is open-source and available under the MIT License. Feel free to use it, modify it, and share it as you like! 👐

```bash
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...
```
Thanks for checking out Even Better Me! Now, go crush those workouts! 💪🔥