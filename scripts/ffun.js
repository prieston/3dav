function Step1(){
	
	//create world for presentation
		var xmlDoc=loadXMLDoc("./XYZ.xml");

	var CoordTable = document.getElementById("CreateWorld_Table_tbody");
	var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	
	for(var i=0;i<XMLPointsLength;i+=3){
		var row = CoordTable.insertRow(CoordTable.rows.length);
		
		var cellID = row.insertCell(0);
		var cellX = row.insertCell(1);
		var cellY = row.insertCell(2);
		var cellZ = row.insertCell(3);
		
		cellID.innerHTML = CoordTable.rows.length;
		var x = Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4);
		var y = Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4);
		var z = Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4);
		cellX.innerHTML = x
		cellY.innerHTML = y;
		cellZ.innerHTML = z;
	}
	///create world
	var Xmin =451800.1941;
var Ymin = 4438966.2693;
var Xmax = 451905.7732;
var Ymax = 4439071.4111;
var PxlRes = 1;
var worldPxlWidth = (Math.abs(Xmax)-Math.abs(Xmin))/PxlRes;
var worldPxlHeight = (Math.abs(Ymax)-Math.abs(Ymin))/PxlRes;
 DemWidth = 11;
 DemHeight = 11;
var offsetX = 0;
var offsetY = 0;

	world = new World([Xmin,Ymin,Xmax,Ymax],(Xmax-Xmin)/PxlRes,PxlRes,0.0);
	lyr[0] = new MapLayer({q:1,stats:{max:10,min:0},type:"dem",name:"TEO",dem:[{width:DemWidth,s:{},plane:{width:worldPxlWidth,offsetX:offsetX,offsetY:offsetY,height:worldPxlHeight},t:{},height:DemHeight}]});
	lyr[0].dem[0].data = [];
	
	
	var CoordTableLength = CoordTable.rows.length;
	for(var i = 0;i<CoordTableLength;i++){
		var row = lyr[0].dem[0].data.length;
		lyr[0].dem[0].data[row] = Number(CoordTable.rows[i].cells[3].innerHTML);
	}
	
	CalculatePositionVariables();
	main();
	plane.material.visible = false;
	
	var mat =  new THREE.MeshPhongMaterial({ambient:"red",color:"red",shininess:20,wireframe:true});
	var plane1 = plane.clone();
	plane1.material= mat;
	plane1.material.needsUpdate = true;
	planeMaterials["GeometryWireframe"] = plane1;
	scene.add(planeMaterials["GeometryWireframe"]);
	mat =  new THREE.MeshPhongMaterial({ambient:"white",shininess:20,color:"green",wireframe:false,vertexColors:THREE.FaceColors});
	var plane2 = plane.clone();
	plane2.material = mat;
	plane2.material.needsUpdate = true;
	planeMaterials["GeometrySolid"] = plane2;
	scene.add(planeMaterials["GeometrySolid"]);
	
	
	
		
	document.getElementById("GeometryWireframe").checked = true;
	document.getElementById("GeometryWireframe").disabled = false;
	document.getElementById("GeometrySolid").checked = true;
	document.getElementById("GeometrySolid").disabled = false;
	
	///////create texture


	var texture=THREE.ImageUtils.loadTexture( ["./geoprossesing2016/afitos.png"] );

	var newLayer = document.createElement("input");
		
	newLayer.type = "checkbox";
	newLayer.checked = true;


	newLayer.style.display = "inline";
	var label = document.createElement('label')
	var t = "Hill texture";
	newLayer.value = t;
	newLayer.id = t+"layer";
	newLayer.onchange = function(){displayMapTexture(t+"layer")};
	var plane3 = plane.clone();
	var mat =  new THREE.MeshPhongMaterial({ambient:"white",shininess:20,color:"white",wireframe:false,map:texture});
	plane3.material = mat;
	plane3.material.needsUpdate = true;
		planeMaterials[t+"layer"] = plane3;
		scene.add(planeMaterials[t+"layer"]);
	label.appendChild(document.createTextNode(t));
	document.getElementById("TextureLayers").appendChild(newLayer);
	document.getElementById("TextureLayers").appendChild(label);
	
	//////create layers
	//Point Tree Layer Paml Point
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Paml Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "Paml Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point Tree Layer Flamboyant Point
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Flamboyant Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "Flamboyant Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point Tree Layer Elm Point
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Elm Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "Elm Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point Tree Layer Ginger Point
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Ginger Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "Ginger Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point Tree Layer Bougainvillier Point
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bougainvillier Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "Bougainvillier Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House1 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House1 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House2 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House2 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House3 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House3 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House4 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House4 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House5 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House5 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House6 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House6 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House7 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House7 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Point House Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/House8 Point.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PointLayerName").value = "House8 Point";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePointLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Point[i] =Number(worldPos.x);
		CLT_Point[i+1] =Number(worldPos.y);
		CLT_Point[i+2] =Number(worldPos.z);

	}
	CreatePointLayer();
	clearCreatePointLayerTable();
	//Line Tree Layer Dracena Line
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Dracena Line.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("LineLayerName").value = "Dracena Line";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreateLineLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Line[i] =Number(worldPos.x);
		CLT_Line[i+1] =Number(worldPos.y);
		CLT_Line[i+2] =Number(worldPos.z);

	}

	document.getElementById("SeperateLines").checked = true;
	document.getElementById("calculateDistanse").checked = true;
	document.getElementById("calculateAngle").checked = true;
	CreateLineLayer();
	clearCreateLineLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo1 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo1 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo2 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo2 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo3 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo3 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo4 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo4 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo5 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo5 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo6 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo6 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo7 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo7 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	//Polygon Tree Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Bamboo8 Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Bamboo8 Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();

	//Polygon Water material Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Water Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "Water Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	
	//Polygon Water Clear Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/WaterClr Polygon.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("PolygonLayerName").value = "WaterClr Polygon";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreatePolygonLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Polygon[i] =Number(worldPos.x);
		CLT_Polygon[i+1] =Number(worldPos.y);
		CLT_Polygon[i+2] =Number(worldPos.z);

	}


	CreatePolygonLayer();
	clearCreatePolygonLayerTable();
	
	//Animal Line Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Animal Polyline.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("LineLayerName").value = "Animal Polyline";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreateLineLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Line[i] =Number(worldPos.x);
		CLT_Line[i+1] =Number(worldPos.y);
		CLT_Line[i+2] =Number(worldPos.z);

	}

	document.getElementById("PolyLine").checked = true;
	document.getElementById("calculateDistanse").checked = true;
	document.getElementById("calculateAngle").checked = true;
	CreateLineLayer();
	clearCreateLineLayerTable();
	
	//Car Line Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Car 1 Line.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("LineLayerName").value = "Car 1 Line";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreateLineLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Line[i] =Number(worldPos.x);
		CLT_Line[i+1] =Number(worldPos.y);
		CLT_Line[i+2] =Number(worldPos.z);

	}

	document.getElementById("SeperateLines").checked = true;
	document.getElementById("calculateDistanse").checked = true;
	document.getElementById("calculateAngle").checked = true;
	CreateLineLayer();
	clearCreateLineLayerTable();
	//Car Line Layer
	var xmlDoc=loadXMLDoc("./Layer Data/geoprossesing2016/Car 2 Line.xml");
		var DataTagName = "Data";
	
	var XMLPointsLength = xmlDoc.getElementsByTagName(DataTagName).length -1;
	document.getElementById("LineLayerName").value = "Car 2 Line";
	
	
	
	
	for(var i=0;i<XMLPointsLength;i+=3){
		CreateLineLayerTable(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+2].childNodes[0].nodeValue).toFixed(4));
		var worldPos= UserCoordinatesXY(Number(xmlDoc.getElementsByTagName(DataTagName)[i].childNodes[0].nodeValue).toFixed(4),Number(xmlDoc.getElementsByTagName(DataTagName)[i+1].childNodes[0].nodeValue).toFixed(4));
		CLT_Line[i] =Number(worldPos.x);
		CLT_Line[i+1] =Number(worldPos.y);
		CLT_Line[i+2] =Number(worldPos.z);

	}

	document.getElementById("SeperateLines").checked = true;
	document.getElementById("calculateDistanse").checked = true;
	document.getElementById("calculateAngle").checked = true;
	CreateLineLayer();
	clearCreateLineLayerTable();
}