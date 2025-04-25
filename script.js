function speakText(text) {
  if (!window.speechSynthesis) {
    console.warn("Text-to-speech not supported.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;  // Speed of speech
  utterance.pitch = 1; // Voice pitch
  utterance.lang = "en-US";
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  window.speechSynthesis.speak(utterance);
}
function navigateTo(url) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = url;
    }, 500); // match the CSS transition duration
}
const text = "NavigateMR5 is a website built by UVA undergraduates to help making navigation at MR5 a lot easier!";
const speed = 100; // typing speed in milliseconds

let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = typeWriter;

document.addEventListener("DOMContentLoaded", () => {
  const directions = document.getElementById("Directions");

  let startRoom = null;

  const roomNames = [
    "BME1st",
    "BMELarge",
    "SharedLab",
    "Kubelick",
    "Griffin",
    "French",
    "Sheybani",
    "Abebayehu",
    "Christ1",
    "Christ2",

    "BMESmall",
    "Atrium",
    "Papin",
    "Meyer",
    "SharedLabSpace",
    "Papin2",
    "Price1",
    "Price2",
    "Zunder",
    "Barker",
    "Peirce1",
    "Lazzara1",
    "Lazzara2",
    "Epstein",
    "Blemker",
    "Jane2",
    "Jane1",
    "Fallahi2",
    "Fallahi1",
    "Saucerman2",
    "Saucerman1",
    "Peirce2"
  ];

  const roomReadableNames = {
    BME1st: "BME 1st floor Foyer",
    BMELarge: "BME Large Classroom",
    SharedLab: "Shared Lab Space",
    Kubelick: "Kubelick Lab",
    Griffin: "Griffin Lab",
    French: "French Lab",
    Sheybani: "Sheybani Lab",
    Abebayehu: "Abebayehu Lab",
    Christ1: "Christ Lab #1",
    Christ2: "Christ Lab #2"
  };

  // Mock route instructions for demo — you can modify these
  const directionMap = {
    BME1st: {
      BMELarge: ["1. Walk straight through hallway until you reach hallway junction", "2. Turn left at hallway junction and destination is right in front of you"],
      SharedLab: ["1. Walk forward", "2. Turn right at hallway junction", "3. Destination is the third room to the left"],
      Kubelick: ["1. Walk forward", "2. Turn right at hallway junction", "3. Destination is the fourth room to the left"],
      Griffin: ["1.Walk forward", "2. Turn right at hallway junction", "3. Destination is the fifth room to the left"],
      French: ["1. Walk forward", "2. Turn right at hallway junction", "3. Destination is the seventh room to the left"],
      Sheybani: ["1. Walk forward", "2. Turn right at hallway junction", "3. Destination is the eighth room to the left"],
      Abebayehu: ["1. Walk forward", "2. Turn right at hallway junction", "3. Destination is the ninth room to the left"],
      Christ1: ["1. Walk forward", "2. Turn right at hallway junction", "3. Destination is the room before the last door on the left"],
      Christ2: ["1. Walk forward", "2. Turn right at hallway junction", "3. Room is last door on the left"],
    },
    BMELarge: {
      BME1st: ["1. Make your way into hallway", "2. Turn right", "3. Walk down hallway and your destination is at the end of the hallway"],
      SharedLab: ["1. Make your way into hallway", "2. Walk forward at the hallway junction", "3. Destination is the third room on the left"],
      Kubelick: ["1. Make your way into hallway", "2. Walk forward at the hallway junction", "3. Destination is fourth room on the left"],
      Griffin:["1. Make your way into hallway", "2. Walk forward at the hallway junction", "3. Destination is fifth room on the left"],
      French: ["1. Make your way into hallway", "2. Walk forward at the hallway junction", "3. Destination is seventh room on the left"],
      Sheybani: ["1. Make your way into hallway", "2. Walk forward at the hallway junction", "3. Destination is eighth room on the left"],
      Abebayehu:["1. Make your way into hallway", "2. Walk forward at the hallway junction", "3. Destination is ninth room on the left"],
      Christ1: ["1. Make way into hallway and walk straight down hallway", "2. Desination is the room right before last room at the end of the hallway, on your left"],
      Christ2:["1. Walk straight down hallway past the hallway junction", "2. Destination is last room on the left at the end of the hallway"],
    },
    
    SharedLab: {
      BME1st: ["1. Turn right and walk to hallway junction", "2. Turn left at hallway junction and walk down the hallway.", "3. Destination is at the end of the hall"],
      BMELarge: ["1. Turn right and walk all the way down past hallway junction and destination should be room right in front"],
      Kubelick: ["1. Turn left and walk down the hallway", "2. Destination is the next room on your left"],
      Griffin: ["1. Turn left and walk down the hallway", "2. Destination is the second room on your left"],
      French: ["1. Turn left and walk down the hallway", "2. Destination is the fourth room on your left"],
      Sheybani: ["1. Turn left and walk down the hallway", "2. Destination is the fifth room on your left"],
      Abebayehu: ["1. Turn left and walk down the hallway", "2. Destination is the sixth room on your left"],
      Christ1: ["1. Turn left and walk all the way down the hallway", "2. Destination is the room just before the last room on your left"],
      Christ2: ["1. Turn left and walk to the end of the hallway", "2. Destination is the last room on the left"]   
    },
    Kubelick: {
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction", "3. Walk down the hall and your destination is in front of you"],
      BMELarge: ["1. Turn right and walk down towards hallway junction", "2. When you reach hallway junction, walk forward and your destination is in front of you"],
      SharedLab: ["1. Turn right and walk", "2. Destination is the first room to your right"],
      Griffin:["1. Turn left and walk", "2. Destination is the first room to your left"],
      French:["1. Turn left and walk", "2. Desintation is the third room to your left"],
      Sheybani: ["Turn left and walk", "2. Destination is the fourth room to your left"],
      Abebayehu:["Turn left and walk", "2. Destination is the fifth room to your left"],
      Christ1: ["Turn left and walk", "2. Destination is the room before the last room down the hall on your left"],
      Christ2: ["Turn left and walk", "2. Destination is the last room down the hall on your left"],
    },
    Griffin: {
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction and your destination is down the hall and right in front of you"],
      BMELarge: ["1. Turn right and walk down towards hallway junction", "2. At hallway junction, walk forward past junction and destination is right in front of you"],
      SharedLab:["1. Turn right and walk down", "2. Destination is the second room on your right"],
      Kubelick: ["1. Turn right and walk down", "2. Destination is the first room on your right"],
      French:["1. Turn left and walk down", "2. Destination is the second room on your left"],
      Sheybani:["1. Turn left and walk down", "2. Destination is the third room on your left"],
      Abebayehu: ["1. Turn left and walk down", "2. Destination is the fourth room on your left"],
      Christ1: ["1. Turn left and walk down", "2. Destination is the room before the last room down the hall on your left"],
      Christ2: ["1. Turn left and walk down", "2. Destination is the last room down the hall on your left"],
    },
    French: {
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction and your destination is down the hall and right in front of you"],
      BMELarge:["1. Turn right and walk down towards hallway junction", "2. At hallway junction, walk forward past junction and destination is right in front of you"],
      SharedLab: ["1. Turn right and walk down", "2. Destination is the fourth room on your right"],
      Kubelick: ["1. Turn right and walk down", "2. Destination is the third room on your right"],
      Griffin: ["1. Turn right and walk down", "2. Destination is the second room on your right"],
      Sheybani: ["1. Turn left and walk down", "2. Destination is the first room on your left"],
      Abebayehu: ["1. Turn left and walk down", "2. Destination is the second room on your left"],
      Christ1: ["1. Turn left and walk down", "2. Destination is the room before the last room down the hall on your left"],
      Christ2:["1. Turn left and walk down", "2. Destination is the last room down the hall on your left"],
    },
    Sheybani:{
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction and your destination is down the hall and right in front of you"],
      BMELarge: ["1. Turn right and walk down towards hallway junction", "2. At hallway junction, walk forward past junction and destination is right in front of you"],
      SharedLab: ["1. Turn right and walk down", "2. Destination is the fifth room on your right"],
      Kubelick:["1. Turn right and walk down", "2. Destination is the fourth room on your right"],
      Griffin:["1. Turn right and walk down", "2. Destination is the third room on your right"],
      French:["1. Turn right and walk down", "2. Destination is the first room on your right"],
      Abebayehu:["1. Turn left and walk down", "2. Destination is the first room on your left"],
      Christ1: ["1. Turn left and walk down", "2. Destination is the second room on your left"],
      Christ2: ["1. Turn left and walk down the hallway and your destination is the last room down the hall"],
    },
    Abebayehu: {
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction and your destination is down the hall and right in front of you"],
      BMELarge: ["1. Turn right and walk down towards hallway junction", "2. At hallway junction, walk forward past junction and destination is right in front of you"],
      SharedLab: ["1. Turn right and walk down", "2. Destination is the sixth room on your right"],
      Kubelick: ["1. Turn right and walk down", "2. Destination is the fifth room on your right"],
      Griffin: ["1. Turn right and walk down", "2. Destination is the fourth room on your right"],
      French: ["1. Turn right and walk down", "2. Destination is the second room on your right"],
      Sheybani: ["1. Turn right and walk down", "2. Destination is the first room on your right"],
      Christ1: ["1. Turn left and walk down", "2. Destination is the first room on your left"],
      Christ2:  ["1. Turn left and walk down", "2. Destination is the last room down the hall on your left"],
    },
    Christ1: {
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction and your destination is down the hall and right in front of you"],
      BMELarge: ["1. Turn right and walk down towards hallway junction", "2. At hallway junction, walk forward past junction and destination is right in front of you"],
      SharedLab: ["1. Turn right and walk down", "2. Destination is the seventh room on your right"],
      Kubelick: ["1. Turn right and walk down", "2. Destination is the sixth room on your right"],
      Griffin: ["1. Turn right and walk down", "2. Destination is the fifth room on your right"],
      French: ["1. Turn right and walk down", "2. Destination is the third room on your right"],
      Sheybani: ["1. Turn right and walk down", "2. Destination is the second room on your right"],
      Abebayehu: ["1. Turn right and walk down", "2. Destination is the first room on your right"],
      Christ2: ["1. Turn left and walk down", "2. Destination is the first room to your left"],
    },
    Christ2: {
      BME1st: ["1. Turn right and walk down towards hallway junction", "2. Turn left at hallway junction and your destination is down the hall and right in front of you"],
      BMELarge: ["1. Turn right and walk down towards hallway junction", "2. At hallway junction, walk forward past junction and destination is right in front of you"],
      SharedLab: ["1. Turn right and walk down", "2. Destination is the eighth room on your right"],
      Kubelick:["1. Turn right and walk down", "2. Destination is the seventh room on your right"],
      Griffin:["1. Turn right and walk down", "2. Destination is the sixth room on your right"],
      French:["1. Turn right and walk down", "2. Destination is the fourth room on your right"],
      Sheybani:["1. Turn right and walk down", "2. Destination is the third room on your right"],
      Abebayehu:["1. Turn right and walk down", "2. Destination is the second room on your right"],
      Christ1:["1. Turn right and walk down", "2. Destination is the first room on your right"],
    },
    BMESmall: {
      Atrium: ["1. Walk forward and your destination should be up ahead."],
      Papin: ["1. Walk down the hallway until you reach hallway junction", "2. Turn left at hallway junction", "3. Destination is in front of you"],
      Meyer: ["1. Walk down the hallway until you reach hallway junction", "2. Turn left at hallway junction", "3. Walk forward into Papin Lab", "4. Turn right and destination is the room in front of you"],
      SharedLabSpace: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is first room on right"],
      Papin2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is second room on right"],
      Peirce2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is third room on the left"],
      Saucerman1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fourth room on left"],
      Saucerman2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fifth room on left"],
      Price1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is third room on right"],
      Price2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fourth room on right"],
      Zunder: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fifth room on right"],
      Barker: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is sixth room on right"],
      Peirce1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is seventh room on right"],
      Lazzara1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is eighth room on right"],
      Lazzara2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is ninth room on right"],
      Fallahi1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is sixth room on left"],
      Fallahi2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is seventh room on left"],
      Jane1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is eighth room on left"],
      Jane2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is ninth room on left"],
      Blemker: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is tenth room on left"],
      Epstein: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is eleventh room on left"]
    },
    Atrium: {
      BMESmall: ["1. Walk in direction opposite to hallway and destination should be in front of you"],
      Papin: ["1. Walk down the hallway until you reach hallway junction", "2. Turn left at hallway junction", "3. Destination is in front of you"],
      Meyer: ["1. Walk down the hallway until you reach hallway junction", "2. Turn left at hallway junction", "3. Walk forward into Papin Lab", "4. Turn right and destination is the room in front of you"],
      SharedLabSpace: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is first room on right"],
      Papin2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is second room on right"],
      Peirce2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is third room on the left"],
      Saucerman1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fourth room on left"],
      Saucerman2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fifth room on left"],
      Price1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is third room on right"],
      Price2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fourth room on right"],
      Zunder: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is fifth room on right"],
      Barker: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is sixth room on right"],
      Peirce1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is seventh room on right"],
      Lazzara1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is eighth room on right"],
      Lazzara2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is ninth room on right"],
      Fallahi1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is sixth room on left"],
      Fallahi2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is seventh room on left"],
      Jane1: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is eighth room on left"],
      Jane2: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is ninth room on left"],
      Blemker: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is tenth room on left"],
      Epstein: ["1. Walk down the hallway until you reach hallway junction", "2. Turn right at hallway junction", "3. Destination is eleventh room on left"]
    },
    SharedLabSpace:{
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Papin2: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Price1: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],  
    },
    Price2: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Zunder: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Barker: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Peirce1: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Lazzara1: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Lazarra2: {
      Atrium: ["1. Turn left and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"],
    },
    Peirce2: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Saucerman1: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Saucerman2: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Fallahi1: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Fallahi2: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Jane1: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Jane2: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Blemker: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Epstein: {
      Atrium: ["1. Turn right and make your way into hallway junction.", "2. Turn left at hallway junction and walk down the hallway and destination is in front of you"]
    },
    Papin: {
      Atrium: ["1. Walk forward until you reach hallway junction.", "2. Turn right and walk forward and your destination is in front of you"]
    },
    Meyer:{
      Atrium: ["1. Walk until you make your way into Papin and from Papin, walk out of door and make your way into hallway junction.", "2. Turn right and walk forward and your destination is in front of you"]
    }
  };

  function getDirections(start, end) {
    if (start === end) return "You are already here.";

    const custom = directionMap[start]?.[end];
    if (custom) return custom.join("<br>");

    return `Mapping not required`;
  }

  // Attach click handlers to all room buttons
  roomNames.forEach((roomId) => {
    const button = document.getElementById(roomId);
    if (!button) return;

    button.addEventListener("click", () => {
      if (!startRoom) {
        startRoom = roomId;
        directions.textContent = "Now Select an End Location";
      } else {
        const endRoom = roomId;
        const steps = getDirections(startRoom, endRoom);
        directions.innerHTML = steps;

        // Strip out the HTML and join into a single string to speak
        const spokenText = steps.replace(/<br>/g, ". ");
        speakText(spokenText);

        startRoom = null; // Reset after full path
      }
    });
  });
});


