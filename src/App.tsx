import { useState, useEffect } from "react";
import "./index.css";
import { Routine } from "./types";

const App: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Fetch routines from JSON file
  useEffect(() => {
    fetch("routines.json")
      .then((res) => res.json())
      .then((data) => setRoutines(data.routines))
      .catch((error) => console.error("Error loading routines:", error));
  }, []);

  // Handle routine selection
  const handleRoutineSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const routine = routines.find((r) => r.id === Number(event.target.value)) || null;
    setSelectedRoutine(routine);
    setCurrentStep(0);
  };

  // Start routine
  const startRoutine = () => {
    if (selectedRoutine && selectedRoutine.steps.length > 0) {
      setIsRunning(true);
      setCurrentStep(0);
      setStartTime(Date.now());
      setTimeLeft(selectedRoutine.steps[0].time_secs);
    }
  };

  // Handle timer updates
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      if (startTime !== null) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = selectedRoutine!.steps[currentStep].time_secs - elapsedTime;

        if (remainingTime <= 0) {
          clearInterval(interval);
          nextStep();
        } else {
          setTimeLeft(remainingTime);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, startTime, currentStep]);

  // Move to next step
  const nextStep = () => {
    if (!selectedRoutine) return;

    if (currentStep + 1 < selectedRoutine.steps.length) {
      setCurrentStep((prev) => prev + 1);
      setStartTime(Date.now());
      setTimeLeft(selectedRoutine.steps[currentStep + 1].time_secs);
    } else {
      setIsRunning(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>💪 Even Better Me ⏱️</h1>
      </header>

      {!isRunning ? (
        <main>
          <section id="routine-selection">
            <h2>Select Your Routine</h2>
            <select onChange={handleRoutineSelect}>
              <option value="">👉 Choose a Routine</option>
              {routines.map((routine) => (
                <option key={routine.id} value={routine.id}>
                  {routine.name}
                </option>
              ))}
            </select>
            <button onClick={startRoutine} disabled={!selectedRoutine}>
              START
            </button>
          </section>
        </main>
      ) : (
        <main>
          <section id="routine-progress">
            <h2>
              {selectedRoutine!.steps[currentStep].step}. {selectedRoutine!.steps[currentStep].title}
            </h2>
            <p>{selectedRoutine!.steps[currentStep].description}</p>

            <div id="timer">
              <span style={{ fontSize: "4rem", fontWeight: "bold" }}>{timeLeft}</span> seconds
            </div>
          </section>
        </main>
      )}

      <footer>
        <p>&copy;{new Date().getFullYear()} Even Better Me</p>
      </footer>
    </div>
  );
};

export default App;