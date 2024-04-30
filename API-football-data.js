//Fetching upcoming/live matches

fetch("https://v3.football.api-sports.io/fixtures?season=2023&team=33", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "b501bbaa1d390aeedf790f5ad40a5c73"
    }
})
    .then(response => response.json())
    .then(data => {
        const scrollpane = document.getElementById('scrollpane');

        data.response.forEach(matchData => {
            const match = matchData.fixture;
            const matchDate = new Date(match.date);
            const currentTime = new Date();

            if (matchDate > currentTime || match.status.short === '1H' || match.status.short === '2H' || match.status.short === 'ET') {
                const containerMatch = createContainerMatch(matchData);
                scrollpane.appendChild(containerMatch);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function createContainerMatch(matchData) {
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
    matchLocation.textContent = matchData.fixture.venue.name;
    cardTitle.appendChild(matchLocation);

    const matchInfo = document.createElement('div');
    matchInfo.classList.add('match_info');

    const teamName = document.createElement('div');
    teamName.classList.add('team_name');

    const homeTeamDiv = createTeamDiv(matchData.teams.home, "team1");
    const awayTeamDiv = createTeamDiv(matchData.teams.away, "team2");

    teamName.appendChild(homeTeamDiv);
    teamName.appendChild(awayTeamDiv);

    const vs = document.createElement('div');
    vs.classList.add('vs');
    vs.innerHTML = '<p>vs</p>';

    const dateTime = document.createElement('div');
    dateTime.classList.add('date_time');
    dateTime.innerHTML = `<p>${new Date(matchData.fixture.date).toLocaleDateString()}</p>
                                        <p>${new Date(matchData.fixture.date).toLocaleTimeString()}</p>`;

    matchInfo.appendChild(teamName);
    matchInfo.appendChild(vs);
    matchInfo.appendChild(dateTime);

    const seeDetails = document.createElement('div');
    seeDetails.classList.add('seeDetails');

    if (matchData.fixture.status.short === 'FT') {
        const timeNumber = document.createElement('span');
        timeNumber.id = 'timeNumber';
        timeNumber.textContent = matchesData.fixture.status.elapsed;
        const livetimeanimation = document.createElement('span');
        livetimeanimation.id = 'livetimeanimation';
        livetimeanimation.textContent = "'";
        timeNumber.appendChild(livetimeanimation);
        seeDetails.appendChild(timeNumber);
    } else {
        const infoButtonDiv = document.createElement('div');
        infoButtonDiv.classList.add('info-button');
        const infoButton = document.createElement('a');
        infoButton.id = 'match-button';
        infoButton.href = 'Tickets.html';
        infoButton.tabIndex = '0';
        infoButton.textContent = 'BUY TICKETS';
        infoButtonDiv.appendChild(infoButton);
        seeDetails.appendChild(infoButtonDiv);
    }

    card.appendChild(cardTitle);
    card.appendChild(matchInfo);
    card.appendChild(seeDetails);

    containerMatch.appendChild(card);

    return containerMatch;
}

function createTeamDiv(team, teamNum) {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add(teamNum);

    const teamLogo = document.createElement('img');
    teamLogo.src = team.logo;
    teamLogo.alt = '';

    const teamName = document.createElement('h3');
    teamName.textContent = team.name;

    teamDiv.appendChild(teamLogo);
    teamDiv.appendChild(teamName);

    return teamDiv;
}



// Fetching top performing players data
function fetchTopPlayers() {
        fetch('https://v3.football.api-sports.io/players?league=39&season=2023&team=33', {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "b501bbaa1d390aeedf790f5ad40a5c7"
                }
            }).then(response => response.json())
        .then(data => {
            const topPlayers = data.response;

            topPlayers.sort((a, b) => b.statistics[0].rating - a.statistics[0].rating);

            const topPlayersContainer = document.getElementById('topPlayersContainer');
            for (let i = 0; i < 3; i++) {
                const player = topPlayers[i].player;
                const rating = topPlayers[i].statistics[0].rating.toFixed(2);
                const age = new Date().getFullYear() - new Date(player.birth.date).getFullYear();
                const position = topPlayers[i].statistics[0].games.position;
                const imageUrl = player.photo;

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('minip');

                const groupDiv = document.createElement('div');
                groupDiv.classList.add('mg');

                const groupSpan = document.createElement('span');
                groupSpan.innerText = position;

                groupDiv.appendChild(groupSpan);
                cardDiv.appendChild(groupDiv);

                const avDiv = document.createElement('div');
                avDiv.classList.add('av');
                avDiv.style.backgroundImage = `url('${imageUrl}')`;

                cardDiv.appendChild(avDiv);

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('info');

                const nameElem = document.createElement('name');
                nameElem.innerText = player.name;

                const deetsElem = document.createElement('deets');
                deetsElem.innerHTML = `Age: ${age} <br>Rating: ${rating}`;

                infoDiv.appendChild(nameElem);
                infoDiv.appendChild(deetsElem);

                cardDiv.appendChild(infoDiv);

                topPlayersContainer.appendChild(cardDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

fetchTopPlayers();