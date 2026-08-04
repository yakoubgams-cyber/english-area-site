/* =====================================
   ENGLISH AREA
   Premium School Website Engine
   Formspree Endpoint: https://formspree.io/f/xoeaanyj
===================================== */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeaanyj";

/* =========================
   DARK MODE
========================= */
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

/* =========================
   LANGUAGE SWITCH
========================= */
const languageBtn = document.getElementById("languageBtn");
let arabicMode = false;

languageBtn.addEventListener("click", () => {
    arabicMode = !arabicMode;

    if (arabicMode) {
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
        languageBtn.textContent = "EN";

        document.querySelectorAll('.stat-label').forEach(el => el.textContent = el.dataset.ar);
        document.querySelectorAll('.about-subtitle, .about-title, .about-description, .card-title, .card-text').forEach(el => {
            if (el.dataset.ar) el.textContent = el.dataset.ar;
        });
        document.querySelectorAll('.courses-subtitle, .courses-title, .courses-description, .course-badge, .course-name, .course-text, .course-price, .btn-course-join').forEach(el => {
            if (el.dataset.ar) el.textContent = el.dataset.ar;
        });
        document.querySelectorAll('.teachers-subtitle, .teachers-title, .teachers-description, .teacher-role, .teacher-bio').forEach(el => {
            if (el.dataset.ar) el.textContent = el.dataset.ar;
        });
        document.querySelectorAll('.gallery-subtitle, .gallery-title, .gallery-description, .gallery-card-title, .gallery-card-tag').forEach(el => {
            if (el.dataset.ar) el.textContent = el.dataset.ar;
        });
        document.querySelectorAll('.contact-section .form-title, .contact-section .form-subtitle-text, .contact-section .btn-submit, .contact-section .info-text h4, .contact-section .info-text p, .contact-section option').forEach(el => {
            if (el.dataset.ar) el.textContent = el.dataset.ar;
        });
        document.querySelectorAll('.contact-section input').forEach(input => {
            const placeholderVal = input.getAttribute('data-placeholder-ar');
            if (placeholderVal) input.setAttribute('placeholder', placeholderVal);
        });
    } else {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        languageBtn.textContent = "AR";

        document.querySelectorAll('.stat-label').forEach(el => el.textContent = el.dataset.en);
        document.querySelectorAll('.about-subtitle, .about-title, .about-description, .card-title, .card-text').forEach(el => {
            if (el.dataset.en) el.textContent = el.dataset.en;
        });
        document.querySelectorAll('.courses-subtitle, .courses-title, .courses-description, .course-badge, .course-name, .course-text, .course-price, .btn-course-join').forEach(el => {
            if (el.dataset.en) el.textContent = el.dataset.en;
        });
        document.querySelectorAll('.teachers-subtitle, .teachers-title, .teachers-description, .teacher-role, .teacher-bio').forEach(el => {
            if (el.dataset.en) el.textContent = el.dataset.en;
        });
        document.querySelectorAll('.gallery-subtitle, .gallery-title, .gallery-description, .gallery-card-title, .gallery-card-tag').forEach(el => {
            if (el.dataset.en) el.textContent = el.dataset.en;
        });
        document.querySelectorAll('.contact-section .form-title, .contact-section .form-subtitle-text, .contact-section .btn-submit, .contact-section .info-text h4, .contact-section .info-text p, .contact-section option').forEach(el => {
            if (el.dataset.en) el.textContent = el.dataset.en;
        });
        document.querySelectorAll('.contact-section input').forEach(input => {
            const placeholderVal = input.getAttribute('data-placeholder-en');
            if (placeholderVal) input.setAttribute('placeholder', placeholderVal);
        });
    }
});

/* =========================
   MOBILE MENU & ANIMATIONS
========================= */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    } else {
        header.style.boxShadow = "none";
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.add("hide");
    }
});

/* =========================
   STATISTICS COUNTER
========================= */
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 60;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment > target ? target : count + increment;
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

/* =====================================
   REGISTRATION FORM AJAX SUBMISSION
===================================== */
document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.querySelector("#registration form");

    if (regForm) {
        regForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const submitBtn = regForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            const formData = new FormData(regForm);

            fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Thank you! Your registration request has been sent successfully.");
                    regForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your registration. Please try again.");
                }
            })
            .catch(error => {
                alert("Oops! There was a network error. Please check your connection and try again.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit Application";
            });
        });
    }
});

/* =====================================
   40-QUESTION LEVEL TEST SYSTEM
===================================== */
const questions = [
    // Elementary / Beginner (A1)
    { q: "We ___ American.", opts: ["not", "not are", "aren't", "isn't"], answer: 2 },
    { q: "He ___ the newspaper every day.", opts: ["read", "reads", "doesn't reads", "don't reads"], answer: 1 },
    { q: "British people ___ tea with milk.", opts: ["to drink", "drink", "drinks", "are drink"], answer: 1 },
    { q: "___ you like Chinese food?", opts: ["Do", "Does", "Are", "Is"], answer: 0 },
    { q: "Could we ___ the bill, please?", opts: ["take", "want", "have", "ask"], answer: 2 },
    { q: "The people ___ in room 12.", opts: ["is", "am", "are", "be"], answer: 2 },
    { q: "I ___ to classical music.", opts: ["never to listen", "listen never", "never listen", "don't never listen"], answer: 2 },
    { q: "I can't see. Where are my ___?", opts: ["glasses", "stamps", "keys", "lipsticks"], answer: 0 },
    { q: "I'm Italian. ___ family are from Venice.", opts: ["Our", "My", "Her", "Me"], answer: 1 },
    { q: "Can I pay ___ credit card?", opts: ["by", "in", "on", "with"], answer: 0 },
    { q: "Tonight's dinner is ___ than last night's.", opts: ["more good", "gooder", "better", "more better"], answer: 2 },
    { q: "They didn't ___ the tickets.", opts: ["booking", "booked", "to book", "book"], answer: 3 },
    { q: "There ___ telephone in my hotel room.", opts: ["wasn't a", "weren't a", "weren't any", "wasn't some"], answer: 0 },
    { q: "He ___ jeans.", opts: ["doesn't usually wear", "isn't usually wearing", "wears usually", "doesn't wear usually"], answer: 0 },
    { q: "There isn't ___ pasta in the kitchen.", opts: ["some", "many", "a", "any"], answer: 3 },

    // Pre-Intermediate / Intermediate (A2 - B1)
    { q: "George is ___ than Nick.", opts: ["tall", "taller", "tallest"], answer: 1 },
    { q: "My friend ___ lives in Australia is a nurse.", opts: ["who", "which", "whose"], answer: 0 },
    { q: "I like walking in the park ___ hot days.", opts: ["at", "on", "in"], answer: 1 },
    { q: "If he ___ the lottery, he'll go on a round-the-world trip.", opts: ["won", "wins", "will win"], answer: 1 },
    { q: "The door was locked so I ___ go inside.", opts: ["will be able to", "wasn't able to", "can"], answer: 1 },
    { q: "She often ___ to music when she does the housework.", opts: ["listens", "listening", "to listen"], answer: 0 },
    { q: "We ___ at the sports centre every Wednesday afternoon.", opts: ["are usually meeting", "usually meet", "have usually met"], answer: 1 },
    { q: "That's the man ___ son is a famous actor.", opts: ["who", "where", "whose"], answer: 2 },
    { q: "Greg ___ down, opened the book and began to read.", opts: ["was sitting", "sat", "has been sitting"], answer: 1 },
    { q: "You have been to Spain, ___?", opts: ["have you", "you have", "haven't you"], answer: 2 },
    { q: "If you study hard, you ___ your exams this time.", opts: ["passes", "pass", "will pass"], answer: 2 },
    { q: "This is the park ___ I take my dog every afternoon.", opts: ["what", "where", "which"], answer: 1 },
    { q: "They ___ to Disneyland last week.", opts: ["went", "had gone", "will go"], answer: 0 },

    // Upper-Intermediate (B2)
    { q: "I ___ to be picking Tom up at the station but I've lost my keys.", opts: ["am supposed", "am requested", "am intended", "am obliged"], answer: 0 },
    { q: "By the age of 18, I ___ not to go to university.", opts: ["had decided", "decided", "have decided", "was deciding"], answer: 0 },
    { q: "The amount of organically grown food on sale has ___ enormously.", opts: ["raised", "lifted", "increased", "built"], answer: 2 },
    { q: "A woman has been ___ of hacking into the computer.", opts: ["accused", "suspended", "arrested", "suspected"], answer: 0 },
    { q: "You may borrow my laptop ___ you promise to look after it.", opts: ["unless", "in case", "as long as", "although"], answer: 2 },
    { q: "Pierre tends to put ___ dealing with problems.", opts: ["down", "off", "over", "away"], answer: 1 },
    { q: "If the taxi hadn't stopped for us, we ___ standing in the rain.", opts: ["were still", "would still be", "are still", "will still be"], answer: 1 },
    { q: "My mother’s Italian, so ___ the language has been easy for me.", opts: ["to learn", "learn", "having learned", "learning"], answer: 3 },
    { q: "___ I had the talent, I still wouldn’t want to be a movie star.", opts: ["In case", "Even if", "Provided that", "However much"], answer: 1 },
    { q: "The factory workers threatened ___ on strike.", opts: ["going", "to go", "that they go", "to have gone"], answer: 1 },
    { q: "There’s going to be a new department. They’ve asked me to ___ it up.", opts: ["take", "set", "put", "bring"], answer: 1 },
    { q: "Our students take their responsibilities very ___.", opts: ["considerably", "thoroughly", "seriously", "strongly"], answer: 2 }
];

let currentQ = 0;
let score = 0;
let selectedOpt = null;

const testModal = document.getElementById("testModal");
const closeTestBtn = document.getElementById("closeTestBtn");
const startTestBtn = document.getElementById("startTestBtn");
const testIntro = document.getElementById("testIntro");
const testContainer = document.getElementById("testContainer");
const testResult = document.getElementById("testResult");

const questionProgress = document.getElementById("questionProgress");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

document.querySelectorAll('a[href="#courses"]').forEach(btn => {
    btn.addEventListener("click", () => {
        testModal.classList.add("active");
    });
});

closeTestBtn.addEventListener("click", () => testModal.classList.remove("active"));

startTestBtn.addEventListener("click", () => {
    currentQ = 0;
    score = 0;
    testIntro.classList.remove("active");
    testContainer.classList.add("active");
    loadQuestion();
});

function loadQuestion() {
    selectedOpt = null;
    nextQuestionBtn.disabled = true;
    
    const qData = questions[currentQ];
    questionProgress.textContent = `Question ${currentQ + 1} / ${questions.length}`;
    progressBar.style.width = `${((currentQ + 1) / questions.length) * 100}%`;
    questionText.textContent = `${currentQ + 1}. ${qData.q}`;
    
    optionsContainer.innerHTML = "";
    qData.opts.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = `${String.fromCharCode(65 + idx)}) ${opt}`;
        btn.addEventListener("click", () => {
            document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOpt = idx;
            nextQuestionBtn.disabled = false;
        });
        optionsContainer.appendChild(btn);
    });
}

nextQuestionBtn.addEventListener("click", () => {
    if (selectedOpt === questions[currentQ].answer) {
        score++;
    }
    currentQ++;
    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    testContainer.classList.remove("active");
    testResult.classList.add("active");
    
    document.getElementById("scoreSummary").textContent = `You scored ${score} out of 40!`;
    
    let level = "";
    let desc = "";
    
    if (score <= 12) {
        level = "A1 - Beginner";
        desc = "You have a basic understanding of simple words and phrasing. Our 'English for Kids' or 'Teens Starter' program is perfect for building your foundations!";
    } else if (score <= 24) {
        level = "A2 - Elementary / Pre-Intermediate";
        desc = "You can communicate in routine tasks and understand common phrases. Our 'Teens Communicative' or 'General English A2' track will push you to the next stage.";
    } else if (score <= 34) {
        level = "B1 - Intermediate";
        desc = "You can express opinions and understand the main points of clear standard input. You are ready for our 'General English B1/B2' communicative classes.";
    } else {
        level = "B2 - Upper-Intermediate";
        desc = "You possess strong language fluency and control over complex structures! Check out our 'Business English' or advanced conversation modules.";
    }
    
    document.getElementById("levelBadge").textContent = level;
    document.getElementById("levelDescription").textContent = desc;

    // Automatic email dispatch on completion
    sendResultsToSchool({
        score: score,
        total: questions.length,
        level: level,
        timestamp: new Date().toLocaleString()
    });
}

function sendResultsToSchool(data) {
    fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            formType: "Placement Test Result",
            subject: `Placement Test Result: ${data.level}`,
            score: `${data.score} / ${data.total}`,
            level: data.level,
            completedAt: data.timestamp
        })
    })
    .then(res => {
        if (res.ok) {
            console.log("Placement test result successfully sent to school inbox.");
        }
    })
    .catch(err => console.error("Error sending test result:", err));
}

document.getElementById("retakeTestBtn").addEventListener("click", () => {
    testResult.classList.remove("active");
    testIntro.classList.add("active");
});
