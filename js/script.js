const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanTenureInput = document.getElementById("loanTenure");

const loanAmountDisplay = document.getElementById("loanAmountDisplay");
const interestRateDisplay = document.getElementById("interestRateDisplay");
const loanTenureDisplay = document.getElementById("loanTenureDisplay");
const emiOutput = document.getElementById("emiOutput");

const principalAmount = document.getElementById("principalAmount");
const interestAmount = document.getElementById("interestAmount");
const totalPayable = document.getElementById("totalPayable");

const ctx = document.getElementById("emiChart").getContext("2d");
let chart;

function calculateEMI() {
  const P = parseFloat(loanAmountInput.value);
  const R = parseFloat(interestRateInput.value) / 12 / 100;
  const N = parseFloat(loanTenureInput.value) * 12;

  // EMI Calculation
  const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  const total = emi * N;
  const interest = total - P;

  // Display values
  emiOutput.textContent = emi.toFixed(0).toLocaleString("en-IN");
  loanAmountDisplay.textContent = P.toLocaleString("en-IN");
  interestRateDisplay.textContent = interestRateInput.value;
  loanTenureDisplay.textContent = loanTenureInput.value;
  // New info display
  principalAmount.textContent = Math.round(P).toLocaleString("en-IN");
  interestAmount.textContent = Math.round(interest).toLocaleString("en-IN");
  totalPayable.textContent = Math.round(total).toLocaleString("en-IN");

  // New information to show

  updateChart(P, interest);
}

function updateChart(principal, interest) {
  // Check if chart already exists, if yes, update it instead of destroying it
  if (chart) {
    chart.data.datasets[0].data = [principal, interest];
    chart.update(); // This will update the chart without destroying it
  } else {
    // If no chart exists, create a new one
    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            data: [principal, interest],
            backgroundColor: ["#ecc94b", "#9b2c2c"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            enabled: false,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                return `${label}: ₹${value.toLocaleString("en-IN")}`;
              },
            },
          },
        },
        hover: {
          mode: null,
        },
        interaction: {
          mode: null, // Disable all interactions
        },
      },
    });
  }
}

loanAmountInput.addEventListener("input", calculateEMI);
interestRateInput.addEventListener("input", calculateEMI);
loanTenureInput.addEventListener("input", calculateEMI);

calculateEMI(); // Initial call to populate on load

// FAQ toggle
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const allAnswers = document.querySelectorAll(".faq-answer");
    const allButtons = document.querySelectorAll(
      ".faq-question span:last-child"
    );

    // Close all answers except the one clicked
    allAnswers.forEach((a) => {
      if (a !== answer) {
        a.classList.add("hidden");
      }
    });

    // Reset all icons
    allButtons.forEach((icon) => {
      icon.textContent = "+";
    });

    // Toggle the clicked one
    if (answer.classList.contains("hidden")) {
      answer.classList.remove("hidden");
      button.querySelector("span:last-child").textContent = "-";
    } else {
      answer.classList.add("hidden");
      button.querySelector("span:last-child").textContent = "+";
    }
  });
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 500, // 0.5 seconds
    disableOnInteraction: false,
  },
  speed: 800, // smooth transition
  breakpoints: {
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  },
});

//backtotop

const backToTopBtn = document.getElementById("backToTopBtn");
const footer = document.querySelector("footer");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Show/hide button
  if (scrollY > 400) {
    backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
    backToTopBtn.classList.add("opacity-100");
  } else {
    backToTopBtn.classList.add("opacity-0", "pointer-events-none");
    backToTopBtn.classList.remove("opacity-100");
  }

  // Push button up when near footer
  const footerRect = footer.getBoundingClientRect();
  const isFooterVisible = footerRect.top < window.innerHeight;

  if (isFooterVisible) {
    backToTopBtn.style.bottom = "100px"; // lift above icons
  } else {
    backToTopBtn.style.bottom = "24px"; // default (6 = 1.5rem = 24px)
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
