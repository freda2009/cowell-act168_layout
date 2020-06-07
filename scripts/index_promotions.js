var moveing = false;
/*"#cartoon_highlight"
document.getElementById("cartoon_highlight").value="id";
*/
function $jj(id) { return document.getElementById(id); 

}

function moveElement(elementID,final_x,final_y,interval) {
  var elem=$jj(elementID);
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
 moveing=false;
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);//Math.ceil求最小的整数，但不小于本身
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}
function next(previousBtn,nextBtn,scrollID,highlightID) {
 if(moveing) return;
 moveing = true;
 var vTop = parseInt($jj(scrollID).style.top);
 var vLeft = parseInt($jj(scrollID).style.left);
 if (vLeft <= -497) return moveing=false;
 if(vLeft == -0) {
  $jj(nextBtn).className = 'last_btn';
 }
 var finalLeft = vLeft - 497;
 moveElement(scrollID,finalLeft,vTop,1);
 $jj(previousBtn).className = 'previous';
 var highLightList = $jj(highlightID).getElementsByTagName('span');
 var currentNum = highLightList.length;
 for (var i=0; i<highLightList.length; i++) {
  if (highLightList[i].className == 'current') {
    currentNum = i;
  }
  highLightList[i].className = '';
 }
 var nextCurrent = currentNum+1 % highLightList.length;
 highLightList[nextCurrent].className = 'current';
 moveing = false;
}
function previous(previousBtn,nextBtn,scrollID,highlightID) {
 if(moveing) return;
 moveing = true;
 var vTop = parseInt($jj(scrollID).style.top);
 var vLeft = parseInt($jj(scrollID).style.left);
 if (vLeft >= 0) return moveing=false;
 if(vLeft == -497) {
  $jj(previousBtn).className = 'first_btn';
 }
 var finalLeft = vLeft + 497;
 moveElement(scrollID,finalLeft,vTop,1);
 $jj(nextBtn).className = 'next';
 var highLightList = $jj(highlightID).getElementsByTagName('span');
 for (var i=0; i<highLightList.length; i++) {
  if (highLightList[i].className == 'current') {
    var currentNum = i;
  }  
  highLightList[i].className = '';
 }
 if (currentNum > 0) {
  highLightList[currentNum-1].className = 'current';
 };
 moveing = false;
}