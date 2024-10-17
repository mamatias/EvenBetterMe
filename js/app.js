// Function to load routines from the JSON file
async function loadRoutines() {
    try {
        const response = await fetch('data/routines.json');
        const data = await response.json();
        return data.routines;
    } catch (error) {
        console.error('Error loading routines:', error);
        return [];
    }
}

// Function to populate the dropdown with routines
async function populateDropdown() {
    const routines = await loadRoutines();
    const dropdown = document.getElementById('routineDropdown');

    routines.forEach(routine => {
        const option = document.createElement('option');
        option.value = routine.id;
        option.textContent = routine.name;
        dropdown.appendChild(option);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', populateDropdown);

// Global variables to control the timer and the selected routine
let currentRoutine = null;
let currentStep = 0;
let timer;

// Handle the "START" button event
document.getElementById('startBtn').addEventListener('click', async () => {
    const selectedId = document.getElementById('routineDropdown').value;
    const routines = await loadRoutines();
    currentRoutine = routines.find(r => r.id == selectedId);

    if (currentRoutine) {
        startRoutine();
    } else {
        alert('Please select a valid routine.');
    }
});

// Function to start the routine
function startRoutine() {
    document.getElementById('routine-selection').style.display = 'none';
    document.getElementById('routine-progress').style.display = 'block';

    currentStep = 0; // Reset to the first step
    displayCurrentStep();
}

// Function to display the current step and start the timer
function displayCurrentStep() {
    const step = currentRoutine.steps[currentStep];
    document.getElementById('routine-name').textContent = `${step.step}. ${step.title}`;
    document.getElementById('step-title').textContent = step.title;
    document.getElementById('step-description').textContent = step.description;

    startTimer(step.time_secs);
}

// Function to start the timer for each step
function startTimer(duration) {
    let timeRemaining = duration;
    document.getElementById('time-left').textContent = timeRemaining;

    // Clear any previous timer
    clearInterval(timer);

    // Start the new timer
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('time-left').textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            currentStep++;

            if (currentStep < currentRoutine.steps.length) {
                displayCurrentStep(); // Show the next step
            } else {
                showFinalScreen(); // If all steps are completed, show the summary
            }
        }
    }, 1000); // Update every second
}

// Function to show the final screen with the routine summary
function showFinalScreen() {
    document.getElementById('routine-progress').style.display = 'none';
    
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'final-screen';
    summaryDiv.innerHTML = `
        <h2>Routine Completed!</h2>
        <p>You have completed the routine: ${currentRoutine.name}</p>
        <button id="goBackBtn">Go back to routine selection</button>
    `;
    
    document.body.appendChild(summaryDiv);

    // Event to return to the initial screen
    document.getElementById('goBackBtn').addEventListener('click', () => {
        document.getElementById('final-screen').remove(); // Remove the final screen
        document.getElementById('routine-selection').style.display = 'block'; // Show the initial screen again
    });
}
