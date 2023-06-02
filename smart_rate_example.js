let shipmentData = {};
let tintDays = 2;
let lowestSmartRate = "";
let percentileVar = "percentile_95";

// var loadingDiv = document.getElementById("loading");

function showSpinner() {
  document.getElementById("loading").style.display = "block";
}

function hideSpinner() {
  document.getElementById("loading").style.display = "none";
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function getState(zipString) {
  /* Ensure param is a string to prevent unpredictable parsing results */
  if (typeof zipString !== "string") {
    console.log("Must pass the zipcode as a string.");
    return;
  }

  /* Ensure we have exactly 5 characters to parse */
  if (zipString.length !== 5) {
    console.log("Must pass a 5-digit zipcode.");
    return;
  }

  /* Ensure we don't parse strings starting with 0 as octal values */
  const zipcode = parseInt(zipString, 10);

  let st;
  let state;

  /* Code cases alphabetized by state */
  if (zipcode >= 35000 && zipcode <= 36999) {
    st = "AL";
    state = "Alabama";
  } else if (zipcode >= 99500 && zipcode <= 99999) {
    st = "AK";
    state = "Alaska";
  } else if (zipcode >= 85000 && zipcode <= 86999) {
    st = "AZ";
    state = "Arizona";
  } else if (zipcode >= 71600 && zipcode <= 72999) {
    st = "AR";
    state = "Arkansas";
  } else if (zipcode >= 90000 && zipcode <= 96699) {
    st = "CA";
    state = "California";
  } else if (zipcode >= 80000 && zipcode <= 81999) {
    st = "CO";
    state = "Colorado";
  } else if (
    (zipcode >= 6000 && zipcode <= 6389) ||
    (zipcode >= 6391 && zipcode <= 6999)
  ) {
    st = "CT";
    state = "Connecticut";
  } else if (zipcode >= 19700 && zipcode <= 19999) {
    st = "DE";
    state = "Delaware";
  } else if (zipcode >= 32000 && zipcode <= 34999) {
    st = "FL";
    state = "Florida";
  } else if (
    (zipcode >= 30000 && zipcode <= 31999) ||
    (zipcode >= 39800 && zipcode <= 39999)
  ) {
    st = "GA";
    state = "Georgia";
  } else if (zipcode >= 96700 && zipcode <= 96999) {
    st = "HI";
    state = "Hawaii";
  } else if (zipcode >= 83200 && zipcode <= 83999) {
    st = "ID";
    state = "Idaho";
  } else if (zipcode >= 60000 && zipcode <= 62999) {
    st = "IL";
    state = "Illinois";
  } else if (zipcode >= 46000 && zipcode <= 47999) {
    st = "IN";
    state = "Indiana";
  } else if (zipcode >= 50000 && zipcode <= 52999) {
    st = "IA";
    state = "Iowa";
  } else if (zipcode >= 66000 && zipcode <= 67999) {
    st = "KS";
    state = "Kansas";
  } else if (zipcode >= 40000 && zipcode <= 42999) {
    st = "KY";
    state = "Kentucky";
  } else if (zipcode >= 70000 && zipcode <= 71599) {
    st = "LA";
    state = "Louisiana";
  } else if (zipcode >= 3900 && zipcode <= 4999) {
    st = "ME";
    state = "Maine";
  } else if (zipcode >= 20600 && zipcode <= 21999) {
    st = "MD";
    state = "Maryland";
  } else if (
    (zipcode >= 1000 && zipcode <= 2799) ||
    zipcode == 5501 ||
    zipcode == 5544
  ) {
    st = "MA";
    state = "Massachusetts";
  } else if (zipcode >= 48000 && zipcode <= 49999) {
    st = "MI";
    state = "Michigan";
  } else if (zipcode >= 55000 && zipcode <= 56899) {
    st = "MN";
    state = "Minnesota";
  } else if (zipcode >= 38600 && zipcode <= 39999) {
    st = "MS";
    state = "Mississippi";
  } else if (zipcode >= 63000 && zipcode <= 65999) {
    st = "MO";
    state = "Missouri";
  } else if (zipcode >= 59000 && zipcode <= 59999) {
    st = "MT";
    state = "Montana";
  } else if (zipcode >= 27000 && zipcode <= 28999) {
    st = "NC";
    state = "North Carolina";
  } else if (zipcode >= 58000 && zipcode <= 58999) {
    st = "ND";
    state = "North Dakota";
  } else if (zipcode >= 68000 && zipcode <= 69999) {
    st = "NE";
    state = "Nebraska";
  } else if (zipcode >= 88900 && zipcode <= 89999) {
    st = "NV";
    state = "Nevada";
  } else if (zipcode >= 3000 && zipcode <= 3899) {
    st = "NH";
    state = "New Hampshire";
  } else if (zipcode >= 7000 && zipcode <= 8999) {
    st = "NJ";
    state = "New Jersey";
  } else if (zipcode >= 87000 && zipcode <= 88499) {
    st = "NM";
    state = "New Mexico";
  } else if (
    (zipcode >= 10000 && zipcode <= 14999) ||
    zipcode == 6390 ||
    zipcode == 501 ||
    zipcode == 544
  ) {
    st = "NY";
    state = "New York";
  } else if (zipcode >= 43000 && zipcode <= 45999) {
    st = "OH";
    state = "Ohio";
  } else if (
    (zipcode >= 73000 && zipcode <= 73199) ||
    (zipcode >= 73400 && zipcode <= 74999)
  ) {
    st = "OK";
    state = "Oklahoma";
  } else if (zipcode >= 97000 && zipcode <= 97999) {
    st = "OR";
    state = "Oregon";
  } else if (zipcode >= 15000 && zipcode <= 19699) {
    st = "PA";
    state = "Pennsylvania";
  } else if (zipcode >= 300 && zipcode <= 999) {
    st = "PR";
    state = "Puerto Rico";
  } else if (zipcode >= 2800 && zipcode <= 2999) {
    st = "RI";
    state = "Rhode Island";
  } else if (zipcode >= 29000 && zipcode <= 29999) {
    st = "SC";
    state = "South Carolina";
  } else if (zipcode >= 57000 && zipcode <= 57999) {
    st = "SD";
    state = "South Dakota";
  } else if (zipcode >= 37000 && zipcode <= 38599) {
    st = "TN";
    state = "Tennessee";
  } else if (
    (zipcode >= 75000 && zipcode <= 79999) ||
    (zipcode >= 73301 && zipcode <= 73399) ||
    (zipcode >= 88500 && zipcode <= 88599)
  ) {
    st = "TX";
    state = "Texas";
  } else if (zipcode >= 84000 && zipcode <= 84999) {
    st = "UT";
    state = "Utah";
  } else if (zipcode >= 5000 && zipcode <= 5999) {
    st = "VT";
    state = "Vermont";
  } else if (
    (zipcode >= 20100 && zipcode <= 20199) ||
    (zipcode >= 22000 && zipcode <= 24699) ||
    zipcode == 20598
  ) {
    st = "VA";
    state = "Virgina";
  } else if (
    (zipcode >= 20000 && zipcode <= 20099) ||
    (zipcode >= 20200 && zipcode <= 20599) ||
    (zipcode >= 56900 && zipcode <= 56999)
  ) {
    st = "DC";
    state = "Washington DC";
  } else if (zipcode >= 98000 && zipcode <= 99499) {
    st = "WA";
    state = "Washington";
  } else if (zipcode >= 24700 && zipcode <= 26999) {
    st = "WV";
    state = "West Virginia";
  } else if (zipcode >= 53000 && zipcode <= 54999) {
    st = "WI";
    state = "Wisconsin";
  } else if (zipcode >= 82000 && zipcode <= 83199) {
    st = "WY";
    state = "Wyoming";
  } else {
    st = "none";
    state = "none";
    console.log("No state found matching", zipcode);
  }

  return st;
}

function getRates(e) {
  document.getElementById("results").innerHTML = "";
  showSpinner();
  e.preventDefault();
  let data = {};
  data.from_zip = e.target[0].value;
  data.to_zip = e.target[1].value;
  data.weight = e.target[2].value;
  data.length = e.target[3].value || null;
  data.width = e.target[4].value || null;
  data.height = e.target[5].value || null;
  tintDays = e.target[6].value || 2;
  data.from_state = getState(data.from_zip);
  data.to_state = getState(data.to_zip);

  fetchRates(data);
}

function sortByRate(objects) {
  objects.sort(function (a, b) {
    return a.rate - b.rate;
  });
  return objects;
}

function getCheapestRateByTransitTime(objects, transitTime) {
  let cheapestRate = Infinity;
  let bottomRate = objects[0];
  for (let i = 0; i < objects.length; i++) {
    if (
      objects[i].time_in_transit[percentileVar] <= transitTime &&
      objects[i].rate < cheapestRate
    ) {
      cheapestRate = objects[i];
    }
  }
  lowestSmartRate = cheapestRate;
  let rateDiff = formatter.format(lowestSmartRate.rate - bottomRate.rate);
  let tintDiff =
    bottomRate.time_in_transit[percentileVar] -
    lowestSmartRate.time_in_transit[percentileVar];
  if (tintDiff > 0) {
    document.getElementById(
      "result"
    ).innerHTML = `Save ${rateDiff} and get it ${tintDiff} days later by selecting the ${bottomRate.carrier} ${bottomRate.service} service`;
  } else {
    document.getElementById("result").innerHTML = "";
  }
  if (lowestSmartRate) {
    document.getElementById(lowestSmartRate.id).style.backgroundColor =
      "lightgreen";
  } else {
    console.log("No rate found matching desired criteria.");
  }
}

function fetchRates(d) {
  const serverURL = "http://localhost:3000";
  // use this if you wish to restrict the rated carrier accounts to a list
  // const carrierAccounts = []; // your list of carrier accounts
  axios
    .post(`${serverURL}/shipments`, {
      shipment: {
        from_address: {
          zip: d.from_zip,
          state: d.from_state,
          name: "testy mctestface",
          company: "test co",
          phone: "8001112222",
          street1: "123 test street",
        },
        to_address: {
          zip: d.to_zip,
          state: d.to_state,
          name: "testy mctestface",
          company: "test co",
          phone: "8001112222",
          street1: "123 test street",
        },
        parcel: {
          weight: d.weight,
          length: d.length,
          width: d.width,
          height: d.height,
        },
        // carrier_accounts: carrierAccounts, // use this if you wish to restrict the rated carrier accounts to a list
      },
    })
    .then(function (response) {
      // handle success
      shipmentData = response.data;
      axios
        .get(`${serverURL}/shipments/${shipmentData.id}/smartrate`)
        .then((response) => {
          let r = response.data.result;
          r = sortByRate(r);
          let x = document.getElementById("results");

          for (i = 0; i < r.length; i++) {
            if (r[i].time_in_transit.percentile_95) {
              x.innerHTML += `<tr id=${r[i].id}><td>${r[i].carrier}</td><td>${
                r[i].service
              }</td><td >${formatter.format(
                r[i].rate
              )}<td class="percentile_99">${
                r[i].time_in_transit.percentile_99
              }</td><td class="percentile_97">${
                r[i].time_in_transit.percentile_97
              }</td><td class="percentile_95">${
                r[i].time_in_transit.percentile_95
              }</td><td class="percentile_85">${
                r[i].time_in_transit.percentile_85
              }</td></tr>`;
            }
          }
          getCheapestRateByTransitTime(r, tintDays);
          setTimeout(highlight, 10);
        });
      //   console.log(r);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      hideSpinner();
    });
}
function highlight() {
  let temp = document.getElementsByClassName(percentileVar);
  let p99 = document.getElementsByClassName("percentile_99");
  let p97 = document.getElementsByClassName("percentile_97");
  let p95 = document.getElementsByClassName("percentile_95");
  let p85 = document.getElementsByClassName("percentile_85");

  for (i = 0; i < temp.length; i++) {
    p99[i].style.backgroundColor = "white";
    p97[i].style.backgroundColor = "white";
    p95[i].style.backgroundColor = "white";
    p85[i].style.backgroundColor = "white";
    temp[i].style.backgroundColor = "lightgreen";
  }
  highlightRow();
}

function highlightRow() {
  let temp = document.getElementById(lowestSmartRate.id);
  temp = temp.getElementsByTagName("td");
  for (i = 0; i < temp.length; i++) {
    temp[i].style.cssText = "background-color: lightgreen";
    console.log(temp[i].style.cssText);
  }
}

function percentileHighlight(e) {
  e.preventDefault();
  document.getElementById("percentile_99").style.background = "white";
  document.getElementById("percentile_97").style.background = "white";
  document.getElementById("percentile_95").style.background = "white";
  document.getElementById("percentile_85").style.background = "white";
  document.getElementById(e.target.value).style.background = "lightgreen";
  percentileVar = e.target.value;
  highlight();
}
