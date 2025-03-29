import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h1>About Dishcovery</h1>
      <p>
        Welcome to <strong>Dishcovery</strong>, our <strong>HooHacks 2025 Project</strong>! Our goal is to help users
        discover recipes based on ingredients or nutrient goals, making healthy eating
        more accessible and enjoyable. This project was built using <strong>React</strong> and
        the <strong>Spoonacular API</strong> for recipe data.
      </p>

      <h2>Meet the Team</h2>
      <div style={styles.teamContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.card}>
            <img src={member.image} alt={member.name} style={styles.image} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Team members data
const teamMembers = [
  {
    name: "Hanna Chong",
    role: "Frontend Developer",
    image: "/images/hanna.png",
  },
  {
    name: "Celestine Nguyen",
    role: "Fullstack Developer",
    image: "/images/celestine.png",
  },
  {
    name: "Ryan Nguyen",
    role: "Backend/API Developer",
    image: "/images/ryan.png",
  },
];

const styles = {
  container: { 
    padding: "20px", 
    textAlign: "center", 
    color: "#224214"  
  },
  teamContainer: { display: "flex", justifyContent: "center", gap: "20px" },
  card: { padding: "15px", borderRadius: "10px", background: "#f4f4f4", textAlign: "center" },
  image: { width: "100px", height: "100px", borderRadius: "50%" },
};

export default About;
