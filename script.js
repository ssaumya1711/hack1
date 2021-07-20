function sortByName(a, b) {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
async function getUsers() {
  try {
    const data = await fetch("https://api.openbrewerydb.org/breweries", {
      method: "GET"
    });
    const users = await data.json();
    loadUsers(users);
  } catch (err) {
    const error = document.createElement("div");
    error.className = "error";
    error.innerText = "Data Not Available or Fetching From Wrong URL";
    document.body.append(error);
  }
}

function loadUsers(users) {
  users.sort(sortByName);
  const userList = document.createElement("div");
  userList.className = "user-list";
  users.forEach((user) => {
    if (user.street == null) user.street = "N/A";
    let userContainer = document.createElement("div");
    userContainer.className = "user-container";
    userContainer.innerHTML = `
      <h3 class="user-name">${user.name}</h3>
      <ul class="list">
      <li><span class="property">brewery_type:</span> ${user.brewery_type}</li>
      <li><span class="property">street:</span> ${user.street}</li>
      <li><span class="property">city:</span> ${user.city}</li>
      <li><span class="property">state:</span> ${user.state}</li>
      <li><span class="property">postal_code:</span> ${user.postal_code}</li>
      <li><span class="property">country:</span> ${user.country}</li>
      </ul>`;
    let phone = document.createElement("li");
    if (user.phone == null) {
      phone.innerHTML = `<span class="property">phone:</span> N/A`;
    } else {
      phone.innerHTML = `<span class="property">phone:</span> ${user.phone}`;
    }
    userContainer.querySelector(".list").appendChild(phone);
    let website = document.createElement("li");
    if (user.website_url == null) {
      website.innerHTML = `<span class="property">website_url: </span>N/A`;
    } else {
      website.innerHTML = `<span class="property">website_url: </span><a href=${user.website_url} target="_blank">${user.website_url}</a>`;
    }
    userContainer.querySelector(".list").appendChild(website);
    userList.append(userContainer);
  });
  document.body.append(userList);
}
const headin = document.createElement("div");
headin.className = "head";
headin.innerHTML =
  '<img src="http://simpleicon.com/wp-content/uploads/beer1.png" class="headimg1"></img><h1> Open Brewery API </h1><img src="http://simpleicon.com/wp-content/uploads/beer1.png" class="headimg2"></img>';
document.body.append(headin);
getUsers();
