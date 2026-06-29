import { db, collection, getDocs, query, where } from "./firebase.js";

// UI Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const notFound = document.getElementById("notFound");

// Result fields
const photo = document.getElementById("photo");
const fullName = document.getElementById("fullName");
const passport = document.getElementById("passport");
const application = document.getElementById("application");
const country = document.getElementById("country");
const visaType = document.getElementById("visaType");
const status = document.getElementById("status");
const issueDate = document.getElementById("issueDate");
const expiryDate = document.getElementById("expiryDate");

// Search function
searchBtn.addEventListener("click", async () => {
  const value = searchInput.value.trim();

  if (!value) return;

  loading.classList.remove("hidden");
  result.classList.add("hidden");
  notFound.classList.add("hidden");

  try {
    const ref = collection(db, "visas");

    // search by passport OR application ID (simple scan)
    const snap = await getDocs(ref);

    let found = null;

    snap.forEach(doc => {
      const data = doc.data();

      if (
        data.passportNumber === value ||
        data.applicationId === value
      ) {
        found = data;
      }
    });

    loading.classList.add("hidden");

    if (!found) {
      notFound.classList.remove("hidden");
      return;
    }

    // show data
    result.classList.remove("hidden");

    photo.src = found.photoURL || "";
    fullName.textContent = found.fullName || "";
    passport.textContent = found.passportNumber || "";
    application.textContent = found.applicationId || "";
    country.textContent = found.country || "";
    visaType.textContent = found.visaType || "";

    status.textContent = found.status || "";

    // color status
    status.className = "";
    if (found.status === "Approved") status.classList.add("status-approved");
    if (found.status === "Pending") status.classList.add("status-pending");
    if (found.status === "Rejected") status.classList.add("status-rejected");

    issueDate.textContent = found.issueDate || "";
    expiryDate.textContent = found.expiryDate || "";

  } catch (error) {
    console.error(error);
    loading.classList.add("hidden");
    notFound.classList.remove("hidden");
  }
});
