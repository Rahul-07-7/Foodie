import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 200);

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setIsComplete(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {isComplete ? (
        <h2>Countdown Complete!</h2>
      ) : (
        <div style={styles.timeContainer}>
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} style={styles.timeBox}>
              <span style={styles.value}>{String(value).padStart(2, "0")}</span>
              <span style={styles.label}>{label.toUpperCase()}</span>
              <div style={styles.underline}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const boxSize = "100px";

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "2rem auto",
  },
  timeContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  timeBox: {
    backgroundColor: "#FC791A",
    color: "white",
    width: boxSize,
    height: boxSize,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    position: "relative",
    fontWeight: "bold",
  },
  value: {
    fontSize: "1.8rem",
  },
  label: {
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  },
  underline: {
    position: "absolute",
    bottom: "8px",
    left: "20%",
    width: "60%",
    height: "3px",
    backgroundColor: "white",
    borderRadius: "2px",
  },
};

export default Countdown;
