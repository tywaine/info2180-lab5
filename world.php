<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

$country = isset($_GET['country']) ? "%" . $_GET['country'] . "%" : null;
$sql = "";

if (isset($_GET['lookup']) && $_GET['lookup'] === 'cities') {
    if($country) {
        $sql = "SELECT cities.name AS name,
                    cities.district as district,
                    cities.population AS population 
                FROM cities 
                    JOIN countries ON cities.country_code = countries.code 
                WHERE countries.name LIKE :country;";
    }
    else{
        $sql = "SELECT cities.name, cities.district, cities.population 
                FROM cities";
    }
}
else {
    if($country){
        $sql = "SELECT * FROM countries WHERE name LIKE :country";
    }
    else{
        $sql = "SELECT * FROM countries";
    }

}

$stmt = $conn->prepare($sql);

if($country) {
    $stmt->bindParam(':country', $country);
}

$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($results);
