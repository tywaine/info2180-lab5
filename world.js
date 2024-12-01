document.getElementById('lookUpCountry').addEventListener('click', function() {
    const country = document.getElementById('country').value.trim();
    let url = `world.php?country=${encodeURIComponent(country)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            let output = '';
            output += `<table border="1"">`;
            output += `<thead>
                            <tr>
                                <th>Name</th>
                                <th>Continent</th>
                                <th>Independence</th>
                                <th>Head of State</th>
                            </tr>
                           </thead>`;
            output += `<tbody>`;
            data.forEach(row => {
                const independence = row.independence_year === null ? '-' : row.independence_year;

                output += `<tr>
                                <td>${row.name}</td>
                                <td>${row.continent}</td>
                                <td>${independence}</td>
                                <td>${row.head_of_state}</td>
                               </tr>`;
            });
            output += `</tbody>`;
            output += `</table>`;

            document.getElementById('result').innerHTML = output;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = '<p>There was an error fetching the data.</p>';
        });
});

document.getElementById('lookUpCity').addEventListener('click', function() {
    const country = document.getElementById('country').value.trim();
    let url = `world.php?lookup=cities&country=${encodeURIComponent(country)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            let output = '';
            output += `<table border="1"">`;
            output += `<thead>
                            <tr>
                                <th>Name</th>
                                <th>District</th>
                                <th>Population</th>
                            </tr>
                           </thead>`;
            output += `<tbody>`;
            data.forEach(row => {
                output += `<tr>
                                <td>${row.name}</td>
                                <td>${row.district}</td>
                                <td>${row.population}</td>
                               </tr>`;
            });
            output += `</tbody>`;
            output += `</table>`;

            document.getElementById('result').innerHTML = output;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = '<p>There was an error fetching the data.</p>';
        });
});