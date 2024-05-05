
// Calling the appropriate functions depending on which html document was loaded
document.addEventListener("DOMContentLoaded", (event) => {
    if (document.getElementById('scrollpane') && document.getElementById('cardsContainer')) {
        fetchUpcomingMatches();
        fetchTopPlayers();
    } else if (document.getElementById('gk-cardsContainer')) {
        fetchAllPlayers();
    } else if (document.getElementById('all-matches-grid')) {
        fetchAllMatches();
    } else {
        fetchNewsMatches();
        fetchStandings();
    }
});




// Fetching upcoming/live matches in home
function fetchUpcomingMatches() {
    fetch('https://apiv2.allsportsapi.com/football/?met=Fixtures&teamId=102&APIkey=1f8afcd2d774c4cb00dd0c35f3de570c288ba8584acbd2f2748b95b081c57b2c&from=2023-09-01&to=2024-07-01')
        .then(response => response.json())
        .then(data => {
            const scrollpane = document.getElementById('scrollpane');

            const upcomingMatches = data.result.filter(matchData => {
                const matchDate = new Date(`${matchData.event_date}T${matchData.event_time}`);
                const currentTime = new Date();
                return matchDate > currentTime;
            }).sort((a, b) => new Date(`${a.event_date}T${a.event_time}`) - new Date(`${b.event_date}T${b.event_time}`));

            upcomingMatches.forEach(matchData => {
                const containerMatch = createContainerUpcomingMatch(matchData);
                scrollpane.appendChild(containerMatch);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function createContainerUpcomingMatch(matchData) {
    const containerMatch = document.createElement('div');
    containerMatch.classList.add('container-match');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card_title');

    const h1 = document.createElement('h1');
    h1.textContent = 'Upcoming Match';
    cardTitle.appendChild(h1);

    const matchLocation = document.createElement('p');
    matchLocation.id = 'match_type';
    matchLocation.textContent = matchData.event_stadium;
    cardTitle.appendChild(matchLocation);

    const matchInfo = document.createElement('div');
    matchInfo.classList.add('match_info');

    const teamName = document.createElement('div');
    teamName.classList.add('team_name');

    const homeTeamDiv = createTeamDiv(matchData.event_home_team, matchData.home_team_logo, "team1");
    const awayTeamDiv = createTeamDiv(matchData.event_away_team, matchData.away_team_logo, "team2");

    teamName.appendChild(homeTeamDiv);
    teamName.appendChild(awayTeamDiv);

    const vs = document.createElement('div');
    vs.classList.add('vs');
    vs.innerHTML = '<p>vs</p>';

    const dateTime = document.createElement('div');
    dateTime.classList.add('date_time');
    dateTime.innerHTML = `<p>${new Date(`${matchData.event_date}T${matchData.event_time}`).toLocaleDateString()}</p>
                                    <p>${new Date(`${matchData.event_date}T${matchData.event_time}`).toLocaleTimeString()}</p>`;

    matchInfo.appendChild(teamName);
    matchInfo.appendChild(vs);
    matchInfo.appendChild(dateTime);

    const seeDetails = document.createElement('div');
    seeDetails.classList.add('seeDetails');

    if (matchData.event_final_result === '-') {
        const infoButtonDiv = document.createElement('div');
        infoButtonDiv.classList.add('info-button');
        const infoButton = document.createElement('a');
        infoButton.id = 'match-button';
        infoButton.href = 'Tickets.html';
        infoButton.tabIndex = '0';
        infoButton.textContent = 'BUY TICKETS';
        infoButtonDiv.appendChild(infoButton);
        seeDetails.appendChild(infoButtonDiv);
    } else {
        const timeNumber = document.createElement('span');
        timeNumber.id = 'timeNumber';
        timeNumber.textContent = `${matchData.event_ft_result}\t${matchData.event_status}`;
        const livetimeanimation = document.createElement('span');
        livetimeanimation.id = 'livetimeanimation';
        livetimeanimation.textContent = "'";
        timeNumber.appendChild(livetimeanimation);
        seeDetails.appendChild(timeNumber);
    }

    card.appendChild(cardTitle);
    card.appendChild(matchInfo);
    card.appendChild(seeDetails);

    containerMatch.appendChild(card);

    return containerMatch;
}

// Function to create each team div and called in every function that create match cards
function createTeamDiv(teamName, teamLogoUrl, teamNum) {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add(teamNum);

    const teamLogo = document.createElement('img');
    teamLogo.src = teamLogoUrl;
    teamLogo.alt = '';

    const teamNameElem = document.createElement('h3');
    teamNameElem.textContent = teamName;

    teamDiv.appendChild(teamLogo);
    teamDiv.appendChild(teamNameElem);

    return teamDiv;
}







// Fetching players data and getting the top 4 highest rated players
function fetchTopPlayers() {
    fetch('https://apiv2.allsportsapi.com/football/?met=Players&teamId=102&APIkey=1f8afcd2d774c4cb00dd0c35f3de570c288ba8584acbd2f2748b95b081c57b2c')
        .then(response => response.json())
        .then(data => {
            let topPlayers = data.result;
            topPlayers = topPlayers
                .filter(player => player.player_rating !== null && player.player_rating !== "")
                .sort((a, b) => parseFloat(b.player_rating) - parseFloat(a.player_rating));

            const top4Players = topPlayers.slice(0, 4);

            const cardsContainer = document.getElementById('cardsContainer');
            top4Players.forEach(playerData => {
                const rating = parseFloat(playerData.player_rating).toFixed(2);
                const age = playerData.player_age || 'N/A';
                const name = playerData.player_name || 'N/A';
                const imageUrl = `Images/Players/${playerData.player_key}.png`;

                const minip = document.createElement('div');
                minip.classList.add('minip');

                const mg = document.createElement('div');
                mg.classList.add('mg');

                const clr = document.createElement('div');
                clr.classList.add('clr');

                const group = document.createElement('div');
                group.classList.add('group');

                const span = document.createElement('span');

                const av = document.createElement('div');
                av.classList.add('av');
                av.style.backgroundImage = `url('${imageUrl}')`;

                const info = document.createElement('div');
                info.classList.add('info');

                const nameElement = document.createElement('name');
                nameElement.innerText = name;

                const deets = document.createElement('deets');
                deets.innerHTML = `Age: ${age}<br>Rating: ${rating}`;

                group.appendChild(span);
                mg.appendChild(clr);
                mg.appendChild(group);
                minip.appendChild(mg);
                minip.appendChild(av);
                info.appendChild(nameElement);
                info.appendChild(deets);
                minip.appendChild(info);

                cardsContainer.appendChild(minip);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}







// Fetching all matches
function fetchAllMatches() {
    fetch('https://apiv2.allsportsapi.com/football/?met=Fixtures&teamId=102&APIkey=1f8afcd2d774c4cb00dd0c35f3de570c288ba8584acbd2f2748b95b081c57b2c&from=2023-09-01&to=2024-07-01')
        .then(response => response.json())
        .then(data => {
            const scrollpane = document.getElementById('all-matches-grid');

            const matches = data.result;
            matches.forEach(matchData => {
                const containerMatch = createContainerAllMatch(matchData);
                scrollpane.appendChild(containerMatch);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function createContainerAllMatch(matchData) {
    const containerMatch = document.createElement('div');
    containerMatch.classList.add('container-match');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card_title');

    const h1 = document.createElement('h1');
    if (matchData.event_live == '1') {
        h1.textContent = 'Live Match';
    } else if (matchData.event_final_result == '-') {
        h1.textContent = 'Upcoming Match';
    } else {
        h1.textContent = 'Match finished';
    }
    cardTitle.appendChild(h1);

    const matchLocation = document.createElement('p');
    matchLocation.id = 'match_type';
    matchLocation.textContent = matchData.event_stadium;
    cardTitle.appendChild(matchLocation);

    const matchInfo = document.createElement('div');
    matchInfo.classList.add('match_info');

    const teamName = document.createElement('div');
    teamName.classList.add('team_name');

    const homeTeamDiv = createTeamDiv(matchData.event_home_team, matchData.home_team_logo, "team1");
    const awayTeamDiv = createTeamDiv(matchData.event_away_team, matchData.away_team_logo, "team2");

    teamName.appendChild(homeTeamDiv);
    teamName.appendChild(awayTeamDiv);

    const vs = document.createElement('div');
    vs.classList.add('vs');
    vs.innerHTML = '<p>vs</p>';

    const dateTime = document.createElement('div');
    dateTime.classList.add('date_time');
    dateTime.innerHTML = `<p>${new Date(`${matchData.event_date}T${matchData.event_time}`).toLocaleDateString()}</p>
                    <p>${new Date(`${matchData.event_date}T${matchData.event_time}`).toLocaleTimeString()}</p>`;

    matchInfo.appendChild(teamName);
    matchInfo.appendChild(vs);
    matchInfo.appendChild(dateTime);

    const seeDetails = document.createElement('div');
    seeDetails.classList.add('seeDetails');

    if (matchData.event_live == '1') {
        const timeNumber = document.createElement('span');
        timeNumber.id = 'timeNumber';
        timeNumber.textContent = `${matchData.event_ft_result}`;
        const livetimeanimation = document.createElement('span');
        livetimeanimation.id = 'livetimeanimation';
        livetimeanimation.textContent = "'";
        timeNumber.appendChild(livetimeanimation);
        seeDetails.appendChild(timeNumber);
    } else if (matchData.event_final_result == '-') {
        const infoButtonDiv = document.createElement('div');
        infoButtonDiv.classList.add('info-button');
        const infoButton = document.createElement('a');
        infoButton.id = 'match-button';
        infoButton.href = 'Tickets.html';
        infoButton.tabIndex = '0';
        infoButton.textContent = 'BUY TICKETS';
        infoButtonDiv.appendChild(infoButton);
        seeDetails.appendChild(infoButtonDiv);
    } else {
        const timeNumber = document.createElement('span');
        timeNumber.id = 'timeNumber';
        timeNumber.textContent = `${matchData.event_final_result} FT`;
        const livetimeanimation = document.createElement('span');
        seeDetails.appendChild(timeNumber);
    }

    card.appendChild(cardTitle);
    card.appendChild(matchInfo);
    card.appendChild(seeDetails);

    containerMatch.appendChild(card);

    return containerMatch;
}









// Fetching only 6 matches that will be shown in the News page
function fetchNewsMatches() {
    fetch('https://apiv2.allsportsapi.com/football/?met=Fixtures&teamId=102&APIkey=1f8afcd2d774c4cb00dd0c35f3de570c288ba8584acbd2f2748b95b081c57b2c&from=2023-09-01&to=2024-07-01')
        .then(response => response.json())
        .then(data => {
            const scrollpane = document.getElementById('matches-grid');

            const matches = data.result.slice(0, 6);
            matches.forEach(matchData => {
                const containerMatch = createContainerNewsMatch(matchData);
                scrollpane.appendChild(containerMatch);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function createContainerNewsMatch(matchData) {
    const containerMatch = document.createElement('div');
    containerMatch.classList.add('container-match');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card_title');

    const h1 = document.createElement('h1');
    if (matchData.event_live == '1') {
        h1.textContent = 'Live Match';
    } else if (matchData.event_final_result == '-') {
        h1.textContent = 'Upcoming Match';
    } else {
        h1.textContent = 'Match finished';
    }
    cardTitle.appendChild(h1);

    const matchLocation = document.createElement('p');
    matchLocation.id = 'match_type';
    matchLocation.textContent = matchData.event_stadium;
    cardTitle.appendChild(matchLocation);

    const matchInfo = document.createElement('div');
    matchInfo.classList.add('match_info');

    const teamName = document.createElement('div');
    teamName.classList.add('team_name');

    const homeTeamDiv = createTeamDiv(matchData.event_home_team, matchData.home_team_logo, "team1");
    const awayTeamDiv = createTeamDiv(matchData.event_away_team, matchData.away_team_logo, "team2");

    teamName.appendChild(homeTeamDiv);
    teamName.appendChild(awayTeamDiv);

    const vs = document.createElement('div');
    vs.classList.add('vs');
    vs.innerHTML = '<p>vs</p>';

    const dateTime = document.createElement('div');
    dateTime.classList.add('date_time');
    dateTime.innerHTML = `<p>${new Date(`${matchData.event_date}T${matchData.event_time}`).toLocaleDateString()}</p>
                    <p>${new Date(`${matchData.event_date}T${matchData.event_time}`).toLocaleTimeString()}</p>`;

    matchInfo.appendChild(teamName);
    matchInfo.appendChild(vs);
    matchInfo.appendChild(dateTime);

    const seeDetails = document.createElement('div');
    seeDetails.classList.add('seeDetails');

    if (matchData.event_live == '1') {
        const timeNumber = document.createElement('span');
        timeNumber.id = 'timeNumber';
        timeNumber.textContent = `${matchData.event_ft_result}`;
        const livetimeanimation = document.createElement('span');
        livetimeanimation.id = 'livetimeanimation';
        livetimeanimation.textContent = "'";
        timeNumber.appendChild(livetimeanimation);
        seeDetails.appendChild(timeNumber);
    } else if (matchData.event_final_result == '-') {
        const infoButtonDiv = document.createElement('div');
        infoButtonDiv.classList.add('info-button');
        const infoButton = document.createElement('a');
        infoButton.id = 'match-button';
        infoButton.href = 'Tickets.html';
        infoButton.tabIndex = '0';
        infoButton.textContent = 'BUY TICKETS';
        infoButtonDiv.appendChild(infoButton);
        seeDetails.appendChild(infoButtonDiv);
    } else {
        const timeNumber = document.createElement('span');
        timeNumber.id = 'timeNumber';
        timeNumber.textContent = `${matchData.event_final_result} FT`;
        const livetimeanimation = document.createElement('span');
        seeDetails.appendChild(timeNumber);
    }

    card.appendChild(cardTitle);
    card.appendChild(matchInfo);
    card.appendChild(seeDetails);

    containerMatch.appendChild(card);

    return containerMatch;
}






// Fetching premier league standings
function fetchStandings() {
    var standingsContainer = document.querySelector(".container-table");
    var standingsTable = standingsContainer.querySelector("table tbody");
    fetch("https://apiv2.allsportsapi.com/football/?met=Standings&leagueId=152&APIkey=1f8afcd2d774c4cb00dd0c35f3de570c288ba8584acbd2f2748b95b081c57b2c")
        .then(response => response.json())
        .then(data => {
            const standings = data.result.total;

            standings.forEach(standing => {
                var row = createStandingRow(standing);
                standingsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function createStandingRow(standing) {
    var row = document.createElement('tr');
    row.innerHTML = `
                    <td>${standing.standing_place}</td>
                    <td class="team">
                    <img src="${standing.team_logo}" alt="${standing.standing_team} Logo">
                    ${standing.standing_team}
                    </td>
                    <td>${standing.standing_PTS}</td>
                    <td>${standing.standing_GD}</td>
                    <td>${standing.standing_W}/${standing.standing_D}/${standing.standing_L}</td>
                    `;
    return row;
}









// Fetching all players data and calling a function for every player type
function fetchAllPlayers() {
    fetch('https://apiv2.allsportsapi.com/football/?met=Players&teamId=102&APIkey=1f8afcd2d774c4cb00dd0c35f3de570c288ba8584acbd2f2748b95b081c57b2c')
        .then(response => response.json())
        .then(data => {
            const players = data.result;
            fetchGoalkeepers(players);
            fetchDefenders(players);
            fetchMidfielders(players);
            fetchForwards(players);
            fetchCoach(players);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


// Filtering players data to only goalkeepers
function fetchGoalkeepers(players) {
    const goalkeepers = players.filter(player => player.player_type === "Goalkeepers");

    const cardsContainer = document.getElementById('gk-cardsContainer');
    goalkeepers.forEach(player => {
        const playerId = player.player_key;
        const imageUrl = `Images/Players/${player.player_key}.png`;
        const playerName = player.player_name;
        const playerAge = player.player_age;
        const playerNumber = player.player_number;

        const minip = createPlayerCard(playerId, imageUrl, playerName, playerAge, playerNumber);
        cardsContainer.appendChild(minip);
    });
}

// Filtering players data to only defenders
function fetchDefenders(players) {
    const defenders = players.filter(player => player.player_type === "Defenders");

    const cardsContainer = document.getElementById('def-cardsContainer');
    defenders.forEach(player => {
        const playerId = player.player_key;
        const imageUrl = `Images/Players/${player.player_key}.png`;
        const playerName = player.player_name;
        const playerAge = player.player_age;
        const playerNumber = player.player_number;

        const minip = createPlayerCard(playerId, imageUrl, playerName, playerAge, playerNumber);
        cardsContainer.appendChild(minip);
    });
}

// Filtering players data to only midfielders
function fetchMidfielders(players) {
    const midfielders = players.filter(player => player.player_type === "Midfielders");

    const cardsContainer = document.getElementById('mid-cardsContainer');
    midfielders.forEach(player => {
        const playerId = player.player_key;
        const imageUrl = `Images/Players/${player.player_key}.png`;
        const playerName = player.player_name;
        const playerAge = player.player_age;
        const playerNumber = player.player_number;

        const minip = createPlayerCard(playerId, imageUrl, playerName, playerAge, playerNumber);
        cardsContainer.appendChild(minip);
    });
}

// Filtering players data to only forwards
function fetchForwards(players) {
    const attackers = players.filter(player => player.player_type === "Forwards");

    const cardsContainer = document.getElementById('att-cardsContainer');
    attackers.forEach(player => {
        const playerId = player.player_key;
        const imageUrl = `Images/Players/${player.player_key}.png`;
        const playerName = player.player_name;
        const playerAge = player.player_age;
        const playerNumber = player.player_number;

        const minip = createPlayerCard(playerId, imageUrl, playerName, playerAge, playerNumber);
        cardsContainer.appendChild(minip);
    });
}

// Finding coach in the players data 
function fetchCoach(players) {
    const coach = players.find(player => player.player_type === "Coach");
    if (coach) {
        const cardsContainer = document.getElementById('coach-cardsContainer');
        const playerId = coach.player_key;
        const imageUrl = `Images/Players/${coach.player_key}.png`;
        const playerName = coach.player_name;

        const minip = createPlayerCard(playerId, imageUrl, playerName);
        cardsContainer.appendChild(minip);
    }
}


// Creating the players/coach cards
function createPlayerCard(playerId, imageUrl, playerName, playerAge = "", playerNumber = "") {
    const minip = document.createElement('div');
    minip.classList.add('minip');

    const mg = document.createElement('div');
    mg.classList.add('mg');

    const clr = document.createElement('div');
    clr.classList.add('clr');

    const group = document.createElement('div');
    group.classList.add('group');

    const span = document.createElement('span');

    const av = document.createElement('div');
    av.classList.add('av');
    av.style.backgroundImage = `url('${imageUrl}')`;

    const info = document.createElement('div');
    info.classList.add('info');

    const name = document.createElement('name');
    name.innerText = playerName;

    const deets = document.createElement('deets');
    if (playerAge != "") {
        deets.innerHTML = `Age: ${playerAge}<br>Number: ${playerNumber}`;
    }
    else
        deets.innerHTML = `<br>Position: coach`;

    group.appendChild(span);
    mg.appendChild(clr);
    mg.appendChild(group);
    minip.appendChild(mg);
    minip.appendChild(av);
    info.appendChild(name);
    info.appendChild(deets);
    minip.appendChild(info);

    return minip;
}