const form = document.getElementById('travelForm');
const tripSummary = document.getElementById('tripSummary');
const flightCost = document.getElementById('flightCost');
const stayCost = document.getElementById('stayCost');
const dailyBudget = document.getElementById('dailyBudget');
const visaReadiness = document.getElementById('visaReadiness');
const checklistList = document.getElementById('checklistList');
const itinerary = document.getElementById('itinerary');

const destinationMeta = {
  Paris: { flight: 1_600_000, hotelPerNight: 80_000, dailyFood: 45_000, bestFor: 'culture, shopping, romance' },
  Berlin: { flight: 1_450_000, hotelPerNight: 70_000, dailyFood: 40_000, bestFor: 'business, nightlife, museums' },
  Amsterdam: { flight: 1_550_000, hotelPerNight: 85_000, dailyFood: 50_000, bestFor: 'bikes, canals, city breaks' },
  Madrid: { flight: 1_400_000, hotelPerNight: 65_000, dailyFood: 38_000, bestFor: 'food, heritage, affordable luxury' },
  Lisbon: { flight: 1_300_000, hotelPerNight: 60_000, dailyFood: 35_000, bestFor: 'coastal view, food, day trips' },
  Rome: { flight: 1_500_000, hotelPerNight: 75_000, dailyFood: 42_000, bestFor: 'history, food, iconic landmarks' },
};

const visaMessages = {
  na: 'Start with documents early: passport, proof of funds, flight plan, and accommodation details.',
  planning: 'You are in a good planning phase. Gather supporting documents and book travel insurance soon.',
  approved: 'Your visa is approved; confirm your flight and travel insurance, then lock the final plan.',
  pending: 'Keep all documents ready and monitor your embassy updates while preparing for travel timing.'
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

function buildChecklist(destination, purpose, visaStatus) {
  const common = [
    'Valid passport with at least 6 months validity',
    'Completed Schengen visa application form',
    'Travel insurance covering at least €30,000',
    'Proof of accommodation and return flight booking',
    'Bank statements showing steady funds for the trip',
    'Travel itinerary aligned with your purpose: ' + purpose
  ];

  if (visaStatus === 'approved' || visaStatus === 'pending') {
    common.push('Appointment confirmation and visa tracking updates');
  }

  if (purpose === 'Study') {
    common.push('Admission letter and university enrollment evidence');
  }

  if (purpose === 'Business') {
    common.push('Invitation letter and business meeting schedule');
  }

  if (purpose === 'Family visit') {
    common.push('Host invitation letter and proof of relationship');
  }

  const destinationSpecific = [
    'Check the destination embassy or visa center processing timelines for ' + destination,
    'Prepare a realistic daily budget and a conservative emergency fund'
  ];

  return [...common, ...destinationSpecific];
}

function getItinerary(destination, month, purpose) {
  const base = [
    {
      day: 'Day 1',
      title: 'Document & visa check',
      text: `Finalize your passport, visa paperwork, travel insurance, and accommodation booking for ${destination}.`
    },
    {
      day: 'Day 2',
      title: 'Flight & funds',
      text: `Book your outbound flight from Nigeria, confirm exchange rates, and keep funds available for the trip.`
    },
    {
      day: 'Day 3',
      title: 'Arrival plan',
      text: `Plan your arrival in ${destination} around ${month.toLowerCase()} conditions and keep essential local contacts ready.`
    }
  ];

  if (purpose === 'Tourism') {
    base.push({
      day: 'Day 4',
      title: 'Explore city highlights',
      text: `Reserve a city tour, local food experience, and one major sightseeing activity.`
    });
  }

  if (purpose === 'Business') {
    base.push({
      day: 'Day 4',
      title: 'Business meeting block',
      text: `Schedule your meetings, transport, and a short networking session after the main business schedule.`
    });
  }

  if (purpose === 'Study') {
    base.push({
      day: 'Day 4',
      title: 'Academic setup',
      text: `Confirm orientation dates, student housing, and your first campus contact details.`
    });
  }

  if (purpose === 'Family visit') {
    base.push({
      day: 'Day 4',
      title: 'Family logistics',
      text: `Coordinate airport pickup, local transport, and a relaxed family itinerary for your first days.`
    });
  }

  return base;
}

function buildTripPlan(event) {
  event.preventDefault();

  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const month = document.getElementById('month').value;
  const purpose = document.getElementById('purpose').value;
  const budget = Number(document.getElementById('budget').value || 0);
  const travelers = Number(document.getElementById('travelers').value || 1);
  const visaStatus = document.getElementById('visaStatus').value;

  const destinationInfo = destinationMeta[destination];
  const flight = destinationInfo.flight * travelers;
  const hotelNights = 7;
  const hotel = destinationInfo.hotelPerNight * hotelNights * travelers;
  const food = destinationInfo.dailyFood * 7 * travelers;
  const insurance = 140_000 * travelers;
  const total = flight + hotel + food + insurance;
  const daily = Math.round(total / 7);

  const visaText = visaMessages[visaStatus] || visaMessages.na;

  tripSummary.innerHTML = `
    <p>
      Based on your plan from <strong>${origin}</strong> to <strong>${destination}</strong> in <strong>${month}</strong>,
      a <strong>${purpose.toLowerCase()}</strong> trip is <strong>${budget >= total ? 'within budget' : 'tight but achievable'}</strong>.
      This route is ideal for travelers looking for <strong>${destinationInfo.bestFor}</strong>.
    </p>
    <p>${visaText}</p>
  `;

  flightCost.textContent = formatCurrency(flight);
  stayCost.textContent = formatCurrency(hotel + food + insurance);
  dailyBudget.textContent = formatCurrency(daily);
  visaReadiness.textContent = budget >= total ? 'Ready' : 'Needs review';

  checklistList.innerHTML = buildChecklist(destination, purpose, visaStatus)
    .map((item) => `<li>${item}</li>`)
    .join('');

  itinerary.innerHTML = getItinerary(destination, month, purpose)
    .map(
      (item) => `
        <div class="itinerary-item">
          <div class="day-pill">${item.day.split(' ')[1]}</div>
          <div>
            <h4>${item.title}</h4>
            <p>${item.text}</p>
          </div>
        </div>
      `
    )
    .join('');
}

form.addEventListener('submit', buildTripPlan);

window.addEventListener('DOMContentLoaded', () => {
  form.requestSubmit();
});
