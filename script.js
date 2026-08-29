const studyForm = document.getElementById('studyForm');
const studySummary = document.getElementById('studySummary');
const bestIntake = document.getElementById('bestIntake');
const applicationWindow = document.getElementById('window');
const budgetRange = document.getElementById('budgetRange');
const visaStage = document.getElementById('visaStage');

const countryProfiles = {
  Germany: {
    intake: 'September',
    window: '9–12 months',
    budget: '₦12m–₦20m',
    visa: 'Admission + embassy interview',
    note: 'Germany remains one of the strongest options for STEM, engineering, and public university tuition value.'
  },
  Ireland: {
    intake: 'September',
    window: '8–10 months',
    budget: '₦15m–₦22m',
    visa: 'Offer acceptance + student visa',
    note: 'Ireland is a strong fit for business, data, and technology students with strong post-study work opportunities.'
  },
  Netherlands: {
    intake: 'September',
    window: '8–12 months',
    budget: '₦14m–₦25m',
    visa: 'University admission + visa prep',
    note: 'The Netherlands is ideal for international students focused on innovation, business, and design-led programmes.'
  },
  Poland: {
    intake: 'October',
    window: '6–9 months',
    budget: '₦7m–₦14m',
    visa: 'Early visa preparation recommended',
    note: 'Poland is a cost-conscious option that still offers quality education and a growing international student ecosystem.'
  },
  Italy: {
    intake: 'September',
    window: '7–10 months',
    budget: '₦8m–₦16m',
    visa: 'Document review + embassy booking',
    note: 'Italy is popular for design, architecture, and humanities students who want a culturally rich learning journey.'
  },
  Spain: {
    intake: 'September',
    window: '8–11 months',
    budget: '₦9m–₦18m',
    visa: 'Offer + financial proof review',
    note: 'Spain suits students seeking a balance of affordable study costs, language exposure, and strong student life.'
  }
};

function formatCurrency(amount) {
  const value = Number(amount || 0);
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value);
}

function getPlanSummary(country, level, budget, intake, programme) {
  const profile = countryProfiles[country] || countryProfiles.Germany;
  const budgetText = formatCurrency(budget);

  return `
    <p>
      Your best route is a <strong>${level.toLowerCase()}</strong> study path in <strong>${country}</strong>
      focused on <strong>${programme}</strong>. For this plan, the strongest intake is <strong>${profile.intake}</strong>.
      We recommend starting your application at least <strong>${profile.window}</strong> before the start date.
    </p>
    <p>
      With a working budget of <strong>${budgetText}</strong>, this route is realistic when paired with early document preparation,
      funding evidence, and a strong personal statement. <strong>${profile.note}</strong>
    </p>
  `;
}

function buildStudyPlan(event) {
  event.preventDefault();

  const country = document.getElementById('country').value;
  const level = document.getElementById('level').value;
  const budget = Number(document.getElementById('budget').value || 0);
  const intake = document.getElementById('intake').value;
  const programme = document.getElementById('programme').value || 'your chosen field';
  const profile = countryProfiles[country] || countryProfiles.Germany;

  const recommendedIntake = intake === 'Any' ? profile.intake : intake;
  const budgetText = formatCurrency(budget);

  studySummary.innerHTML = getPlanSummary(country, level, budget, recommendedIntake, programme);
  bestIntake.textContent = recommendedIntake;
  applicationWindow.textContent = profile.window;
  budgetRange.textContent = budgetText + '–' + profile.budget.replace('₦', '₦');
  visaStage.textContent = profile.visa;
}

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

const quickAnswers = {
  visa: 'The best time to start visa preparation is after you receive your admission letter. We recommend beginning at least 4–6 months before arrival.',
  scholarship: 'Scholarships are strongest when you apply early and submit a strong SOP, CV, and academic transcripts. We can shortlist suitable options based on your course.',
  deadline: 'Most EU intakes open between 6 and 12 months before the semester begins. September is usually the strongest intake for many programmes.',
  germany: 'Germany is ideal for engineering, tech, and public university options. It also has strong cost value for many students.',
  ireland: 'Ireland is popular for business, data, and technology programmes and offers strong post-study work potential.',
  default: 'We can help you with course selection, documentation, visa strategy, scholarships, and your dedicated agent support.'
};

function addMessage(text, sender = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat() {
  const value = chatInput.value.trim();
  if (!value) return;

  addMessage(value, 'user');
  chatInput.value = '';

  const lower = value.toLowerCase();
  let reply = quickAnswers.default;

  if (lower.includes('visa')) reply = quickAnswers.visa;
  else if (lower.includes('scholar')) reply = quickAnswers.scholarship;
  else if (lower.includes('deadline') || lower.includes('intake')) reply = quickAnswers.deadline;
  else if (lower.includes('germany')) reply = quickAnswers.germany;
  else if (lower.includes('ireland')) reply = quickAnswers.ireland;

  setTimeout(() => addMessage(reply, 'bot'), 300);
}

chatSend.addEventListener('click', handleChat);
chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleChat();
});

studyForm.addEventListener('submit', buildStudyPlan);

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener('DOMContentLoaded', () => {
  studyForm.requestSubmit();
});
