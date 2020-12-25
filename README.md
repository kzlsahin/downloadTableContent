## Table Content Downloader

This JS script is to be used on a browser console to download contents of a table on the page. Sometimes it is needed to define some functions to get the table content on a page as there may be no way to do this by the user interface of the page.

Sometimes, there is a need to use some scripts via console on a page to get the contents of tables as there may not be default way to do so. One of my task under the Ministry of Transport was to take the data of our registered facilities from the tables on a website of a web application which belongs to the ministry. There had been no way to get that data except codding on the console. Then I write this script and share with any one who can benefit or may develop further.

### How to Use

To download the table content on a page, you should call the function downloadTableContent(arg) where arg is an input object.
The function has a default page predefined the input argument object. When you call the function for the default page, you may call the function without any argument. 

The default page is "http://turgutreis.uab.gov.tr/TesisIslemleri". The default selectorParams are set according to this site.
first of all open the page on the browser. Than copy paste this function to the console, then call this function

If you want to use this code on another website content, you should define an object to set the selectorParams like this:

{selector_tableParentDiv : "#jqgrid", selector_totalPagesNum : "#input_pjqgrid span", selector_currentPageNum : "#input_pjqgrid input", selector_returnFirstPage : "#first_pjqgrid"}

the selector parameters are the string used by JQUERY to select the related HTML elements. 

### Need Help?

You may get in contact with me;

@author: Mustafa SENTURK
@email: mustafa.senturk@yaani.com
