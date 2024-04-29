function searchModules() {
    var input, filter, links, linkText, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    links = document.getElementsByTagName("a");
  
    for (i = 0; i < links.length; i++) {
      linkText = links[i].textContent || links[i].innerText;
      if (linkText.toUpperCase().indexOf(filter) > -1) {
        links[i].style.display = "";
      } else {
        links[i].style.display = "none";
      }
    }
  }
  const notificationBtn = document.querySelector('.notification-btn');
  const notificationCount = document.querySelector('.notification-count');
  const notificationList = document.querySelector('.notification-list');
  const noNotificationsMessage = document.querySelector('.no-notifications');
  
  // Sample notifications data
  const notifications = [
    
  ];
  
  // Function to update notification count
  function updateNotificationCount() {
    notificationCount.textContent = notifications.length;
  }
  
  // Function to display notifications
  function displayNotifications() {
    if (notifications.length === 0) {
      noNotificationsMessage.style.display = 'block';
    } else {
      noNotificationsMessage.style.display = 'none';
      notificationList.innerHTML = '';
      notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.textContent = notification;
        notificationList.appendChild(notificationItem);
      });
    }
  }
  
  // Update notification count and display notifications on page load
  updateNotificationCount();
  displayNotifications();
  
  // Add click event listener to the notification button
  notificationBtn.addEventListener('click', () => {
    const dropdown = document.querySelector('.notification-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
// calender
const prevDateButton = document.getElementById('prevDate');
const nextDateButton = document.getElementById('nextDate');
const dateDisplay = document.getElementById('dateDisplay');
const calendarGraph = document.querySelector('.-calendar-graph');

let currentDate = new Date();

function updateDateDisplay() {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
}

function createTimeSlots() {
    calendarGraph.innerHTML = '';

    const startTime = 8; // 8 AM
    const endTime = 17; // 5 PM
    const allottedTimes = [9, 10, 11, 13, 14, 15]; // Example allotted times

    for (let hour = startTime; hour < endTime; hour++) {
        const amPm = hour < 12 ? 'AM' : 'PM';
        const hourDisplay = hour % 12 === 0 ? 12 : hour % 12;

        const timeSlot = document.createElement('div');
        timeSlot.classList.add('-calendar-time-slot');
        timeSlot.textContent = `${hourDisplay} ${amPm}`;
        calendarGraph.appendChild(timeSlot);

        const attendanceSlot = document.createElement('div');
        attendanceSlot.classList.add('-calendar-attendance-slot');

        if (allottedTimes.includes(hour)) {
            attendanceSlot.addEventListener('click', () => {
                attendanceSlot.classList.toggle('attended');
            });
        } else {
            attendanceSlot.classList.add('not-allotted');
        }

        calendarGraph.appendChild(attendanceSlot);
    }
}

prevDateButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDateDisplay();
    createTimeSlots();
});

nextDateButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDateDisplay();
    createTimeSlots();
});

updateDateDisplay();
createTimeSlots();
// slider
const sliderContainer = document.getElementById('sliderContainer');
const slider = document.getElementById('slider');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

const viewSubjectsButtons = document.querySelectorAll('.view-subjects');

let currentIndex = 0;
const subjectBoxes = [
    {
        subjectCode: 'CS601',
        subjectName: 'Machine Learning',
        type: 'Theory',
        presentSession: 15,
        totalSessions: 30,
        percentage: 50
    },
    {
        subjectCode: 'CS602',
        subjectName: 'Computer Networking',
        type: 'Theory',
        presentSession: 20,
        totalSessions: 40,
        percentage: 75
    },
    {
      subjectCode: 'CS603',
      subjectName: 'Compiler Design',
      type: 'Theory',
      presentSession: 20,
      totalSessions: 40,
      percentage: 75
  },
  {
    subjectCode: 'CS604',
    subjectName: 'Project Management',
    type: 'Theory',
    presentSession: 20,
    totalSessions: 40,
    percentage: 75
},
{
  subjectCode: 'CS602',
  subjectName: 'Computer networking',
  type: 'practical',
  presentSession: 20,
  totalSessions: 40,
  percentage: 75
},
    
];

function createSubjectBox(subject) {
    const subjectBox = document.createElement('div');
    subjectBox.classList.add('subject-box');

    const heading = document.createElement('h3');
    heading.textContent = `${subject.subjectCode} - ${subject.subjectName}`;
    subjectBox.appendChild(heading);

    const type = document.createElement('p');
    type.textContent = subject.type;
    subjectBox.appendChild(type);

    const presentSession = document.createElement('p');
    presentSession.textContent = `Present Session: ${subject.presentSession}/${subject.totalSessions}`;
    subjectBox.appendChild(presentSession);

    const percentage = document.createElement('p');
    percentage.textContent = `Percentage: ${subject.percentage}%`;
    subjectBox.appendChild(percentage);

    const viewSessionButton = document.createElement('button');
    viewSessionButton.textContent = 'View Sessions';
    subjectBox.appendChild(viewSessionButton);

    return subjectBox;
}

function renderSubjectBoxes() {
    slider.innerHTML = '';

    subjectBoxes.forEach((subject) => {
        const subjectBox = createSubjectBox(subject);
        slider.appendChild(subjectBox);
    });

    updateSliderPosition();
}

function openSlider() {
    sliderContainer.style.display = 'flex';
    renderSubjectBoxes();
}

function closeSlider() {
    sliderContainer.style.display = 'none';
}

function updateSliderPosition() {
    const subjectBoxes = slider.querySelectorAll('.subject-box');
    const sliderWidth = slider.offsetWidth;
    const boxWidth = subjectBoxes[0].offsetWidth;
    const maxTranslate = (subjectBoxes.length - 1) * (boxWidth + 32); // 32 is the margin between boxes
    const translateValue = currentIndex * (boxWidth + 32);

    slider.style.transform = `translateX(-${translateValue}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === subjectBoxes.length - 1;
}

function goToPrevSubject() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    }
}

function goToNextSubject() {
    if (currentIndex < subjectBoxes.length - 1) {
        currentIndex++;
        updateSliderPosition();
    }
}

prevButton.addEventListener('click', goToPrevSubject);
nextButton.addEventListener('click', goToNextSubject);

viewSubjectsButtons.forEach((button) => {
    button.addEventListener('click', openSlider);
});

window.addEventListener('click', (event) => {
    if (event.target === sliderContainer) {
        closeSlider();
    }
});