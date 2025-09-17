// Smooth scroll for anchor links if needed
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tour filter on Explore page
const tourFilter = document.getElementById('tour-filter');
if (tourFilter) {
    tourFilter.addEventListener('change', () => {
        const filterValue = tourFilter.value.toLowerCase();
        const tours = document.querySelectorAll('.tour-card');

        tours.forEach(tour => {
            const categories = tour.getAttribute('data-category').toLowerCase();
            if (filterValue === 'all' || categories.includes(filterValue)) {
                tour.style.display = 'flex';
            } else {
                tour.style.display = 'none';
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    if (!form) return;

    // Auto-fill if saved
    const saved = JSON.parse(localStorage.getItem('gt_booking'));
    if (saved) {
        form['full-name'].value = saved.fullName;
        form.email.value = saved.email;
        form.phone.value = saved.phone;
        form.people.value = saved.people;
        form['tour-select'].value = saved.tour;
        form['start-date'].value = saved.startDate;
        form.message.value = saved.message;
    }

    // Save on submit
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = {
            fullName: form['full-name'].value,
            email: form.email.value,
            phone: form.phone.value,
            people: form.people.value,
            tour: form['tour-select'].value,
            startDate: form['start-date'].value,
            message: form.message.value
        };
        localStorage.setItem('gt_booking', JSON.stringify(data));
        alert('Booking saved! You can view it on the Bookings page.');
        form.reset();
    });
});