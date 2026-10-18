import React, { useEffect, useState } from "react";

const days = [
  ["Monday", "pink"],
  ["Tuesday", "yellow"],
  ["Wednesday", "green"],
  ["Thursday", "blue"],
  ["Friday", "purple"],
  ["Holiday", "peach"]
];

const emptyDay = () => ({
  breakfast: "",
  lunch: "",
  dinner: "",
  snacks: ""
});

const initialPlanner = {
  Monday: emptyDay(),
  Tuesday: emptyDay(),
  Wednesday: emptyDay(),
  Thursday: emptyDay(),
  Friday: emptyDay(),
  Holiday: emptyDay(),
  shopping: "",
  notes: ""
};

function App() {
  const [planner, setPlanner] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("weeklyMealPlanner")) || initialPlanner;
    } catch {
      return initialPlanner;
    }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("weeklyMealPlanner", JSON.stringify(planner));
  }, [planner]);

  const updateDay = (day, field, value) => {
    setPlanner(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
    setSaved(false);
  };

  const updateTop = (field, value) => {
    setPlanner(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const savePlan = () => {
    localStorage.setItem("weeklyMealPlanner", JSON.stringify(planner));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const clearPlan = () => {
    if (!confirm("Clear the whole weekly meal plan?")) return;
    setPlanner(initialPlanner);
    localStorage.removeItem("weeklyMealPlanner");
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="mini-label">W E E K L Y <span>✦</span></div>
        <h1>Meal Planner</h1>
        <p>Plan your meals beautifully, one day at a time.</p>
        <div className="sunburst">✺</div>
      </header>

      <section className="top-grid">
        <div className="note-box shopping">
          <label>Things to Buy</label>
          <textarea
            value={planner.shopping}
            onChange={e => updateTop("shopping", e.target.value)}
            placeholder="Milk, vegetables, grains..."
          />
        </div>

        <div className="note-box notes">
          <label>Notes</label>
          <textarea
            value={planner.notes}
            onChange={e => updateTop("notes", e.target.value)}
            placeholder="Add your weekly notes..."
          />
        </div>
      </section>

      <main className="days-grid">
        {days.map(([day, color]) => (
          <section className="day-card" key={day}>
            <div className={`day-title ${color}`}>{day}</div>

            <div className="meal-list">
              {[
                ["breakfast", "Breakfast"],
                ["lunch", "Lunch"],
                ["dinner", "Dinner"],
                ["snacks", "Snacks"]
              ].map(([field, label]) => (
                <label className="meal-row" key={field}>
                  <span>{label}</span>
                  <input
                    value={planner[day][field]}
                    onChange={e => updateDay(day, field, e.target.value)}
                    placeholder="Add meal"
                  />
                </label>
              ))}
            </div>
          </section>
        ))}
      </main>

      <div className="actions">
        <button className="save" onClick={savePlan}>{saved ? "✓ Saved" : "Save Plan"}</button>
        <button className="clear" onClick={clearPlan}>Clear</button>
      </div>

      <footer>Weekly Meal Planner • Simple • Beautiful • Easy to use</footer>
    </div>
  );
}

export default App;