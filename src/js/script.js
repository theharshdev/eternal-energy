let swiper = new Swiper(".mySwiper", {
  spaceBetween: 0,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
});

let swiperTeam = new Swiper(".mySwiperTeam", {
  slidesPerView: 2,
  spaceBetween: 24,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    460: {
      slidesPerView: 3,
    },
  },
});

let swiperPhotos = new Swiper(".mySwiperPhotos", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    460: {
      slidesPerView: 2,
    },
    560: {
      slidesPerView: 3,
    },
    760: {
      slidesPerView: 4,
    },
  },
});

var swiperProduct = new Swiper(".mySwiperProduct", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperProduct,
  },
});

let swiperReview = new Swiper(".mySwiperReview", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const counters = document.querySelectorAll(".count");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Remove commas and convert to number
        const target = parseInt(el.textContent.replace(/,/g, ""), 10);
        let current = 0;
        const duration = 1500; // ms
        const increment = target / (duration / 16); // ~60fps

        el.textContent = "0"; // start from 0

        const updateCount = () => {
          current += increment;
          if (current < target) {
            el.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString(); // ensure final exact value
          }
        };

        updateCount();
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));
const revealElements = document.querySelectorAll(".reveal");
const observer1 = new IntersectionObserver(
  (entries, observer1) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Add class to trigger CSS animation
        el.classList.add("active");
        // Stop observing after animation triggers
        observer1.unobserve(el);
      }
    });
  },
  { threshold: 0.1 }
); // trigger when 10% visible
revealElements.forEach((el) => observer1.observe(el));

// Contact form validation --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contact");
  if (!form) return;
  const q = (sel) => form.querySelector(sel);

  // Good regexes:
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{4,}$/u; // letters, spaces, hyphen, apostrophe, min 2 chars
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // practical email check

  const removeErrors = () => {
    form.querySelectorAll(".error").forEach((e) => e.remove());
    form.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
      el.removeAttribute("aria-invalid");
      el.classList.remove("border-red-500", "ring-1", "ring-red-300");
    });
  };

  const showError = (input, msg) => {
    const p = document.createElement("p");
    p.className = "error text-red-500 text-xs mt-1";
    p.textContent = msg;
    // append after the input's label wrapper (your markup uses label > input)
    input.parentElement.appendChild(p);
    input.setAttribute("aria-invalid", "true");
    input.classList.add("border-red-500", "ring-1", "ring-red-300");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    removeErrors();

    const firstName = q('input[name="First Name"]');
    const lastName = q('input[name="Last Name"]');
    const phone = q('input[name="Phone Number"]');
    const email = q('input[name="Email"]');

    let isValid = true;
    const firstInvalid = { el: null };

    // First name
    if (!firstName.value.trim() || !nameRegex.test(firstName.value.trim())) {
      showError(
        firstName,
        "Enter a valid first name (letters, spaces, - or '). Min 4 chars."
      );
      isValid = false;
      if (!firstInvalid.el) firstInvalid.el = firstName;
    }

    // Last name
    if (!lastName.value.trim() || !nameRegex.test(lastName.value.trim())) {
      showError(
        lastName,
        "Enter a valid last name (letters, spaces, - or '). Min 4 chars."
      );
      isValid = false;
      if (!firstInvalid.el) firstInvalid.el = lastName;
    }

    // Email
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError(email, "Enter a valid email address.");
      isValid = false;
      if (!firstInvalid.el) firstInvalid.el = email;
    }

    // Phone: strip non-digits, require 10 digits (supports intl)
    const phoneDigits = (phone.value || "").toString().replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length != 10) {
      showError(phone, "Enter a valid phone number (10 digits).");
      isValid = false;
      if (!firstInvalid.el) firstInvalid.el = phone;
    }

    if (!isValid) {
      // focus first invalid field
      firstInvalid.el.focus();
      return;
    }

    // Optional: show a simple submitting state
    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn ? submitBtn.innerHTML : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Submitting...";
    }

    // All good — submit the form to Web3Forms
    form.submit();

    // Reset the form after short delay to ensure submission starts
    setTimeout(() => {
      form.reset();
      // Optional: re-enable submit button and restore text
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      }
    }, 1000);
  });
});

const openMenuBox = document.getElementById("openMenuBox");
const closeMenuBox = document.getElementById("closeMenuBox");
const menuBox = document.getElementById("menuBox");
const body = document.querySelector("body");
let menuIsOpen = false;

function toggleMenu() {
  if (menuIsOpen === false) {
    menuBox.classList.remove("-translate-x-[200%]");
    body.classList.add("h-dvh", "overflow-hidden");
    menuIsOpen = true;
  } else {
    menuBox.classList.add("-translate-x-[200%]");
    body.classList.remove("h-dvh", "overflow-hidden");
    menuIsOpen = false;
  }
}

openMenuBox.addEventListener("click", toggleMenu);
closeMenuBox.addEventListener("click", toggleMenu);

// Increment/Decrement Counter ------
const decreaseCounter = document.getElementById("decreaseCounter");
const productCounter = document.getElementById("productCounter");
const increaseCount = document.getElementById("increaseCount");

increaseCount.addEventListener("click", () => {
  let productCounterValue = Number(productCounter.value);
  if (productCounterValue < 10) {
    productCounterValue = productCounterValue + 1;
    productCounter.value = productCounterValue;
  }
});

decreaseCounter.addEventListener("click", () => {
  let productCounterValue = Number(productCounter.value);
  if (productCounterValue > 1) {
    productCounterValue = productCounterValue - 1;
    productCounter.value = productCounterValue;
  }
});

const checkoutPopup = document.getElementById("checkout-popup");
const orderNowBtn = document.getElementById("order-now-btn");
const checkoutPopupCloseBtn = document.getElementById(
  "checkout-popup-close-btn"
);
const productQty = document.getElementById("product-qty");
const priceSubtotal = document.getElementById("price-subtotal");
const priceTotal = document.getElementById("price-total");
const checkoutUpiBtn = document.getElementById("checkout-upi-btn");

orderNowBtn.addEventListener("click", () => {
  body.classList.add("h-dvh", "overflow-hidden");
  checkoutPopup.classList.remove("hidden");
  checkoutPopup.classList.add("flex");
  productQty.textContent = productCounter.value;
  priceSubtotal.textContent = productCounter.value * 100;
  priceTotal.textContent = productCounter.value * 100;
  checkoutUpiBtn.setAttribute(
    "href",
    `upi://pay?pa=9599244807@ybl&pn=Eternal%20Enery%20Foundation&tn=&am=${
      productCounter.value * 100
    }&cu=INR`
  );
});

checkoutPopupCloseBtn.addEventListener("click", () => {
  body.classList.remove("h-dvh", "overflow-hidden");
  checkoutPopup.classList.add("hidden");
  checkoutPopup.classList.remove("flex");
  document.getElementById("checkout-from-box").style.display = "block";
  document.getElementById("qr-code-box").style.display = "none";
  productCounter.value = 1;
  document.getElementById(
    "checkout-submit-btn"
  ).textContent = `Save & Proceed to Payment`;
  document.getElementById("checkout-submit-btn").disabled = false;
});

// Checkout from validation --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-from");
  const qrBox = document.getElementById("qr-code-box");

  if (!form || !qrBox) return;

  const q = (selector) => form.querySelector(selector);

  // Strict regex patterns --------------
  const nameRegex = /^[a-zA-Z ]{3,}$/i;
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const pincodeRegex = /^\d{6}$/;
  const addressRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\s,.'\-\/#]{10,}$/u;

  const fields = {
    fullName: {
      el: q('input[name="Full Name"]'),
      regex: nameRegex,
      msg: "Enter a valid name (min 3 chars).",
    },
    phone: {
      el: q('input[name="Phone Number"]'),
      regex: phoneRegex,
      msg: "Enter a valid 10-digit phone number.",
    },
    address: {
      el: q('textarea[name="Full Address"]'),
      regex: addressRegex,
      msg: "Enter a valid address (letters & numbers, min 10 chars).",
    },
    email: {
      el: q('input[name="Email"]'),
      regex: emailRegex,
      msg: "Enter a valid email address.",
    },
    pincode: {
      el: q('input[name="Pincode"]'),
      regex: pincodeRegex,
      msg: "Enter a valid 6-digit pincode.",
    },
    state: {
      el: q('select[name="State"]'),
      regex: /.+/,
      msg: "Choose a valid state name.",
    },
    city: {
      el: q('select[name="City"]'),
      regex: /.+/,
      msg: "Choose a valid city name.",
    },
  };

  // Remove all previous errors for a specific input
  const removeErrors = (input) => {
    if (!input) return;
    const parent = input.parentElement;
    parent.querySelectorAll(".error").forEach((e) => e.remove());
    input.removeAttribute("aria-invalid");
    input.classList.remove("border-red-500", "ring-1", "ring-red-300");
  };

  // Show error only if it doesn't already exist
  const showError = (input, msg) => {
    // Prevent duplicate error messages
    const parent = input.parentElement;
    if (parent.querySelector(".error")) return;

    const p = document.createElement("p");
    p.className = "error text-red-500 text-xs mt-1";
    p.textContent = msg;
    parent.appendChild(p);

    input.setAttribute("aria-invalid", "true");
    input.classList.add("border-red-500", "ring-1", "ring-red-300");
  };

  // Real-time validation
  Object.values(fields).forEach(({ el, regex, msg }) => {
    el.addEventListener("input", () => {
      if (regex.test(el.value.trim())) {
        removeErrors(el);
      }
    });
  });

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalid = null;

    // Validate all fields
    Object.values(fields).forEach(({ el, regex, msg }) => {
      if (!regex.test(el.value.trim())) {
        showError(el, msg);
        isValid = false;
        firstInvalid ||= el;
      }
    });

    if (!isValid) {
      firstInvalid?.focus();
      return;
    }

    // Submit button state
    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        document.getElementById("checkout-from-box").style.display = "none";
        qrBox.style.display = "flex";
      } else {
        alert("Submission failed. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
      }
    } catch (error) {
      alert("Network error. Please try again later.");
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }

    setTimeout(() => {
      form.reset();
    }, 1000);
  });
});

// Districts ------------
const districtsByState = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Konaseema",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "Nellore",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "Srikakulam",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Changlang",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Dibang Valley",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
  ],
  Assam: [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],
  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla-Manpur-Ambagarh Chowki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakti",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],
  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],
  Goa: ["North Goa", "South Goa"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Saraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davangere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Yadgir",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Keonjhar",
    "Khurda",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],
  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Mohali",
    "Muktsar",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "SAS Nagar",
    "Shaheed Bhagat Singh Nagar",
    "Sri Muktsar Sahib",
    "Tarn Taran",
  ],
  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",
  ],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagitial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal–Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Badaun",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kushinagar",
    "Lakhimpur Kheri",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Noida",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "Eastern West Khasi Hills",
    "North Garo Hills",
    "Ri-Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],
  Mizoram: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],
  Nagaland: [
    "Chümoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zünheboto",
  ],
  Sikkim: ["Gangtok", "Mangan", "Namchi", "Pakyong", "Soreng", "Gyalshing"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  Lakshadweep: [
    "Agatti",
    "Amini",
    "Andrott",
    "Bitra",
    "Chetlat",
    "Kadmat",
    "Kalpeni",
    "Kavaratti",
    "Kiltan",
    "Minicoy",
  ],
  Ladakh: ["Kargil", "Leh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu",
  ],
  Chandigarh: ["Chandigarh"],
  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman",
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  const districtSelect = document.getElementById("district");

  // Handle state change
  stateSelect.addEventListener("change", () => {
    const selectedState = stateSelect.value;
    districtSelect.innerHTML = '<option value="">Select District</option>';

    if (!selectedState || !districtsByState[selectedState]) {
      districtSelect.disabled = true;
      return;
    }

    // Add districts for selected state
    districtsByState[selectedState].forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });

    districtSelect.disabled = false;
  });
});

