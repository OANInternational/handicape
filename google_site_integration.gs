function additemtogooglesites() {
  //open credentials file
  var file = DriveApp.getFileById("1GdfjUCyA649OuvjmGNrbb-9_e4jTD_z0");
  var content = file.getBlob().getDataAsString();
  var json = JSON.parse(content);
  var private_key = json['private_key'];
  var client_email = json['client_email'];
  var project_id = json['project_id'];
  
  //open database -- NEED TO ADD LIBRARY 1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw
  //more info in https://github.com/grahamearley/FirestoreGoogleAppsScript
  
  var firestore = FirestoreApp.getFirestore(client_email, private_key, project_id);
  const allDocuments = firestore.getDocuments("HandicapeesDB");
  
  //open site
  var site = SitesApp.getSiteByUrl("https://sites.google.com/a/oaninternational.org/asphan/");
  
  //create page to add each person
  var page = site.createAnnouncementsPage("recensement", "recensement", "");
  
  //go through each person and add a page with its info
  for (var i=0; i<allDocuments.length;i++){
    var fields = allDocuments[i]['fields'];
    var code = String(fields['code']);
    var arrondisement = fields['arrondisement'];
    var village = fields['village'];
    var nom = fields['nom'].toUpperCase();
    var prenoms = fields['prenoms'];
    var age = String(fields['age']);
    var sex = fields['sex'];
    var type = fields['type'];
    var besoin_sociale = fields['besoin_sociale'];
    var besoin_technique = fields['besoin_technique'];
    var profession = fields['profession'];
    var image1_url = fields['images']['image1']['url'];
    var image2_url = fields['images']['image2']['url'];
    var html = '<head><title>'+nom+'</title></head>'+
      '<body>'+
        '<b>CODE</b>: '+code+'<br>'+
        '<b>Nom</b>: '+nom+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
        '<b>Prenoms</b>: '+prenoms+'<br>'+
        '<b>Arrondisement</b>: '+arrondisement+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
        '<b>Village</b>: '+village+'<br>'+
        '<b>Age</b>: '+age+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
        '<b>Sex</b>: '+sex+'<br>'+
        '<b>Profession</b>: '+profession+'<br>'+
        '<b>Type de handicappe</b>: '+type+'<br>'+
        '<b>Besoin Social</b>: '+besoin_sociale+'<br>'+
        '<b>Besoin Technique</b>: '+besoin_technique+'<br><br><br>'+
        '<img src="'+image1_url+'"'+
                'alt="'+nom+' '+prenoms+'" width="80%">'+'<br><br>'+
         '<img src="'+image2_url+'"'+
                'alt="'+nom+' '+prenoms+'" width="80%"></body>';
    page.createAnnouncement(code+' - '+nom+' '+prenoms, html);
  
  }
}