
const locationData = {
    "Kigali City": {
        "Gasabo": {
            "Kimironko": {
                "Bibare": ["Village 1", "Village 2"],
                "Rukiri": ["Village 3", "Village 4"]
            },
            "Kacyiru": {
                "Kamatamu": ["Village A", "Village B"],
                "Gacuriro": ["Village C", "Village D"]
            }
        },
        "Kicukiro": {
            "Kanombe": {
                "Busanza": ["Village 10", "Village 11"],
                "Karama": ["Village 12", "Village 13"]
            }
        }
    },
    "Northern Province": {
        "Musanze": {
            "Muhoza": {
                "Nyamagumba": ["Village X", "Village Y"]
            }
        }
    }
};

// Elements
const provinceInput = document.getElementById("province");
const districtList = document.getElementById("districts");
const districtInput = document.getElementById("district");
const sectorList = document.getElementById("sectors");
const sectorInput = document.getElementById("sector");
const cellList = document.getElementById("cells");
const cellInput = document.getElementById("cell");
const villageList = document.getElementById("villages");
const villageInput = document.getElementById("village");

// Guardian  and parents elements
const fatherName = document.getElementById("fatherName");
const motherName = document.getElementById("motherName");
const guardianFields = [
    document.getElementById("guardianName"),
    document.getElementById("guardianPhone"),
    document.getElementById("guardianAddress")
];

// function
function populateList(inputField, dataList, values) {
    dataList.innerHTML = "";
    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        dataList.appendChild(option);
    });
    inputField.value = "";
}

// Province to the districts
provinceInput.addEventListener("input", () => {
    const province = provinceInput.value;
    if (locationData[province]) {
        populateList(districtInput, districtList, Object.keys(locationData[province]));
    }
});

// District to the sectors
districtInput.addEventListener("input", () => {
    const province = provinceInput.value;
    const district = districtInput.value;
    if (locationData[province]?.[district]) {
        populateList(sectorInput, sectorList, Object.keys(locationData[province][district]));
    }
});

// Sector to the cells
sectorInput.addEventListener("input", () => {
    const province = provinceInput.value;
    const district = districtInput.value;
    const sector = sectorInput.value;
    if (locationData[province]?.[district]?.[sector]) {
        populateList(cellInput, cellList, Object.keys(locationData[province][district][sector]));
    }
});

// Cell to the villages
cellInput.addEventListener("input", () => {
    const province = provinceInput.value;
    const district = districtInput.value;
    const sector = sectorInput.value;
    const cell = cellInput.value;
    if (locationData[province]?.[district]?.[sector]?.[cell]) {
        populateList(villageInput, villageList, locationData[province][district][sector][cell]);
    }
});

//  Guardian data when both parents missing
function toggleGuardianFields() {
    const showGuardian = !fatherName.value && !motherName.value;
    guardianFields.forEach(field => {
        field.required = showGuardian;
        field.parentElement.style.display = showGuardian ? "block" : "none";
    });
}

fatherName.addEventListener("input", toggleGuardianFields);
motherName.addEventListener("input", toggleGuardianFields);

// check
toggleGuardianFields();


// Submit 
document.getElementById("content").addEventListener("submit", function(e) {
    e.preventDefault();
    alert(" Form submitted successfully!");
});

