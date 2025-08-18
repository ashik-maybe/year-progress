document.addEventListener('DOMContentLoaded', function() {
    const progressGrid = document.getElementById('progressGrid');
    const daysPassedElement = document.getElementById('daysPassed');
    const daysRemainingElement = document.getElementById('daysRemaining');
    const percentageElement = document.getElementById('percentage');
    const currentDateElement = document.getElementById('currentDate');

    function getWeeksInYear(year) {
        // A year has 53 weeks if it starts on Thursday, or Wednesday in a leap year
        const jan1 = new Date(year, 0, 1);
        const dec31 = new Date(year, 11, 31);
        const jan1Day = jan1.getDay();
        const dec31Day = dec31.getDay();

        // Year has 53 weeks if:
        // - Jan 1 is Thursday (4), or
        // - Jan 1 is Wednesday (3) and it's a leap year
        if (jan1Day === 4 || (jan1Day === 3 && isLeapYear(year))) {
            return 53;
        }
        return 52;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function createProgressBoxes() {
        const currentYear = new Date().getFullYear();
        const weeksInYear = getWeeksInYear(currentYear);

        // Clear existing boxes
        progressGrid.innerHTML = '';

        // Create boxes for the current year
        for (let i = 0; i < weeksInYear; i++) {
            const box = document.createElement('div');
            box.className = 'progress-box';
            box.dataset.week = i + 1;
            progressGrid.appendChild(box);
        }
    }

    function updateProgress() {
        // Normalize dates to midnight to avoid timezone issues
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const startOfYear = new Date(now.getFullYear(), 0, 1);
        startOfYear.setHours(0, 0, 0, 0);

        const endOfYear = new Date(now.getFullYear(), 11, 31);
        endOfYear.setHours(0, 0, 0, 0);

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

        // Calculate correct week information (week 1 starts on Jan 1)
        const currentWeek = Math.floor(daysPassed / 7) + 1;
        const dayInWeek = daysPassed % 7; // 0 = first day of week, 6 = last day
        const fillPercentage = ((dayInWeek + 1) / 7) * 100;

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

    // Create boxes and initial update
    createProgressBoxes();
    updateProgress();

    // Update every minute
    setInterval(updateProgress, 60000);
});
