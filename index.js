// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Sample Bus Data
const buses = [
    {
        id: 1,
        name: "Swift Deluxe",
        type: "AC Sleeper",
        departure: "08:00 AM",
        arrival: "02:00 PM",
        from: "New York",
        to: "Boston",
        amenities: ["wifi", "charging", "blanket", "water"],
        price: 45,
        seats: 36,
        bookedSeats: [4, 5, 12, 13, 20, 21]
    },
    {
        id: 2,
        name: "City Express",
        type: "AC Semi-Sleeper",
        departure: "10:30 AM",
        arrival: "05:30 PM",
        from: "New York",
        to: "Washington DC",
        amenities: ["wifi", "charging", "water"],
        price: 35,
        seats: 40,
        bookedSeats: [1, 2, 15, 16, 25, 26, 35, 36]
    },
    {
        id: 3,
        name: "Premium Travels",
        type: "Non-AC Seater",
        departure: "07:00 AM",
        arrival: "12:00 PM",
        from: "New York",
        to: "Philadelphia",
        amenities: ["charging", "water"],
        price: 25,
        seats: 42,
        bookedSeats: [3, 4, 10, 11, 20, 21, 30, 31, 40, 41]
    },
    {
        id: 4,
        name: "Luxury Line",
        type: "AC Sleeper",
        departure: "11:00 PM",
        arrival: "07:00 AM",
        from: "New York",
        to: "Chicago",
        amenities: ["wifi", "charging", "blanket", "water", "snacks"],
        price: 85,
        seats: 32,
        bookedSeats: [5, 6, 12, 13, 20, 21, 28, 29]
    }
];

// Search Form Submission
const searchForm = document.getElementById('searchForm');
const busList = document.getElementById('busList');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;

    // In a real app, you would fetch buses based on search criteria
    // Here we'll just display all sample buses
    displayBuses(buses);
});

// Display Buses
function displayBuses(buses) {
    busList.innerHTML = '';
    
    buses.forEach(bus => {
        const busCard = document.createElement('div');
        busCard.className = 'bus-card';
        busCard.innerHTML = `
            <div class="bus-card-header">
                <h3 class="bus-name">${bus.name}</h3>
                <span class="bus-type">${bus.type}</span>
            </div>
            <div class="bus-card-body">
                <div class="bus-info">
                    <div class="bus-info-item">
                        <i class="fas fa-wifi ${bus.amenities.includes('wifi') ? '' : 'disabled'}"></i>
                        <span>WiFi</span>
                    </div>
                    <div class="bus-info-item">
                        <i class="fas fa-bolt ${bus.amenities.includes('charging') ? '' : 'disabled'}"></i>
                        <span>Charging</span>
                    </div>
                    <div class="bus-info-item">
                        <i class="fas fa-utensils ${bus.amenities.includes('snacks') ? '' : 'disabled'}"></i>
                        <span>Snacks</span>
                    </div>
                    <div class="bus-info-item">
                        <i class="fas fa-blanket ${bus.amenities.includes('blanket') ? '' : 'disabled'}"></i>
                        <span>Blanket</span>
                    </div>
                </div>
                <div class="bus-timings">
                    <div class="timing">
                        <div class="timing-time">${bus.departure}</div>
                        <div class="timing-place">${bus.from}</div>
                    </div>
                    <div class="bus-separator">
                        <i class="fas fa-circle"></i>
                        <i class="fas fa-ellipsis-v"></i>
                        <i class="fas fa-circle"></i>
                    </div>
                    <div class="timing">
                        <div class="timing-time">${bus.arrival}</div>
                        <div class="timing-place">${bus.to}</div>
                    </div>
                </div>
                <div class="bus-price">
                    <div>
                        <span class="price-amount">$${bus.price}</span>
                        <span>per seat</span>
                    </div>
                    <button class="book-btn" data-id="${bus.id}">Book Now</button>
                </div>
            </div>
        `;
        busList.appendChild(busCard);
    });

    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const busId = parseInt(e.target.getAttribute('data-id'));
            const bus = buses.find(b => b.id === busId);
            openBookingModal(bus);
        });
    });
}

// Booking Modal
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const cancelBooking = document.getElementById('cancelBooking');
const modalBusName = document.getElementById('modalBusName');
const modalBusTiming = document.getElementById('modalBusTiming');
const seatSelection = document.getElementById('seatSelection');
const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
const totalPrice = document.getElementById('totalPrice');
const confirmBooking = document.getElementById('confirmBooking');

let selectedBus = null;
let selectedSeats = [];

function openBookingModal(bus) {
    selectedBus = bus;
    selectedSeats = [];
    
    modalBusName.textContent = `${bus.name} (${bus.type})`;
    modalBusTiming.textContent = `${bus.from} to ${bus.to} | ${bus.departure} - ${bus.arrival}`;
    
    // Generate seats
    seatSelection.innerHTML = '';
    for (let i = 1; i <= bus.seats; i++) {
        const seat = document.createElement('div');
        seat.className = `seat ${bus.bookedSeats.includes(i) ? 'booked' : 'available'}`;
        seat.textContent = i;
        seat.setAttribute('data-seat', i);
        
        if (!bus.bookedSeats.includes(i)) {
            seat.addEventListener('click', toggleSeatSelection);
        }
        
        seatSelection.appendChild(seat);
    }
    
    updateSelectionDisplay();
    bookingModal.style.display = 'flex';
}

function toggleSeatSelection(e) {
    const seatNum = parseInt(e.target.getAttribute('data-seat'));
    const index = selectedSeats.indexOf(seatNum);
    
    if (index === -1) {
        selectedSeats.push(seatNum);
        e.target.classList.add('selected');
    } else {
        selectedSeats.splice(index, 1);
        e.target.classList.remove('selected');
    }
    
    updateSelectionDisplay();
}

function updateSelectionDisplay() {
    if (selectedSeats.length === 0) {
        selectedSeatsDisplay.textContent = 'None';
    } else {
        selectedSeatsDisplay.textContent = selectedSeats.join(', ');
    }
    
    totalPrice.textContent = selectedSeats.length * selectedBus.price;
}

// Close modal
function closeBookingModal() {
    bookingModal.style.display = 'none';
}

closeModal.addEventListener('click', closeBookingModal);
cancelBooking.addEventListener('click', closeBookingModal);

// Confirm booking
confirmBooking.addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
    }
    
    alert(`Booking confirmed for seat(s) ${selectedSeats.join(', ')} on ${selectedBus.name}. Total: $${selectedSeats.length * selectedBus.price}`);
    closeBookingModal();
    
    // In a real app, you would send this data to your backend
    console.log('Booking details:', {
        bus: selectedBus,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * selectedBus.price
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// Initialize with some buses
displayBuses(buses);
