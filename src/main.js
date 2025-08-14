document.addEventListener('DOMContentLoaded', function() {
    const progressGrid = document.getElementById('progressGrid');
    const daysPassedElement = document.getElementById('daysPassed');
    const daysRemainingElement = document.getElementById('daysRemaining');
    const percentageElement = document.getElementById('percentage');
    const currentDateElement = document.getElementById('currentDate');

    // Create 52 boxes for the year progress
    for (let i = 0; i < 52; i++) {
        const box = document.createElement('div');
        box.className = 'progress-box';
        box.dataset.week = i + 1;
        progressGrid.appendChild(box);
    }

    function updateProgress() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31);

        // Calculate days passed and remaining
        const daysPassed = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
        const totalDays = Math.floor((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
        const daysRemaining = totalDays - daysPassed;
        const percentage = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));

        // Update stats
        daysPassedElement.textContent = daysPassed.toLocaleString();
        daysRemainingElement.textContent = daysRemaining.toLocaleString();
        percentageElement.textContent = `${percentage.toFixed(1)}%`;

        // Update current date display
        currentDateElement.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Calculate week information
        const firstDayOfYear = startOfYear.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const daysSinceFirstSaturday = daysPassed + firstDayOfYear;
        const currentWeek = Math.floor(daysSinceFirstSaturday / 7) + 1;
        const daysInCurrentWeek = daysSinceFirstSaturday % 7 + 1;
        const fillPercentage = (daysInCurrentWeek / 7) * 100;

        // Update progress boxes
        const boxes = document.querySelectorAll('.progress-box');
        boxes.forEach((box, index) => {
            box.classList.remove('filled', 'partial', 'today');
            box.style.removeProperty('--fill-height');

            if (index < currentWeek - 1) {
                box.classList.add('filled');
            } else if (index === currentWeek - 1) {
                box.classList.add('partial', 'today');
                box.style.setProperty('--fill-height', `${fillPercentage}%`);
            }
        });
    }

    // Initial update
    updateProgress();

    // Update every minute
    setInterval(updateProgress, 60000);
});
