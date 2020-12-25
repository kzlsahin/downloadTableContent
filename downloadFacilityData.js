function downLoadData(exportingString, exportName, extension){

    let dataStr = "data:text/json;charset=utf-8,"+ encodeURIComponent(exportingString);

    let downLoadAnchorNode = document.createElement('a');

    downLoadAnchorNode.setAttribute("href", dataStr);

    downLoadAnchorNode.setAttribute("download", exportName + extension);

    document.body.appendChild(downLoadAnchorNode);

    downLoadAnchorNode.click();

    downLoadAnchorNode.remove();

//End of downLoadData()
}


function downloadTableContent( arg = 
                                {selector_tableParentDiv : "#jqgrid", 
                                 selector_totalPagesNum : "#input_pjqgrid span", 
                                 selector_currentPageNum : "#input_pjqgrid input", 
                                 selector_returnFirstPage : "#first_pjqgrid"
                                } ) {
    
/*   Varsaylan sayfa "http://turgutreis.uab.gov.tr/TesisIslemleri". Varsaylan selectorParams da bu sayfadaki elementlere ait.
* Öncelikle ilgili sayfaya gidip browser konsolunu açn (ctrl + f12). ve bu js sayfasndaki tüm kodu kopyalayp yaptrn. Ardndan bu fonksiyonu çarn
* bu kodu baka bir internet sayfasnda kullanmak isterseniz selectorParams deerlerini belirlemek için bir obje tanmlamanz gerekir. Bunun gibi:
* {selector_tableParentDiv : "#jqgrid", selector_totalPagesNum : "#input_pjqgrid span", selector_currentPageNum : "#input_pjqgrid input", selector_returnFirstPage : "#first_pjqgrid"}
* Bu parametreler JQUERY tarafndan ilgili HTML elementine ulamak için kullanlan string tipi deerlerdir.
*    Fonksiyonu varsaylan websayfas için çaracanz zaman yalnzca downLoadFacilityData() komutunu kullanmannz yeterli.
*/  
/*   The default page is "http://turgutreis.uab.gov.tr/TesisIslemleri". The default selectorParams are set according to this site
* first of all open the page on the browser. Than copy paste this function to the console, then call this function
* If you want to use this code on another website content, you should define an object to set the selectorParams like this:
* {selector_tableParentDiv : "#jqgrid", selector_totalPagesNum : "#input_pjqgrid span", selector_currentPageNum : "#input_pjqgrid input", selector_returnFirstPage : "#first_pjqgrid"}
* the selector parameters are the string used by JQUERY to select the related HTML elements. 
*    When you call the function for the default webpage path, you may call the function just by downLoadFacilityData().
*/
    
//recognizes the current page number
let totalPageNum = +$(arg.selector_totalPagesNum)[0].textContent;
let currentPageNum = +$(arg.selector_currentPageNum)[0].value;
let rowsAsStringArray = [];
let btn_returnFirstPage = $(arg.selector_returnFirstPage)[0];
btn_returnFirstPage = btn_returnFirstPage.getElementsByTagName("div")[0];

if(!currentPageNum == 1){
//Go to first page
btn_returnFirstPage.click();
}



for(let pageNum=1;pageNum <= totalPageNum; pageNum++){

$(arg.selector_tableParentDiv).ready(
() => {
   currentPageNum = +$("#input_pjqgrid input")[0].value;

   let rows = $(".jqgrow.ui-row-ltr.ui-widget-content");


console.log(currentPageNum);
   for(let rowIndex = 0; rowIndex < rows.length; rowIndex++){
let lst = Array.from(rows[rowIndex].getElementsByTagName("td"));
let rowCellValues = lst.map(td => td.innerText?td.innerText:"-");
        rowsAsStringArray.push(rowCellValues);
//console.log(rowCellValues);

}

   
   
   button = $("#next_pjqgrid");
   button.click();
   }
   );
}

console.log(rowsAsStringArray);

 let data = "ID;Adi;Türü;Tipi;Durumu;Kapsamý;Liman;Üretici Kodu;Ýþlem\n";
       
        for(stringArr of rowsAsStringArray){
           
	let rowStr = stringArr.reduce((strArr, str) => strArr + ";" + str);
            data += rowStr + "\n";
           
        }
       
        downLoadData(data, "tesisler", ".csv");



//end of the function downLoadFacilityData()
}
