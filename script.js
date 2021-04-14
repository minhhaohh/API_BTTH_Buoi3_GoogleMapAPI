let map;
let radius1 = 130000;
let radius2 = radius1 * 2;

function initMap() {

  const position1 = new google.maps.LatLng( 10.7798632, 106.6977188 );
  const position2 = new google.maps.LatLng( 21.0270268, 105.8338997 );

  map = new google.maps.Map(document.getElementById("map"), {
    center: position1,
    zoom: 5,
  });

  //Create Marker
  const marker1 = new google.maps.Marker({
    position: position1,
    title: "HCM",
    map,
    icon: "hcm.png",
  });

  const marker2 = new google.maps.Marker({
    position: position2,
    title: "HN",
    map,
    icon: "hn.png",
  });

  //Create InfoWindows
  const contentString1 = "Buu Dien Trung Tam Thanh Pho HCM";
  const infoWindow1 = new google.maps.InfoWindow({
    content: contentString1,
    position: position1,
  });
  marker1.addListener("click", () => {
    infoWindow1.open(map, marker1);
  });

  const contentString2 = "Van Mieu Quoc Tu Giam HN";
  const infoWindow2 = new google.maps.InfoWindow({
    content: contentString2,
    position: position2,
  });
  marker2.addListener("click", () => {
    infoWindow2.open(map, marker2);
  });

  //Create Circles
  const circle1 = new google.maps.Circle({
    strokeColor: "#00FF00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#4286F4",
    fillOpacity: 0.35,
    map,
    center: position1,
    radius: radius1,
  });

  const circle2 = new google.maps.Circle({
    strokeColor: "#00FF00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#4286F4",
    fillOpacity: 0.35,
    map,
    center: position2,
    radius: radius1,
  });

  //Create Triangles inscribed Circles
  var triangle1_vertice1 = google.maps.geometry.spherical.computeOffset(position1, radius1, 0);
  var triangle1_vertice2 = google.maps.geometry.spherical.computeOffset(position1, radius1, 120);
  var triangle1_vertice3 = google.maps.geometry.spherical.computeOffset(position1, radius1, -120);
  var triangle1_vertices = [triangle1_vertice1, triangle1_vertice2, triangle1_vertice3];
  const triangle1 = new google.maps.Polygon({
      path: triangle1_vertices,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
  });
  triangle1.setMap(map);

  var triangle2_vertice1 = google.maps.geometry.spherical.computeOffset(position2, radius1, 0);
  var triangle2_vertice2 = google.maps.geometry.spherical.computeOffset(position2, radius1, 120);
  var triangle2_vertice3 = google.maps.geometry.spherical.computeOffset(position2, radius1, -120);
  var triangle2_vertices = [triangle2_vertice1, triangle2_vertice2, triangle2_vertice3];
  const triangle2 = new google.maps.Polygon({
      path: triangle2_vertices,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
  });
  triangle2.setMap(map);


  //Create Triangles circumscribed Circles 
  var triangle3_vertice1 = google.maps.geometry.spherical.computeOffset(position1, radius2, 0);
  var triangle3_vertice2 = google.maps.geometry.spherical.computeOffset(position1, radius2, 120);
  var triangle3_vertice3 = google.maps.geometry.spherical.computeOffset(position1, radius2, -120);
  var triangle3_vertices = [triangle3_vertice1, triangle3_vertice2, triangle3_vertice3];
  const triangle3 = new google.maps.Polygon({
      path: triangle3_vertices,
      strokeColor: '#FFFF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFF00',
      fillOpacity: 0.35
  });
  triangle3.setMap(map);

  var triangle4_vertice1 = google.maps.geometry.spherical.computeOffset(position2, radius2, 0);
  var triangle4_vertice2 = google.maps.geometry.spherical.computeOffset(position2, radius2, 120);
  var triangle4_vertice3 = google.maps.geometry.spherical.computeOffset(position2, radius2, -120);
  var triangle4_vertices = [triangle4_vertice1, triangle4_vertice2, triangle4_vertice3];
  const triangle4 = new google.maps.Polygon({
      path: triangle4_vertices,
      strokeColor: '#FFFF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFF00',
      fillOpacity: 0.35
  });
  triangle4.setMap(map);

  //Create Direction
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);
  directionsService.route(
  {
    origin: position1, 
    destination:  position2,
    travelMode: google.maps.TravelMode.DRIVING
  },
    (response, status)=>{
      if (status === "OK") {
          directionsRenderer.setDirections(response);
    } else {
          window.alert("Direction request failed due to " + status);
    }
  });
}