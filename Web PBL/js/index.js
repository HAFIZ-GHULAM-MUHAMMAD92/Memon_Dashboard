const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    themeToggleButton.classList.toggle('dark-theme');
    themeToggleButton.classList.toggle('light-theme');
});

// Profile Form Submission Handling
const profileForm = document.getElementById('profile-form');
const profileImageInput = document.getElementById('profile-image');

profileImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgPreview = document.createElement('img');
            imgPreview.src = e.target.result;
            imgPreview.alt = "Profile Preview";
            imgPreview.style.maxWidth = "150px";
            profileImageInput.parentNode.appendChild(imgPreview);
            profileImageInput.disabled = true; // lock after upload
        };
        reader.readAsDataURL(file);
    }
});

profileForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const profileData = {
        name: document.getElementById('name').value,
        cnic: document.getElementById('cnic').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        skills: document.getElementById('skills').value,
        expertise: document.getElementById('expertise').value,
    };

    console.log("Profile Saved:", profileData);

    alert("Profile saved successfully!");
    profileForm.querySelectorAll('input, select, textarea, button').forEach(elem => {
        elem.disabled = true;
    });

    renderExpertiseChart(profileData.expertise);
});

// Expertise Chart (bar chart)
function renderExpertiseChart(expertiseText) {
    const ctx = document.getElementById('expertiseChart').getContext('2d');

    const keywords = ["Freelancing", "Research", "Design", "Development"];
    const data = keywords.map(keyword => {
        return {
            label: keyword,
            value: Math.floor(Math.random() * 100) + 1 // simulate percentage
        };
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.label),
            datasets: [{
                label: 'Expertise Level (%)',
                data: data.map(d => d.value),
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

