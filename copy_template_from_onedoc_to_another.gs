// Add a custom menu to the active document, including a separator and a sub-menu.
function onOpen(e) {
  DocumentApp.getUi()
      .createMenu('Template')
      .addItem('Insert Template', 'insertTemplate')
      //.addSeparator()
      .addToUi();
}

// Funtion for copying template from another doc to this doc.
function insertTemplate(){
  var sourceDoc = DocumentApp.openByUrl(
    'https://docs.google.com/document/d/1pkapHGRM3NjrLnql4yJEuGeLSJCR3pf0wDrNB3OHlZ0/edit');
  
  var targetDoc = DocumentApp.getActiveDocument();
  var totalElements = sourceDoc.getNumChildren();

  var cursor = targetDoc.getCursor();
  var position = cursor.getElement();

  // find elements and insert them to cursor's location.
  for( var j = 0; j < totalElements; ++j ) {
    var body = targetDoc.getBody();
    var element = sourceDoc.getChild(j).copy();
    var type = element.getType();
    if( type == DocumentApp.ElementType.PARAGRAPH ){
      //body.appendParagraph(element); // this adds the element at the end of the doc
      body.insertParagraph(body.getChildIndex(position), element);
    }
    else if( type == DocumentApp.ElementType.TABLE){
      //body.appendTable(element); // this adds the element at the end of the doc
      body.insertTable(body.getChildIndex(position),element);
      }
    else if( type == DocumentApp.ElementType.LIST_ITEM){
      //body.appendListItem(element); // this adds the element at the end of the doc
      body.insertListItem(body.getChildIndex(position),element);
      }
    else if( type == DocumentApp.ElementType.HORIZONTAL_RULE){
    //body.appendListItem(element); // this adds the element at the end of the doc
    body.insertListItem(body.getChildIndex(position),element);
      }
    }
  targetDoc.saveAndClose();
}
