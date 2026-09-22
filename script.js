/* ==========================================
   LAPUGO TRAVEL AGENCY
   JAVASCRIPT
========================================== */


/* ==========================================
   VARIABLES
========================================== */

let packages = [];

let currentCategory = "All";

let selectedPackage = null;


/* ==========================================
   LOAD JSON
========================================== */

async function loadPackages() {

    try {

        const response = await fetch("packages.json");

        packages = await response.json();

        displayPackages(packages);

        populateBookingPackages();

    }

    catch (error) {

        console.error("Unable to load packages.json", error);

    }

}


/* ==========================================
   DISPLAY PACKAGES
========================================== */

function displayPackages(data) {

    const container =
        document.getElementById("packageContainer");

    container.innerHTML = "";


    if (data.length === 0) {

        container.innerHTML = `

            <div class="col-span-full
                        text-center py-16">

                <h3 class="font-jakarta
                           font-bold text-xl">

                    No packages found.

                </h3>

                <p class="text-slate-500 mt-2">

                    Try another destination
                    or category.

                </p>

            </div>

        `;

        return;

    }


    data.forEach(pkg => {

        const card = document.createElement("article");

        card.className = "package-card";


        card.innerHTML = `

            <div class="package-image-wrapper">

                <img
                    src="${pkg.image}"
                    alt="${pkg.title}"
                    class="package-image">

                <span class="package-badge">

                    ${pkg.badge}

                </span>

            </div>


            <div class="package-body">

                <div class="flex justify-between
                            items-center">

                    <span class="package-location">

                        📍 ${pkg.location}

                    </span>

                    <span class="text-xs
                                 text-amber-500
                                 font-bold">

                        ★ ${pkg.rating}

                    </span>

                </div>


                <h3 class="package-title">

                    ${pkg.title}

                </h3>


                <p class="package-description">

                    ${pkg.description}

                </p>


                <div class="flex justify-between
                            items-end mt-5">

                    <div>

                        <p class="uppercase
                                  tracking-widest
                                  text-[9px]
                                  text-slate-400">

                            From

                        </p>

                        <strong
                            class="font-jakarta
                                   text-xl">

                            ₱${pkg.price.toLocaleString()}

                        </strong>

                        <span class="text-xs
                                     text-slate-400">

                            / person

                        </span>

                    </div>


                    <button
                        onclick="showPackage('${pkg.id}')"
                        class="border border-pink-200
                               text-pink-500
                               px-4 py-2
                               rounded-xl
                               text-xs font-bold
                               hover:bg-pink-50">

                        Details

                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });


    lucide.createIcons();

}


/* ==========================================
   FILTER CATEGORY
========================================== */

function setCategory(category, button) {

    currentCategory = category;


    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    filterPackages();

}


/* ==========================================
   SEARCH + FILTER
========================================== */

function filterPackages() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const filtered =
        packages.filter(pkg => {

            const matchesCategory =
                currentCategory === "All" ||
                pkg.category === currentCategory;


            const matchesSearch =
                pkg.title.toLowerCase().includes(search) ||

                pkg.location.toLowerCase().includes(search) ||

                pkg.category.toLowerCase().includes(search);


            return matchesCategory &&
                   matchesSearch;

        });


    displayPackages(filtered);

}


/* ==========================================
   PACKAGE DETAILS
========================================== */

function showPackage(id) {

    const pkg =
        packages.find(item => item.id === id);


    if (!pkg) return;


    selectedPackage = pkg;


    document.getElementById("modalImage").src =
        pkg.image;


    document.getElementById("modalCategory")
        .textContent =
        pkg.category.toUpperCase();


    document.getElementById("modalTitle")
        .textContent =
        pkg.title;


    document.getElementById("modalDescription")
        .textContent =
        pkg.description;


    document.getElementById("modalDuration")
        .textContent =
        "🕒 " + pkg.duration;


    document.getElementById("modalRating")
        .textContent =
        pkg.rating;


    document.getElementById("modalPrice")
        .textContent =
        "₱" + pkg.price.toLocaleString();


    /* =========================
       SCHEDULE
    ========================= */

    const schedule =
        document.getElementById("modalSchedule");


    schedule.innerHTML = "";


    pkg.schedule.forEach(item => {

        schedule.innerHTML += `

            <div class="grid grid-cols-[60px_1fr]
                        text-xs">

                <strong class="text-pink-500">

                    ${item.time}

                </strong>

                <span class="text-slate-600">

                    ${item.activity}

                </span>

            </div>

        `;

    });


    /* =========================
       INCLUSIONS
    ========================= */

    const inclusions =
        document.getElementById("modalInclusions");


    inclusions.innerHTML = "";


    pkg.inclusions.forEach(item => {

        inclusions.innerHTML += `

            <span class="bg-pink-50
                         text-pink-600
                         rounded-full
                         px-3 py-2
                         text-[10px]
                         font-bold">

                ✓ ${item}

            </span>

        `;

    });


    document
        .getElementById("packageModal")
        .classList.remove("hidden");


    document.body.style.overflow = "hidden";


    lucide.createIcons();

}


/* ==========================================
   CLOSE PACKAGE
========================================== */

function closePackage() {

    document
        .getElementById("packageModal")
        .classList.add("hidden");


    document.body.style.overflow = "auto";

}


/* ==========================================
   OPEN BOOKING
========================================== */

function openBooking() {

    populateBookingPackages();


    document
        .getElementById("bookingModal")
        .classList.remove("hidden");


    document.body.style.overflow = "hidden";

}


/* ==========================================
   CLOSE BOOKING
========================================== */

function closeBooking() {

    document
        .getElementById("bookingModal")
        .classList.add("hidden");


    document.body.style.overflow = "auto";

}


/* ==========================================
   BOOK SELECTED PACKAGE
========================================== */

function bookSelectedPackage() {

    closePackage();

    openBooking();


    if (selectedPackage) {

        document
            .getElementById("bookingPackage")
            .value =
            selectedPackage.id;

    }

}


/* ==========================================
   BOOKING PACKAGE DROPDOWN
========================================== */

function populateBookingPackages() {

    const select =
        document.getElementById("bookingPackage");


    select.innerHTML = `

        <option value="">
            I need help choosing
        </option>

    `;


    packages.forEach(pkg => {

        select.innerHTML += `

            <option value="${pkg.id}">

                ${pkg.title}

            </option>

        `;

    });

}


/* ==========================================
   BOOKING FORM
========================================== */

document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        alert(

            "Thank you! Your travel request has been received. " +
            "This is currently a demo booking form."

        );


        closeBooking();


        this.reset();

    });


/* ==========================================
   MOBILE MENU
========================================== */

document
    .getElementById("menuButton")
    .addEventListener("click", function() {

        const menu =
            document.getElementById("mobileMenu");


        menu.classList.toggle("hidden");

    });


/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

window.addEventListener("scroll", function() {

    const navbar =
        document.getElementById("navbar");


    if (window.scrollY > 50) {

        navbar.classList.add(
            "bg-slate-900/95",
            "backdrop-blur-lg",
            "shadow-lg"
        );

    }

    else {

        navbar.classList.remove(
            "bg-slate-900/95",
            "backdrop-blur-lg",
            "shadow-lg"
        );

    }

});


/* ==========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================== */

document
    .getElementById("packageModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closePackage();

        }

    });


document
    .getElementById("bookingModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeBooking();

        }

    });


/* ==========================================
   INITIALIZE
========================================== */

loadPackages();

lucide.createIcons();