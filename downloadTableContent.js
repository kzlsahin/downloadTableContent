"use strict";
//Check for JQUERY
if (!$(document)) {

    let jqLib = document.createElement('script');

    jqLib.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

    document.getElementsByTagName('head')[0].appendChild(jqLib);

}

function downloadData(exportingString, exportName, extension) {

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportingString);

    let downLoadAnchorNode = document.createElement('a');

    downLoadAnchorNode.setAttribute("href", dataStr);

    downLoadAnchorNode.setAttribute("download", exportName + extension);

    document.body.appendChild(downLoadAnchorNode);

    downLoadAnchorNode.click();

    downLoadAnchorNode.remove();

    //End of downloadData()
}

//read HTML elements id, class attributes by mouse clicks, choosing which elements to be searched
function findElemAttrs(tag_name) {

    let allElems = document.getElementsByTagName(tag_name);

    allElems = Array.from(allElems);

    allElems.forEach(elem => elem.addEventListener("click", () => {
        dat = { id: this.id, class: this.className, tag: this.tagName };
        console.log(dat);
    }));

}

//exemple: https://www.w3schools.com/html/html_tables.asp
let selectorDataSet = {
    selector_tableParentDiv: ".w3-white w3-padding notranslate w3-padding-16",
    selector_totalPagesNum: null,
    selector_currentPageNum: null,
    selector_returnFirstPage: null,
    selector_nextPage: null,
    selector_tableRows: "#customers tbody tr"
};

function downloadTableContent(arg =
    {
        selector_tableParentDiv: "#jqgrid",
        selector_totalPagesNum: "#input_pjqgrid span",
        selector_currentPageNum: "#input_pjqgrid input",
        selector_returnFirstPage: "#first_pjqgrid",
        selector_nextPage: "#next_pjqgrid",
        selector_tableRows: ".jqgrow.ui-row-ltr.ui-widget-content"
    }) {

    /* tr -  Varsaylan sayfa "http://turgutreis.uab.gov.tr/TesisIslemleri". Varsaylan selectorParams da bu sayfadaki elementlere ait.
    * Öncelikle ilgili sayfaya gidip browser konsolunu açn (ctrl + f12). ve bu js sayfasndaki tüm kodu kopyalayp yaptrn. Ardndan bu fonksiyonu çarn
    * bu kodu baka bir internet sayfasnda kullanmak isterseniz selectorParams deerlerini belirlemek için bir obje tanmlamanz gerekir. Bunun gibi:
    * {selector_tableParentDiv : "#jqgrid", selector_totalPagesNum : "#input_pjqgrid span", selector_currentPageNum : "#input_pjqgrid input", selector_returnFirstPage : "#first_pjqgrid"}
    * Bu parametreler JQUERY tarafndan ilgili HTML elementine ulamak için kullanlan string tipi deerlerdir.
    *    Fonksiyonu varsaylan websayfas için çaracanz zaman yalnzca downloadFacilityData() komutunu kullanmannz yeterli.
    */
    /* en - The default page is "http://turgutreis.uab.gov.tr/TesisIslemleri". The default selectorParams are set according to this site
    * first of all open the page on the browser. Than copy paste this function to the console, then call this function
    * If you want to use this code on another website content, you should define an object to set the selectorParams like this:
    * {selector_tableParentDiv : "#jqgrid", selector_totalPagesNum : "#input_pjqgrid span", selector_currentPageNum : "#input_pjqgrid input", selector_returnFirstPage : "#first_pjqgrid"}
    * the selector parameters are the string used by JQUERY to select the related HTML elements. 
    *    When you call the function for the default webpage path, you may call the function just by downloadFacilityData().
    */
    let multiPagedTable = true;

    let totalPageNum = 10;

    let currentPageNum;

    let btn_returnFirstPage

    let rowsAsStringArray = [];

    let data = "";

    let rowStr = "";

    let button;

    let pageNum = 1;

    //recognizes the current page number
    if (arg.selector_totalPagesNum != null && arg.selector_returnFirstPage != null) {

        totalPageNum = +$(arg.selector_totalPagesNum)[0].textContent;

        currentPageNum = +$(arg.selector_currentPageNum)[0].value;

        btn_returnFirstPage = $(arg.selector_returnFirstPage)[0];

        btn_returnFirstPage = btn_returnFirstPage.getElementsByTagName("div")[0];

        button = $(arg.selector_nextPage);

        multiPagedTable = true;

        if (!currentPageNum == 1) {

            //Go to first page
            btn_returnFirstPage.click();

            currentPageNum = +$(arg.selector_currentPageNum)[0].value;

        }

    };

    let setRowData = () => {

        let rows = $(arg.selector_tableRows);

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {

            let lst = Array.from(rows[rowIndex].getElementsByTagName("td"));

            if (lst.length == 0) continue;

            let rowCellValues = lst.map(td => td.innerText ? td.innerText : "-");

            rowsAsStringArray.push(rowCellValues);
            //console.log(rowCellValues);

        }
    }

    let setData = () => {

        //console.log(rowsAsStringArray);

        for (let stringArr of rowsAsStringArray) {

            rowStr = stringArr.reduce((strArr, str) => strArr + ";" + str);

            data += rowStr + "\n";

        }

        //console.log(data);

        try {

            downloadData(data, "result", ".csv");

        } catch (e) {

            console.log(e)

        }

        //end of the function downloadTableContent()
    }


    function readPage () {

        console.log(`new loop ${pageNum}`);

        setRowData();

        pageNum++;

        if (pageNum < totalPageNum) {

           

            button.click();
            $(window).ready ( () => setTimeout(readPage, 8000) );
            console.log("button clck");



        } else {

            setData();
        }
    }

    if (multiPagedTable) {

        readPage();

    } else {

        let rows = $(arg.selector_tableRows);

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {

            let lst = Array.from(rows[rowIndex].getElementsByTagName("td"));

            if (lst.length == 0) continue;

            let rowCellValues = lst.map(td => td.innerText ? td.innerText : "-");

            rowsAsStringArray.push(rowCellValues);
            //console.log(rowCellValues);
        }
    }



}

