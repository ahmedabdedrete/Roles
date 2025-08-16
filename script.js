// script.js
const roles = [
  "Hardware & Embedded Systems",
  "AI Developer – Facial Recognition",
  "Backend Developer – Database Systems",
  "Web Developer",
  "Mobile App Developer",
  "System Integrator & Tester"
];

const questionsPerRole = 10;
const totalQuestions = roles.length * questionsPerRole;

let currentPage = 0;
const answers = Array(totalQuestions).fill(null);
let userName = "";

const questionSets = [
  // Hardware Questions
  [
    "Do you enjoy working with sensors, circuits, and physical devices?",
    "Are you comfortable wiring components like cameras, GPS, or microphones?",
    "Do you have experience with microcontrollers like Arduino or Raspberry Pi?",
    "Can you troubleshoot hardware issues using multimeters or debugging tools?",
    "Do you understand how to optimize power consumption in embedded devices?",
    "Are you familiar with GPIO, I2C, or UART communication protocols?",
    "Have you ever programmed hardware in C, C++, or MicroPython?",
    "Are you interested in integrating hardware with cloud or local software systems?",
    "Do you like designing compact and wearable electronics?",
    "Can you read and interpret electronic circuit diagrams confidently?"
  ],
  // Facial Recognition Questions
  [
    "Do you enjoy working with images and video data in machine learning?",
    "Have you used tools like OpenCV or TensorFlow/Keras for image processing?",
    "Are you confident in training models for face detection or recognition?",
    "Do you understand convolutional neural networks (CNNs)?",
    "Have you worked with datasets involving human faces?",
    "Are you interested in ensuring AI models run efficiently on small devices?",
    "Do you know how to handle real-time video input from a camera?",
    "Do you enjoy evaluating model accuracy, precision, and recall?",
    "Can you apply techniques like face embedding and similarity matching?",
    "Are you comfortable using Python libraries like Dlib or FaceNet?"
  ],
  // Voice Recognition Questions
  [
     "Do you have experience with MySQL, PostgreSQL, or MongoDB?",
        "Can you design a relational or NoSQL database schema?",
        "Have you written APIs to access data from a database?",
        "Do you understand database normalization and indexing?",
        "Can you write complex SQL queries to extract data?",
        "Do you know how to manage and back up databases securely?",
        "Have you connected databases to mobile or web apps before?",
        "Do you know how to store binary data like images or audio?",
        "Are you familiar with cloud-hosted database services (Firebase, AWS RDS)?",
        "Do you enjoy maintaining structured, optimized data pipelines?"
  ],
  // Web Developer Questions
  [
    "Do you enjoy creating interactive and modern websites?",
    "Have you used HTML, CSS, and JavaScript to build user interfaces?",
    "Are you familiar with frameworks like React, Vue, or plain JS DOM methods?",
    "Can you fetch and display real-time data from a server or device?",
    "Do you understand how to design responsive layouts for different screen sizes?",
    "Have you created dashboards, charts, or logs using web tools?",
    "Can you design forms, buttons, and user feedback elements for the web?",
    "Are you familiar with APIs and how to use them in the frontend?",
    "Do you care about accessibility and user experience (UX) in web design?",
    "Can you troubleshoot bugs and use browser developer tools confidently?"
  ],
  // Mobile Developer Questions
  [
    "Do you enjoy building mobile applications for Android or iOS?",
    "Have you used tools like Flutter, React Native, or native SDKs?",
    "Are you comfortable designing user-friendly mobile interfaces?",
    "Can you integrate real-time alerts, notifications, or GPS into a mobile app?",
    "Have you used mobile storage (local or cloud-based) in your projects?",
    "Are you able to debug mobile issues on different screen sizes?",
    "Have you designed apps that sync with web or hardware data sources?",
    "Are you confident publishing or building mobile apps for deployment?",
    "Do you know how to handle permissions like camera, mic, and location?",
    "Can you design apps with caregivers or accessibility users in mind?"
  ],
  // Integration & Testing
  [
    "Do you like ensuring that different systems work smoothly together?",
    "Have you tested systems involving sensors, AI, and apps?",
    "Are you confident using tools like Git for version control and integration?",
    "Do you enjoy identifying bugs, inconsistencies, or sync issues?",
    "Have you written test plans or scenarios to validate functionality?",
    "Can you debug issues across different platforms (web, mobile, embedded)?",
    "Are you comfortable handling data flow between multiple modules?",
    "Do you like documenting and organizing the integration process?",
    "Have you deployed apps or systems to production/test environments?",
    "Do you enjoy acting as a bridge between different team roles?"
  ]
];

function renderPage() {
  const container = document.getElementById("quiz-content");
  container.innerHTML = "";

  if (currentPage === 0) {
    container.innerHTML = `
      <label>Enter your name:</label>
      <input type="text" id="name-input" placeholder="Your name..." value="${userName}" required />
    `;
  } else {
    const roleIndex = currentPage - 1;
    const questions = questionSets[roleIndex];
    questions.forEach((q, idx) => {
      const questionNumber = roleIndex * questionsPerRole + idx;
      container.innerHTML += `
        <div class="question">
          <p>${idx + 1}. ${q}</p>
          <label><input type="radio" name="q${questionNumber}" value="1" ${answers[questionNumber] === "1" ? "checked" : ""}> Yes</label>
          <label><input type="radio" name="q${questionNumber}" value="0" ${answers[questionNumber] === "0" ? "checked" : ""}> No</label>
        </div>
      `;
    });
  }

  document.getElementById("back-btn").style.display = currentPage > 0 ? "inline-block" : "none";
  document.getElementById("next-btn").style.display = currentPage < roles.length ? "inline-block" : "none";
  document.getElementById("submit-btn").style.display = currentPage === roles.length ? "inline-block" : "none";
}

function nextPage() {
  if (currentPage === 0) {
    const input = document.getElementById("name-input").value.trim();
    if (!input) return alert("Please enter your name.");
    userName = input;
  } else {
    const roleIndex = currentPage - 1;
    for (let i = 0; i < 10; i++) {
      const questionIndex = roleIndex * 10 + i;
      const selected = document.querySelector(`input[name='q${questionIndex}']:checked`);
      if (!selected) return alert("Please answer all questions before continuing.");
      answers[questionIndex] = selected.value;
    }
  }
  currentPage++;
  renderPage();
}

function prevPage() {
  if (currentPage > 0) currentPage--;
  renderPage();
}

function submitQuiz() {
  // Count score per role
  const roleScores = roles.map((_, i) => {
    return answers.slice(i * 10, i * 10 + 10).reduce((a, b) => a + Number(b), 0);
  });
  const bestRoleIndex = roleScores.indexOf(Math.max(...roleScores));

  // Store data for result page
  localStorage.setItem("quizUserName", userName);
  localStorage.setItem("quizAnswers", JSON.stringify(answers));
  localStorage.setItem("quizRole", roles[bestRoleIndex]);

  window.location.href = "result.html";
}

// Initial render
window.onload = renderPage;
