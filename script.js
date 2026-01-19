document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reservationForm');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  dateInput.min = todayString;
  
  timeInput.placeholder = '--:-- --';
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const reservationData = {
      restaurant: formData.get('restaurant'),
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      guests: formData.get('guests'),
      date: formData.get('date'),
      time: formData.get('time'),
      specialRequests: formData.get('specialRequests')
    };
    
    const requiredFields = ['restaurant', 'fullName', 'email', 'phone', 'guests', 'date', 'time'];
    const missingFields = requiredFields.filter(field => !reservationData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reservationData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = reservationData.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      alert('Please enter a valid phone number.');
      return;
    }
    
    const selectedDate = new Date(reservationData.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < currentDate) {
      alert('Please select a future date.');
      return;
    }
    
    console.log('Reservation Data:', reservationData);
    
    alert(`Thank you, ${reservationData.fullName}! Your reservation request has been submitted. We will contact you at ${reservationData.email} to confirm your booking.`);
    
    form.reset();
  });
  
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 1) {
      if (value.length <= 3) {
        value = `+1 (${value}`;
      } else if (value.length <= 6) {
        value = `+1 (${value.slice(1, 4)}) ${value.slice(4)}`;
      } else {
        value = `+1 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 11)}`;
      }
    }
    
    e.target.value = value;
  });
  
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});
