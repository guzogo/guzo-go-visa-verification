import { db, collection, getDocs, addDoc, updateDoc, doc, query, where } from "./firebase.js";

const saveBtn = document.getElementById("saveBtn");

const fullName = document.getElementById("fullName");
const passportNumber = document.getElementById("passportNumber");
const applicationId = document.getElementById("applicationId");
const country = document.getElementById("country");
const visaType = document.getElementById("visaType");
const status = document.getElementById("status");
const issueDate = document.getElementById("issueDate");
const expiryDate = document.getElementById("expiryDate");
const photoURL = document.getElementById("photoURL");

const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const adminResult = document.getElementById("adminResult");

// SAVE / ADD
saveBtn.addEventListener("click", async () => {
  const data = {
    fullName: fullName.value,
    passportNumber: passportNumber.value,
    applicationId: applicationId.value,
    country: country.value,
    visaType: visaType.value,
    status: status.value,
    issueDate: issueDate.value,
    expiryDate: expiryDate.value,
    photoURL: photoURL.value
  };

  await addDoc(collection(db, "visas"), data);

  alert("Saved Successfully");
});

// SEARCH
searchBtn.addEventListener("click", async () => {
  const value = searchKey.value;

  const snap = await getDocs(collection(db, "visas"));

  let found = null;
  let docId = null;

  snap.forEach(d => {
    const data = d.data();
    if (data.passportNumber === value || data.applicationId === value) {
      found = data;
      docId = d.id;
    }
  });

  if (!found) {
    adminResult.classList.remove("hidden");
    adminResult.innerHTML = "Not Found";
    return;
  }

  adminResult.classList.remove("hidden");

  adminResult.innerHTML = `
    <h3>Edit Record</h3>
    <p>Name: ${found.fullName}</p>
    <p>Passport: ${found.passportNumber}</p>
    <p>Status: ${found.status}</p>
    <button onclick="alert('Update logic can be added here')">Update</button>
  `;
});
