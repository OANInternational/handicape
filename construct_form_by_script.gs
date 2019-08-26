

//function onOpen(e) {
  //google.script.run.FormCuentasMaker();
//}

function DeleteItems(){
  var form = FormApp.openById("1F1txYvyuWR-94KvDAnCjq_UkWhUEjXtptfUxWcZ7SOc");
  var items = form.getItems();
  var end = items.length - 1;
  for(var i = end ; i >= 0; i--){
    form.deleteItem(i);
 }
}


function FormCensoMaker() {
  //spreadsheet id of the rosters
  var ss = SpreadsheetApp.openById('1LgHqNxx591KOpTaq1GV9k0GxHuccYmM0YbAlQuPjO9s');
  var form = FormApp.openById("1F1txYvyuWR-94KvDAnCjq_UkWhUEjXtptfUxWcZ7SOc");

  var hojatype = ss.getSheetByName("typehandicapee");
  var hojasocial = ss.getSheetByName("besoinsocial");
  var hojatechnique = ss.getSheetByName("besointechnique");
  var ultimaFilaType = hojatype.getLastRow();
  var ultimaFilaSocial = hojasocial.getLastRow();
  var ultimaFilaTechnique = hojatechnique.getLastRow();
  
  //get only the sheets with 'A.' for the disctrict
  var sheets = ss.getSheets().filter(function(sheet) {return sheet.getName().match(/A\./gi);});

   //create text validation of number
   var numbervalidation = FormApp.createTextValidation()
    .requireNumberGreaterThanOrEqualTo(0)
    .requireWholeNumber()
    .build();
  //Number of the form
  
  var n_form = form.addTextItem().setTitle('Numero du form').setValidation(numbervalidation);
  
  
  //reopen form
  var form = FormApp.openById("1F1txYvyuWR-94KvDAnCjq_UkWhUEjXtptfUxWcZ7SOc");
 
  //add Nom et prenmos
  var nom = form.addTextItem().setTitle('Nom');
  
  var prenom = form.addTextItem().setTitle('Prénoms');
  
  //Age 
  
  var age = form.addTextItem().setTitle('Age').setValidation(numbervalidation);
  
  //Sex
  var sex = ["F","H"];
  var sexchoice = form.addMultipleChoiceItem().setTitle('Sex').setChoiceValues(sex);  //Set Choices of Concepto
  
  //Type de handicappée
  var typechoices = form.addCheckboxItem().setTitle('Type de Handicappées').setHelpText('ajouter tous les handicappées');
  var type = [];
  for(var i = 0; i < ultimaFilaType-1; i++) {
  type[i]=hojatype.getSheetValues(i+2, 1, 1, 1);
  }
  typechoices.setChoiceValues(type);
  
  //Besoin Social
  var q_bes_soc = form.addCheckboxItem().setTitle('Besoin Sociale').setHelpText('ajouter tous les besoins sociales');
  var l_bes_soc = [];
  for(var i = 0; i < ultimaFilaSocial-1; i++) {
  l_bes_soc[i]=hojasocial.getSheetValues(i+2, 1, 1, 1);
  }
  q_bes_soc.setChoiceValues(l_bes_soc);
  
  //Besoin Tecnique
  
  var q_bes_tec = form.addCheckboxItem().setTitle('Besoin Technique').setHelpText('ajouter tous les besoins tecnique/profession');
  var l_bes_tec = [];
  for(var i = 0; i < ultimaFilaTechnique-1; i++) {
  l_bes_tec[i]=hojatechnique.getSheetValues(i+2, 1, 1, 1);
  }
  q_bes_tec.setChoiceValues(l_bes_tec);
  
  //Profession
  var contacts = form.addTextItem().setTitle('Profession');
  
  //Maison
  var contacts = form.addTextItem().setTitle('Maison');
  
  
  //Contacts
  var contacts = form.addTextItem().setTitle('Contacts');
  
  //Personnes a contcter
  var contacts = form.addTextItem().setTitle('Personnes à Contacter');
  
  //AN
  var an = form.addMultipleChoiceItem().setTitle('AN').setChoiceValues(["OUI","NON"]);
  

  
  
  //Arrondisements
  var arron_select = form.addMultipleChoiceItem().setTitle('Arrondisement');
  
  var parents = form.addPageBreakItem().setTitle('Famille').setGoToPage(FormApp.PageNavigationType.SUBMIT);
  
 //Parents
  //mere
  var t_mere = form.addSectionHeaderItem().setTitle("MERE");
  var n_mere = form.addTextItem().setTitle('Nom et Prenom du mère');
  var a_mere = form.addTextItem().setTitle('Activites du mère');
  
  var ad_mere = form.addTextItem().setTitle('Addreses du mère');
  
 //pere
  var t_pere = form.addSectionHeaderItem().setTitle("PERE ");
  var n_pere = form.addTextItem().setTitle('Nom et Prenom du père');
  var a_pere = form.addTextItem().setTitle('Activites du père');
  
  var ad_pere = form.addTextItem().setTitle('Addreses du père');
  
  //Partenaire
  var t_femme = form.addSectionHeaderItem().setTitle("PARTENAIRE");
  var marie = form.addMultipleChoiceItem().setTitle("Marié").setChoiceValues(["OUI","NON"]);
  
  var n_femme = form.addTextItem().setTitle('Nom et Prenom du partenaire');
  var a_femme = form.addTextItem().setTitle('Activites du partenaire');
  
  var ad_femme = form.addTextItem().setTitle('Addreses du partenaire');
  
  //enfants
  
  form.addSectionHeaderItem().setTitle("ENFANTS");
  form.addTextItem().setTitle("Nombre de garçon(s)").setValidation(numbervalidation);
  form.addTextItem().setTitle("Nombre de fille(s)").setValidation(numbervalidation);
  
  form.addTextItem().setTitle('Nom des enfants');
  
  for(var i=0;i<3;i++){
    var name = "enfent "+String(i);
    form.addSectionHeaderItem().setTitle(name);
    
    form.addTextItem().setTitle('Prenom du '+name);
    form.addTextItem().setTitle('Activites du '+name);
    
    form.addTextItem().setTitle('Addreses du '+name);
  }
  
  
  
   
  
  var l_arron_choices = getarronchoices(sheets,arron_select,parents);
  
  //assign the choices to the classSelect variable
  arron_select.setChoices(l_arron_choices);
  
  form.moveItem(arron_select, 2);
  
  
}

function getarronchoices(sheets,arron_select,parents){
  var l_arron_choices = [];
  var arron_sec = [];
  var village_select = [];
  var form = FormApp.openById("1F1txYvyuWR-94KvDAnCjq_UkWhUEjXtptfUxWcZ7SOc");
  
  for(var i = 0; i < sheets.length; i++) {
    var arron_name = sheets[i].getName();
    arron_name = String(arron_name).substring(2, String(arron_name).lenght);
    
    
    var pagebreak = form.addPageBreakItem().setTitle(arron_name).setGoToPage(parents);
    arron_sec.push(pagebreak);
    

    var villages = [];
    var ultimaFilaVillage = sheets[i].getLastRow();
    
    for(var z = 0; z < ultimaFilaVillage-1; z++) {
      villages.push(String(sheets[i].getSheetValues(z+2, 1, 1, 1)));
    }
    
    village_select.push(form.addMultipleChoiceItem().setTitle('Choisir le village dans '+arron_name).setChoiceValues(villages));
    Utilities.sleep(3000);
    l_arron_choices.push(arron_select.createChoice(arron_name,pagebreak)); 
    
  }
  return l_arron_choices;
}



